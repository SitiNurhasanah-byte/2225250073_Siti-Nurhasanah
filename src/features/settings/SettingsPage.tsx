import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useProgressStore } from '../../store/useProgressStore';
import { useSettingsStore, type FontScale, type Theme } from '../../store/useSettingsStore';
import { buildCsvFiles, buildJson, APP_VERSION } from '../../lib/export/exportData';
import { saveFile } from '../../lib/export/saveFile';
import { TopBar } from '../../components/TopBar';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { Feedback } from '../../components/Feedback';

function Choice<T extends string>({ name, value, options, onChange }: { name: string; value: T; options: Array<[T, string]>; onChange: (v: T) => void }) {
  return (
    <div className="flex flex-wrap gap-2" role="radiogroup" aria-label={name}>
      {options.map(([v, label]) => (
        <button
          key={v}
          type="button"
          role="radio"
          aria-checked={value === v}
          onClick={() => onChange(v)}
          className={`min-h-[44px] rounded-card border px-4 ${value === v ? 'border-accent bg-accent-soft font-semibold text-accent' : 'border-border'}`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

/** L11 Pengaturan & Ekspor (F11). */
export function SettingsPage() {
  const progress = useProgressStore();
  const { fontScale, theme, aiEnabled, aiTestToken, setFontScale, setTheme, setAiEnabled, setAiTestToken } = useSettingsStore();
  const [message, setMessage] = useState('');
  const [confirmReset, setConfirmReset] = useState(false);

  async function exportJson() {
    const how = await saveFile(`garisku-${progress.studentCode ?? 'siswa'}.json`, buildJson(progress), 'application/json');
    setMessage(how === 'shared' ? 'File JSON dibagikan.' : 'File JSON diunduh.');
  }
  async function exportCsv() {
    for (const file of buildCsvFiles(progress)) await saveFile(file.name, file.content, 'text/csv');
    setMessage('Lima file CSV (attempts, effort, journal, ai, research) disimpan.');
  }

  return (
    <div className="space-y-4">
      <TopBar title="Pengaturan" back="/" />

      <Card className="space-y-3">
        <h2 className="font-semibold">Tampilan</h2>
        <p className="text-sm text-muted">Ukuran huruf</p>
        <Choice<FontScale> name="Ukuran huruf" value={fontScale} onChange={setFontScale} options={[['normal', 'Normal'], ['large', 'Besar']]} />
        <p className="text-sm text-muted">Tema</p>
        <Choice<Theme> name="Tema" value={theme} onChange={setTheme} options={[['system', 'Ikuti perangkat'], ['light', 'Terang'], ['dark', 'Gelap']]} />
      </Card>

      <Card className="space-y-3">
        <h2 className="font-semibold">Gari AI (mode uji – khusus guru/peneliti)</h2>
        <p className="text-sm text-muted">
          Gari AI memakai Google Gemini. Ketentuan Gemini API tidak mengizinkan pemakaian oleh pengguna di bawah 18 tahun,
          jadi fitur ini hanya untuk uji coba oleh orang dewasa. Teks yang diketik dikirim ke Google tanpa kode siswa
          dan, pada versi gratis, dapat dipakai Google untuk mengembangkan layanannya.
        </p>
        <label className="block text-sm font-semibold" htmlFor="ai-token">Kode uji dari pengelola aplikasi</label>
        <input
          id="ai-token"
          type="password"
          autoComplete="off"
          value={aiTestToken}
          onChange={(e) => setAiTestToken(e.target.value)}
          className="w-full rounded-card border border-border bg-surface p-2"
        />
        <Choice<'on' | 'off'> name="Gari AI" value={aiEnabled ? 'on' : 'off'} onChange={(v) => setAiEnabled(v === 'on')} options={[['on', 'Aktif'], ['off', 'Nonaktif']]} />
        {aiEnabled && !aiTestToken && <p className="text-sm text-muted">ⓘ Isi kode uji agar tombol Gari AI muncul di latihan.</p>}
      </Card>

      <Card className="space-y-2">
        <h2 className="font-semibold">Identitas</h2>
        <p>Kode siswa: <strong>{progress.studentCode}</strong>{progress.className && <> · Kelas {progress.className}</>}</p>
        <p className="text-sm text-muted">Data hanya tersimpan di perangkat ini dan keluar hanya jika diekspor.</p>
      </Card>

      <Card className="space-y-3">
        <h2 className="font-semibold">Ekspor data (untuk peneliti)</h2>
        <div className="flex flex-wrap gap-2">
          <Button variant="secondary" onClick={exportJson}>Ekspor JSON</Button>
          <Button variant="secondary" onClick={exportCsv}>Ekspor CSV</Button>
        </div>
        {message && <Feedback tone="success" message={message} />}
        <Link to="/penelitian" className="inline-block min-h-[44px] py-2 font-semibold text-accent underline">
          Menu peneliti (status pretest/posttest, input skor) →
        </Link>
      </Card>

      <Card className="space-y-2">
        <h2 className="font-semibold">Hapus semua data</h2>
        <p className="text-sm text-muted">Kemajuan, jawaban, dan skor di perangkat ini akan dihapus. Ekspor dulu jika perlu.</p>
        {confirmReset ? (
          <div className="flex flex-wrap gap-2">
            <Button className="bg-error" onClick={() => progress.resetAll()}>Ya, hapus semua</Button>
            <Button variant="secondary" onClick={() => setConfirmReset(false)}>Batal</Button>
          </div>
        ) : (
          <Button variant="secondary" onClick={() => setConfirmReset(true)}>Hapus data…</Button>
        )}
      </Card>

      <p className="pb-6 text-center text-sm text-muted">GarisKu versi {APP_VERSION}</p>
    </div>
  );
}
