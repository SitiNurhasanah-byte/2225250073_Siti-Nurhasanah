/**
 * Adaptor Google Gemini API (REST generateContent). Murni: tanpa fetch, tanpa kunci API.
 * Dipakai oleh Netlify Function; diuji di src/lib/ai/ai.test.ts.
 */
import type { Prompt } from './prompt';

export const GEMINI_BASE = 'https://generativelanguage.googleapis.com/v1beta/models';

/** Model bawaan: stabil & gratis (Free Tier) per 25-11-2026. Bisa diganti lewat env GEMINI_MODEL. */
export const DEFAULT_MODEL = 'gemini-3.5-flash-lite';
/** Cadangan jika kuota/kapasitas model utama habis (kuota Free Tier dihitung per model). */
export const DEFAULT_FALLBACK_MODEL = 'gemini-3.6-flash';

export function geminiUrl(model: string): string {
  return `${GEMINI_BASE}/${encodeURIComponent(model)}:generateContent`;
}

export interface GeminiBody {
  systemInstruction: { parts: Array<{ text: string }> };
  contents: Array<{ role: 'user' | 'model'; parts: Array<{ text: string }> }>;
  generationConfig: {
    temperature: number;
    maxOutputTokens: number;
    thinkingConfig?: { thinkingLevel: 'MINIMAL' };
  };
}

/**
 * Body permintaan. `thinking: false` menghapus thinkingConfig untuk model yang tidak mendukungnya.
 * Berpikir dibuat minimal agar balasan cepat (batas waktu Netlify Function ±10 detik) dan hemat kuota.
 */
export function buildGeminiBody(prompt: Prompt, { thinking = true }: { thinking?: boolean } = {}): GeminiBody {
  return {
    systemInstruction: { parts: [{ text: prompt.system }] },
    contents: prompt.turns.map((t) => ({ role: t.role, parts: [{ text: t.text }] })),
    generationConfig: {
      temperature: 0.4,
      maxOutputTokens: 512,
      ...(thinking ? { thinkingConfig: { thinkingLevel: 'MINIMAL' as const } } : {}),
    },
  };
}

export type GeminiReply = { ok: true; text: string } | { ok: false; kind: 'blocked' | 'empty' };

interface GeminiResponse {
  promptFeedback?: { blockReason?: string };
  candidates?: Array<{ finishReason?: string; content?: { parts?: Array<{ text?: string; thought?: boolean }> } }>;
}

const BLOCK_REASONS = new Set(['SAFETY', 'BLOCKLIST', 'PROHIBITED_CONTENT', 'SPII', 'RECITATION']);

/** Mengambil teks balasan (tanpa bagian "thought"); membedakan diblokir vs kosong. */
export function readGeminiReply(data: unknown): GeminiReply {
  const res = (data ?? {}) as GeminiResponse;
  if (res.promptFeedback?.blockReason) return { ok: false, kind: 'blocked' };
  const candidate = res.candidates?.[0];
  const text = (candidate?.content?.parts ?? [])
    .filter((p) => !p.thought && typeof p.text === 'string')
    .map((p) => p.text)
    .join('')
    .trim();
  if (text) return { ok: true, text };
  if (candidate?.finishReason && BLOCK_REASONS.has(candidate.finishReason)) return { ok: false, kind: 'blocked' };
  return { ok: false, kind: 'empty' };
}

export type GeminiErrorKind = 'invalid-key' | 'quota' | 'overloaded' | 'model-unavailable' | 'thinking-unsupported' | 'bad-request' | 'unknown';

interface GoogleError {
  error?: { code?: number; status?: string; message?: string; details?: Array<{ reason?: string }> };
}

/** Mengelompokkan galat HTTP Gemini. */
export function classifyGeminiError(status: number, body: unknown): GeminiErrorKind {
  const err = ((body ?? {}) as GoogleError).error ?? {};
  const message = (err.message ?? '').toLowerCase();
  const reasons = (err.details ?? []).map((d) => d.reason ?? '');
  if (reasons.includes('API_KEY_INVALID') || status === 401 || (status === 403 && err.status === 'PERMISSION_DENIED')) return 'invalid-key';
  if (status === 429 || err.status === 'RESOURCE_EXHAUSTED') return 'quota';
  if (status === 404 || err.status === 'NOT_FOUND') return 'model-unavailable';
  if (status === 400 && message.includes('thinking')) return 'thinking-unsupported';
  if (status === 503 || status === 500 || status === 504 || err.status === 'UNAVAILABLE') return 'overloaded';
  if (status === 400) return 'bad-request';
  return 'unknown';
}

/** Galat yang layak dicoba ulang dengan model cadangan. */
export const RETRY_WITH_FALLBACK: ReadonlySet<GeminiErrorKind> = new Set(['quota', 'overloaded', 'model-unavailable']);

/** Pesan untuk siswa/guru (Bahasa Indonesia, ramah) beserta status HTTP yang dikirim ke aplikasi. */
export const USER_ERRORS: Record<GeminiErrorKind | 'blocked' | 'empty' | 'timeout', { status: number; message: string }> = {
  'invalid-key': { status: 503, message: 'Gari AI belum terhubung: kunci API Gemini tidak valid. Beri tahu pengelola aplikasi.' },
  quota: { status: 429, message: 'Kuota gratis Gari AI sedang habis. Coba lagi nanti, atau pakai petunjuk bertingkat dulu.' },
  overloaded: { status: 503, message: 'Server Gemini sedang sibuk. Tunggu sebentar, lalu coba lagi.' },
  'model-unavailable': { status: 503, message: 'Model AI yang dipakai sedang tidak tersedia. Beri tahu pengelola aplikasi.' },
  'thinking-unsupported': { status: 502, message: 'Gari AI sedang tidak bisa dihubungi. Coba lagi nanti.' },
  'bad-request': { status: 502, message: 'Gari AI sedang tidak bisa dihubungi. Coba lagi nanti.' },
  unknown: { status: 502, message: 'Gari AI sedang tidak bisa dihubungi. Coba lagi nanti.' },
  blocked: { status: 422, message: 'Gari tidak bisa menanggapi pesan itu. Coba tanyakan hal lain tentang soal ini.' },
  empty: { status: 502, message: 'Gari AI tidak memberi jawaban. Coba kirim lagi.' },
  timeout: { status: 504, message: 'Gari AI terlalu lama menjawab. Coba lagi.' },
};
