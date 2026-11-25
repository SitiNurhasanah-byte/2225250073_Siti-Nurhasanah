import { useState } from 'react';
import type { Module } from '../../lib/content/schema';
import { getFunction, getTool } from '../../lib/content/loader';
import { useProgressStore } from '../../store/useProgressStore';
import { Button } from '../../components/Button';
import { Card } from '../../components/Card';
import { AskGari } from './AskGari';
import { functionNames, toolNames } from './aiContext';

function Field({ id, label, value, onChange }: { id: string; label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1 block font-semibold">
        {label}
      </label>
      <textarea
        id={id}
        rows={2}
        maxLength={300}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-card border border-border bg-surface p-2"
      />
    </div>
  );
}

/**
 * Jurnal RMT (docs/11 §3): refleksi metakognitif setelah latihan.
 * Siswa memilih fungsi kognitif yang ia pakai, alat yang membantu, dan bagian termudah/tersulit.
 */
export function JournalPage({ module, onDone }: { module: Module; onDone: () => void }) {
  const saved = useProgressStore((s) => s.journals.find((j) => j.moduleId === module.id));
  const saveJournal = useProgressStore((s) => s.saveJournal);
  const [functions, setFunctions] = useState<string[]>(saved?.functions ?? []);
  const [explanation, setExplanation] = useState(saved?.explanation ?? '');
  const [toolId, setToolId] = useState(saved?.toolId ?? '');
  const [toolReason, setToolReason] = useState(saved?.toolReason ?? '');
  const [easiest, setEasiest] = useState(saved?.easiest ?? '');
  const [hardest, setHardest] = useState(saved?.hardest ?? '');
  const [aiFeedback, setAiFeedback] = useState(saved?.aiFeedback);

  const toggle = (id: string) => setFunctions((f) => (f.includes(id) ? f.filter((x) => x !== id) : [...f, id]));
  const ready = functions.length > 0 && explanation.trim().length > 0 && toolId !== '';

  const summary = [
    `Fungsi kognitif yang kupakai: ${functionNames(functions).join(', ')}.`,
    `Penjelasanku: ${explanation}`,
    `Alat yang membantu: ${getTool(toolId)?.name ?? '-'}, karena ${toolReason || '-'}`,
    `Paling mudah: ${easiest || '-'}. Paling sulit: ${hardest || '-'}.`,
  ].join('\n');

  function save() {
    saveJournal({ moduleId: module.id, functions, explanation, toolId, toolReason, easiest, hardest, aiFeedback });
    onDone();
  }

  return (
    <div className="space-y-4">
      <Card className="space-y-2">
        <h2 className="text-xl font-semibold">Jurnal berpikirku</h2>
        <p className="text-muted">Lihat kembali cara berpikirmu. Tidak ada jawaban benar atau salah.</p>
      </Card>

      <Card className="space-y-3">
        <fieldset>
          <legend className="mb-2 font-semibold">1. Cara berpikir apa yang kamu pakai tadi? (boleh lebih dari satu)</legend>
          <div className="grid gap-2">
            {module.rmt.functions.map((id) => {
              const fn = getFunction(id);
              if (!fn) return null;
              return (
                <label key={id} className={`flex min-h-[44px] cursor-pointer items-start gap-2 rounded-card border p-2 ${functions.includes(id) ? 'border-accent bg-accent-soft' : 'border-border'}`}>
                  <input type="checkbox" className="mt-1" checked={functions.includes(id)} onChange={() => toggle(id)} />
                  <span>
                    <span className="block font-semibold">{fn.name}</span>
                    <span className="block text-sm text-muted">{fn.definition}</span>
                  </span>
                </label>
              );
            })}
          </div>
        </fieldset>
        <Field id="j-explain" label="2. Ceritakan satu langkah saat kamu memakai cara berpikir itu." value={explanation} onChange={setExplanation} />
      </Card>

      <Card className="space-y-3">
        <fieldset>
          <legend className="mb-2 font-semibold">3. Alat apa yang paling membantumu?</legend>
          <div className="flex flex-wrap gap-2">
            {module.rmt.tools.map((id) => (
              <button
                key={id}
                type="button"
                aria-pressed={toolId === id}
                onClick={() => setToolId(id)}
                className={`min-h-[44px] rounded-card border px-3 ${toolId === id ? 'border-accent bg-accent-soft font-semibold text-accent' : 'border-border'}`}
              >
                {getTool(id)?.name ?? id}
              </button>
            ))}
          </div>
        </fieldset>
        <Field id="j-tool" label="Mengapa alat itu membantu?" value={toolReason} onChange={setToolReason} />
      </Card>

      <Card className="space-y-3">
        <Field id="j-easy" label="4. Bagian paling mudah" value={easiest} onChange={setEasiest} />
        <Field id="j-hard" label="5. Bagian paling sulit" value={hardest} onChange={setHardest} />
      </Card>

      {ready && (
        <AskGari
          context={{ mode: 'journal', topic: module.title, problem: '', functions: functionNames(module.rmt.functions), tools: toolNames(module) }}
          moduleId={module.id}
          presetText={summary}
          onReply={setAiFeedback}
        />
      )}
      {aiFeedback && !ready && <p className="text-sm text-muted">Tanggapan Gari AI sebelumnya tersimpan.</p>}

      <div className="flex justify-end">
        <Button disabled={!ready} onClick={save}>
          Simpan jurnal →
        </Button>
      </div>
      {!ready && <p className="text-right text-sm text-muted">Isi nomor 1, 2, dan 3 dulu.</p>}
    </div>
  );
}
