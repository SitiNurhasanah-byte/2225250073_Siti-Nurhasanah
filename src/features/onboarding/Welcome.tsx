import { useState, type FormEvent } from 'react';
import { useProgressStore } from '../../store/useProgressStore';
import { Button } from '../../components/Button';
import { Card } from '../../components/Card';
import { Gari } from '../../components/Gari';
import { BananaPattern } from '../../components/Banana';

const CODE_PATTERN = /^[A-Za-z0-9-]{1,12}$/;

/** L01 Sambutan: isi kode siswa saja, tanpa nama lengkap (CLAUDE.md §Privasi). */
export function Welcome() {
  const setStudent = useProgressStore((s) => s.setStudent);
  const [code, setCode] = useState('');
  const [className, setClassName] = useState('');
  const [error, setError] = useState('');

  function submit(e: FormEvent) {
    e.preventDefault();
    if (!CODE_PATTERN.test(code.trim())) {
      setError('Kode hanya boleh huruf, angka, atau tanda "-" (maksimal 12), misalnya S01.');
      return;
    }
    setStudent(code, className);
  }

  return (
    <>
      <BananaPattern />
      <div className="relative flex min-h-[90dvh] flex-col justify-center gap-6 py-8">
        <div className="flex flex-col items-center text-center">
          <Gari expression="wave" size={140} />
          <h1 className="mt-4 text-2xl font-semibold">Selamat datang di GarisKu</h1>
          <p className="mt-2 max-w-sm text-muted">
            Belajar persamaan garis lurus langkah demi langkah, sesuai kecepatanmu sendiri.
          </p>
        </div>

        <Card>
          <form onSubmit={submit} className="space-y-4">
            <div>
              <label htmlFor="code" className="mb-1 block font-semibold">Kode siswa</label>
              <input
                id="code"
                value={code}
                onChange={(e) => {
                  setCode(e.target.value.toUpperCase());
                  setError('');
                }}
                className="min-h-[48px] w-full rounded-card border border-border bg-surface px-3 text-lg uppercase"
                placeholder="S01"
                autoComplete="off"
                aria-describedby="code-help"
                required
              />
              <p id="code-help" className="mt-1 text-sm text-muted">
                Pakai kode dari gurumu. Jangan menulis nama lengkap.
              </p>
            </div>
            <div>
              <label htmlFor="class" className="mb-1 block font-semibold">
                Kelas <span className="font-normal text-muted">(boleh dikosongkan)</span>
              </label>
              <input
                id="class"
                value={className}
                onChange={(e) => setClassName(e.target.value)}
                className="min-h-[48px] w-full rounded-card border border-border bg-surface px-3 text-lg"
                placeholder="IX-A"
                autoComplete="off"
              />
            </div>
            {error && <p className="text-error" role="alert">✕ {error}</p>}
            <Button type="submit" className="w-full">Mulai belajar</Button>
            <p className="text-center text-sm text-muted">Data belajarmu hanya tersimpan di perangkat ini.</p>
          </form>
        </Card>
      </div>
    </>
  );
}
