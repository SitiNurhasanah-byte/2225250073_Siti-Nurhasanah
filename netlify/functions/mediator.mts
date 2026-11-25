/**
 * Netlify Function: Gari AI – Asisten Belajar Matematika → Google Gemini API.
 *
 * - Kunci API HANYA di server: env var GEMINI_API_KEY (tidak pernah dibundel ke aplikasi).
 * - MODE UJI: permintaan wajib membawa header X-Gari-Test-Token yang sama dengan env var GARI_TEST_TOKEN.
 *   Ketentuan Gemini API melarang pemakaian di aplikasi untuk pengguna di bawah 18 tahun,
 *   jadi Gari AI hanya dibuka untuk guru/peneliti dewasa (docs/09 §2a).
 *
 * Atur: npx netlify env:set GEMINI_API_KEY <kunci>  dan  npx netlify env:set GARI_TEST_TOKEN <kode-uji>
 */
import { timingSafeEqual } from 'node:crypto';
import { LIMITS, buildPrompt, tidyReply, validateRequest } from '../../src/lib/ai/prompt';
import {
  DEFAULT_FALLBACK_MODEL,
  DEFAULT_MODEL,
  RETRY_WITH_FALLBACK,
  USER_ERRORS,
  buildGeminiBody,
  classifyGeminiError,
  geminiUrl,
  readGeminiReply,
  type GeminiErrorKind,
} from '../../src/lib/ai/gemini';

export const config = { path: '/api/mediator' };

const ALLOWED_ORIGINS = [
  /^https:\/\/([a-z0-9-]+--)?garisku\.netlify\.app$/,
  /^https:\/\/sitinurhasanah-byte\.github\.io$/,
  /^capacitor:\/\/localhost$/,
  /^https?:\/\/localhost(:(5173|4173|8888))?$/,
];

/** Batas total waktu agar tetap di bawah batas eksekusi Netlify Function (±10 detik). */
const DEADLINE_MS = 9000;

// Pembatas sederhana per instance (upaya terbaik, bukan jaminan): 20 permintaan / 10 menit / IP.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 20;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > MAX_PER_WINDOW;
}

function sameSecret(given: string | null, expected: string): boolean {
  if (!given) return false;
  const a = Buffer.from(given);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

function json(status: number, body: unknown, origin: string | null): Response {
  const headers: Record<string, string> = { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' };
  if (origin) {
    headers['Access-Control-Allow-Origin'] = origin;
    headers['Vary'] = 'Origin';
  }
  return new Response(JSON.stringify(body), { status, headers });
}

type CallResult = { ok: true; text: string } | { ok: false; kind: GeminiErrorKind | 'blocked' | 'empty' | 'timeout' };

async function callGemini(model: string, apiKey: string, body: unknown, timeoutMs: number): Promise<CallResult> {
  try {
    const res = await fetch(geminiUrl(model), {
      method: 'POST',
      // Kunci di header (bukan di URL) agar tidak tercatat di log alamat.
      headers: { 'Content-Type': 'application/json', 'x-goog-api-key': apiKey },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(Math.max(timeoutMs, 1000)),
    });
    const data: unknown = await res.json().catch(() => ({}));
    if (!res.ok) {
      const kind = classifyGeminiError(res.status, data);
      const msg = (data as { error?: { message?: string } }).error?.message ?? '';
      console.error(`Gemini ${model} error`, res.status, kind, msg.slice(0, 200));
      return { ok: false, kind };
    }
    return readGeminiReply(data);
  } catch (err) {
    const timeout = err instanceof Error && (err.name === 'TimeoutError' || err.name === 'AbortError');
    console.error(`Gemini ${model} failure`, timeout ? 'timeout' : err);
    return { ok: false, kind: timeout ? 'timeout' : 'unknown' };
  }
}

interface NetlifyContext {
  ip?: string;
}

export default async (req: Request, context: NetlifyContext): Promise<Response> => {
  const startedAt = Date.now();
  const origin = req.headers.get('origin');
  const allowed = origin !== null && ALLOWED_ORIGINS.some((re) => re.test(origin));
  const corsOrigin = allowed ? origin : null;

  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: allowed ? 204 : 403,
      headers: allowed
        ? {
            'Access-Control-Allow-Origin': origin!,
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, X-Gari-Test-Token',
            'Access-Control-Max-Age': '86400',
            Vary: 'Origin',
          }
        : {},
    });
  }
  if (!allowed) return json(403, { error: 'Asal permintaan tidak diizinkan.' }, null);
  if (req.method !== 'POST') return json(405, { error: 'Gunakan POST.' }, corsOrigin);

  const apiKey = process.env.GEMINI_API_KEY;
  const testToken = process.env.GARI_TEST_TOKEN;
  if (!apiKey || !testToken) return json(503, { error: 'Gari AI belum diaktifkan oleh pengelola aplikasi.' }, corsOrigin);
  if (!sameSecret(req.headers.get('x-gari-test-token'), testToken)) {
    return json(403, { error: 'Gari AI sedang dalam mode uji. Kode uji di Pengaturan belum benar.' }, corsOrigin);
  }

  if (rateLimited(context?.ip ?? 'unknown')) {
    return json(429, { error: 'Gari perlu istirahat sebentar. Coba lagi beberapa menit lagi.' }, corsOrigin);
  }

  const text = await req.text();
  if (text.length > LIMITS.body) return json(413, { error: 'Teks terlalu panjang.' }, corsOrigin);
  let raw: unknown;
  try {
    raw = JSON.parse(text);
  } catch {
    return json(400, { error: 'Permintaan tidak valid.' }, corsOrigin);
  }
  const parsed = validateRequest(raw);
  if (!parsed.ok) return json(400, { error: parsed.error }, corsOrigin);

  const prompt = buildPrompt(parsed.value);
  const primary = process.env.GEMINI_MODEL || DEFAULT_MODEL;
  const fallback = process.env.GEMINI_FALLBACK_MODEL ?? DEFAULT_FALLBACK_MODEL;
  const models = [primary, fallback].filter((m, i, all) => m && m !== 'none' && all.indexOf(m) === i);

  let last: CallResult = { ok: false, kind: 'unknown' };
  for (const model of models) {
    const remaining = () => DEADLINE_MS - (Date.now() - startedAt);
    if (remaining() < 1500) break;
    last = await callGemini(model, apiKey, buildGeminiBody(prompt), remaining());
    if (!last.ok && last.kind === 'thinking-unsupported' && remaining() >= 1500) {
      last = await callGemini(model, apiKey, buildGeminiBody(prompt, { thinking: false }), remaining());
    }
    if (last.ok) return json(200, { reply: tidyReply(last.text), model }, corsOrigin);
    if (!RETRY_WITH_FALLBACK.has(last.kind as GeminiErrorKind)) break;
  }
  const failure = USER_ERRORS[last.ok ? 'unknown' : last.kind];
  return json(failure.status, { error: failure.message }, corsOrigin);
};
