import { leaksAnswer, redact, type MediatorRequest } from './prompt';

/** Alamat produksi fungsi Gari AI (dipakai oleh APK, GitHub Pages, dan `npm run dev`). */
const PRODUCTION_ENDPOINT = 'https://garisku.netlify.app/api/mediator';

export function resolveEndpoint(loc: { hostname: string; port: string; protocol: string }, override?: string): string {
  if (override) return override;
  const sameOrigin = loc.protocol.startsWith('http') && (/(^|\.)garisku\.netlify\.app$/.test(loc.hostname) || loc.port === '8888');
  return sameOrigin ? '/api/mediator' : PRODUCTION_ENDPOINT;
}

export type MediatorResult = { ok: true; reply: string } | { ok: false; message: string };

const SAFE_HINT =
  'Coba ingat lagi langkah di kartu materi, lalu cek pekerjaanmu satu per satu. Pertanyaan apa yang sedang ditanyakan soal ini?';

/**
 * Bertanya kepada Gari AI (Netlify Function → Google Gemini).
 * `secretAnswer` (mode hint) TIDAK dikirim ke server; hanya dipakai di perangkat untuk mencegah balasan
 * yang membocorkan kunci. `testToken` adalah kode uji guru/peneliti (mode uji, docs/09 §2a).
 */
export async function askMediator(request: MediatorRequest, testToken: string, secretAnswer?: string): Promise<MediatorResult> {
  if (typeof navigator !== 'undefined' && !navigator.onLine) {
    return { ok: false, message: 'Gari AI perlu internet. Kamu tetap bisa memakai petunjuk bertingkat di bawah.' };
  }
  const endpoint = resolveEndpoint(window.location, import.meta.env.VITE_AI_ENDPOINT as string | undefined);
  // Data pribadi disamarkan di perangkat sebelum dikirim (dan sekali lagi di server).
  const body: MediatorRequest = {
    ...request,
    studentText: redact(request.studentText),
    history: request.history?.map((t) => (t.role === 'student' ? { ...t, text: redact(t.text) } : t)),
  };
  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-Gari-Test-Token': testToken },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(25000),
    });
    const data = (await res.json().catch(() => ({}))) as { reply?: string; error?: string };
    if (!res.ok || !data.reply) return { ok: false, message: data.error ?? 'Gari AI sedang tidak bisa dihubungi. Coba lagi nanti.' };
    const reply = request.mode === 'hint' && leaksAnswer(data.reply, secretAnswer) ? SAFE_HINT : data.reply;
    return { ok: true, reply };
  } catch {
    return { ok: false, message: 'Gari AI tidak bisa dihubungi. Periksa internet, lalu coba lagi.' };
  }
}
