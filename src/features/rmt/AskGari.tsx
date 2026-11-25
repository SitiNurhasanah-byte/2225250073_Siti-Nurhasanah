import { useState } from 'react';
import { askMediator } from '../../lib/ai/mediator';
import { redact, type MediatorRequest } from '../../lib/ai/prompt';
import { useProgressStore } from '../../store/useProgressStore';
import { threadKey, useChatSessionStore } from '../../store/useChatSessionStore';
import { useSettingsStore } from '../../store/useSettingsStore';
import { Button } from '../../components/Button';
import { MathText } from '../../components/MathText';

type Context = Omit<MediatorRequest, 'studentText' | 'history' | 'attempt'>;

const copy = {
  hint: {
    open: '💬 Tanya Gari AI',
    label: 'Ceritakan bagian yang membuatmu bingung',
    placeholder: 'Mis. "Aku tidak tahu harus mengurangi yang mana dulu"',
    send: 'Kirim ke Gari',
  },
  evidence: {
    open: '💬 Jelaskan alasanmu ke Gari AI',
    label: 'Mengapa jawabanmu benar? Tulis alasanmu',
    placeholder: 'Mis. "Karena setiap x naik 1, y naik 2"',
    send: 'Minta tanggapan',
  },
  journal: {
    open: '💬 Minta tanggapan Gari AI',
    label: 'Isi jurnalmu akan dikirim ke Gari AI',
    placeholder: '',
    send: 'Minta tanggapan',
  },
} as const;

interface Props {
  context: Context;
  moduleId: string;
  itemId?: string;
  stage?: number;
  /** Mode hint: kunci yang dipakai di perangkat untuk menyaring balasan, tidak dikirim. */
  secretAnswer?: string;
  /** Mode journal: teks sudah disusun dari formulir jurnal. */
  presetText?: string;
  /** Mode hint: jejak usaha siswa pada langkah ini. */
  attempt?: MediatorRequest['attempt'];
  onReply?: (reply: string) => void;
}

/**
 * Gari AI – Asisten Belajar Matematika: mediator RMT berbasis Google Gemini (docs/11 §4 dan §6).
 * MODE UJI: hanya tampil jika guru/peneliti mengaktifkannya dan mengisi kode uji di Pengaturan.
 * Riwayat percakapan bertahan selama sesi belajar. Tanpa ilustrasi maskot (area soal, docs/04 §7.3).
 */
export function AskGari({ context, moduleId, itemId, stage, secretAnswer, presetText, attempt, onReply }: Props) {
  const aiEnabled = useSettingsStore((s) => s.aiEnabled);
  const testToken = useSettingsStore((s) => s.aiTestToken);
  const addAiLog = useProgressStore((s) => s.addAiLog);
  const key = threadKey(moduleId, itemId, stage, context.mode);
  const thread = useChatSessionStore((s) => s.threads[key]);
  const append = useChatSessionStore((s) => s.append);
  const [open, setOpen] = useState(false);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const t = copy[context.mode];
  const turns = thread ?? [];
  const inputId = `ask-${context.mode}-${stage ?? 'j'}`;

  if (!aiEnabled || !testToken) return null;

  async function send() {
    const studentText = (presetText ?? text).trim();
    if (studentText.length < 2) {
      setError('Tulis dulu pertanyaan atau penjelasanmu.');
      return;
    }
    setLoading(true);
    setError(null);
    const result = await askMediator({ ...context, studentText, attempt, history: turns }, testToken, secretAnswer);
    setLoading(false);
    if (!result.ok) {
      setError(result.message);
      return;
    }
    append(key, [
      { role: 'student', text: redact(studentText) },
      { role: 'gari', text: result.reply },
    ]);
    setText('');
    addAiLog({ moduleId, itemId, stage, mode: context.mode, question: redact(studentText), reply: result.reply });
    onReply?.(result.reply);
  }

  if (!open && turns.length === 0 && presetText === undefined) {
    return (
      <Button variant="ghost" onClick={() => setOpen(true)}>
        {t.open}
      </Button>
    );
  }

  const canType = presetText === undefined;
  return (
    <div className="space-y-2 rounded-card border border-accent/40 p-3">
      <p className="text-sm font-semibold text-accent">Gari AI – Asisten Belajar Matematika</p>
      {turns.length > 0 && (
        <ol className="space-y-2" aria-label="Percakapan dengan Gari AI">
          {turns.map((turn, i) => (
            <li
              key={i}
              className={turn.role === 'gari' ? 'rounded-card bg-accent-soft p-3' : 'ml-6 rounded-card border border-border p-2 text-[0.95rem]'}
            >
              <p className={`mb-1 text-xs font-semibold ${turn.role === 'gari' ? 'text-accent' : 'text-muted'}`}>
                {turn.role === 'gari' ? 'Gari AI' : 'Kamu'}
              </p>
              <p className="whitespace-pre-line">
                {turn.role === 'gari' ? <MathText text={turn.text} /> : turn.text}
              </p>
            </li>
          ))}
        </ol>
      )}
      {loading && (
        <p className="rounded-card bg-accent-soft p-3 text-muted" role="status" aria-live="polite">
          Gari sedang berpikir…
        </p>
      )}
      {canType && (
        <>
          <label className="block text-sm font-semibold text-muted" htmlFor={inputId}>
            {turns.length > 0 ? 'Balas Gari atau tanya lagi' : t.label}
          </label>
          <textarea
            id={inputId}
            value={text}
            onChange={(e) => setText(e.target.value)}
            maxLength={600}
            rows={2}
            placeholder={turns.length > 0 ? '' : t.placeholder}
            disabled={loading}
            className="w-full rounded-card border border-border bg-surface p-2"
          />
        </>
      )}
      <div className="flex flex-wrap items-center gap-2">
        <Button variant="secondary" onClick={send} disabled={loading || (!canType && turns.length > 0)}>
          {loading ? 'Gari sedang berpikir…' : canType ? t.send : t.open}
        </Button>
        <span className="text-xs text-muted">Gari AI tidak memberi kunci jawaban. Jangan tulis data pribadi.</span>
      </div>
      {error && (
        <p className="text-[0.95rem] text-muted" role="alert">
          ⓘ {error}
        </p>
      )}
    </div>
  );
}
