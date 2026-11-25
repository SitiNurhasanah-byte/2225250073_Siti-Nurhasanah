import { leaksAnswer, redact, studentWroteAnswer, type ChatTurn, type MediatorRequest } from './prompt';

/** Alamat produksi fungsi Gari AI (dipakai oleh APK, GitHub Pages, dan `npm run dev`). */
const PRODUCTION_ENDPOINT = 'https://garisku.netlify.app/api/mediator';

export function resolveEndpoint(loc: { hostname: string; port: string; protocol: string }, override?: string): string {
  if (override) return override;
  const sameOrigin = loc.protocol.startsWith('http') && (/(^|\.)garisku\.netlify\.app$/.test(loc.hostname) || loc.port === '8888');
  return sameOrigin ? '/api/mediator' : PRODUCTION_ENDPOINT;
}

/** `local: true` = balasan Gemini diganti di perangkat karena hampir membocorkan kunci. */
export type MediatorResult = { ok: true; reply: string; local?: boolean } | { ok: false; message: string };

export const SAFE_HINT =
  'Gari tidak boleh menyebut jawabannya dulu 🙂 Tulis langkah hitungmu satu per satu di sini, nanti Gari bantu cek. Bagian mana yang sudah kamu hitung?';

/**
 * Penyaring kebocoran mode hint. Tidak menyaring jika kunci itu sudah ditulis siswa sendiri
 * (mis. siswa menulis "Rp55.000" lalu Gari mengonfirmasinya) — itu konfirmasi, bukan kebocoran.
 */
export function filterReply(request: MediatorRequest, reply: string, secretAnswer?: string): MediatorResult {
  if (request.mode !== 'hint' || !leaksAnswer(reply, secretAnswer)) return { ok: true, reply };
  const ownTexts = [request.studentText, ...(request.history ?? []).filter((t) => t.role === 'student').map((t) => t.text)];
  if (studentWroteAnswer(ownTexts, secretAnswer)) return { ok: true, reply };
  return { ok: true, reply: SAFE_HINT, local: true };
}

/**
 * Riwayat yang dikirim ke Gemini: pasangan siswa → Gari yang balasan Gari-nya pengganti lokal dibuang,
 * agar model tidak "melihat" dirinya mengulang kalimat yang bukan buatannya. Bidang `local` tidak dikirim.
 */
export function historyForModel(turns: ChatTurn[] | undefined): ChatTurn[] {
  const out: ChatTurn[] = [];
  const list = turns ?? [];
  for (let i = 0; i + 1 < list.length; i += 2) {
    const [student, gari] = [list[i], list[i + 1]];
    if (student.role !== 'student' || gari.role !== 'gari') return [];
    if (!gari.local) out.push({ role: 'student', text: student.text }, { role: 'gari', text: gari.text });
  }
  return out;
}

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
    history: historyForModel(request.history).map((t) => (t.role === 'student' ? { ...t, text: redact(t.text) } : t)),
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
    return filterReply(request, data.reply, secretAnswer);
  } catch {
    return { ok: false, message: 'Gari AI tidak bisa dihubungi. Periksa internet, lalu coba lagi.' };
  }
}
