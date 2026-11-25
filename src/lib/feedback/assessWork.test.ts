import { describe, expect, it } from 'vitest';
import { assessConversation, assessWork, evaluateArithmetic } from './assessWork';
import { content, getItem } from '../content/loader';
import type { Step } from '../content/schema';

const catalog = content.misconceptions;

function step(itemId: string, stage: number): Step {
  const s = getItem(itemId)?.steps.find((x) => x.stage === stage);
  if (!s) throw new Error(`Langkah ${itemId} T${stage} tidak ada`);
  return s;
}

// BS-4 T2: Hitung y = 5.000(7) + 20.000 (kunci 55000; 35000 = M-OP-02 lupa tabungan awal).
const dita = step('BS-4', 2);

describe('evaluateArithmetic', () => {
  it('menghitung format Indonesia dengan pecahan eksak', () => {
    expect(evaluateArithmetic('5.000 * 7')?.toString()).toBe('35000');
    expect(evaluateArithmetic('5.000(7) + 20.000')?.toString()).toBe('55000');
    expect(evaluateArithmetic('(7 - 3) / (4 - 2)')?.toString()).toBe('2');
    expect(evaluateArithmetic('1 / 3')?.toString()).toBe('1/3');
    expect(evaluateArithmetic('5 / 0')).toBeNull();
    expect(evaluateArithmetic('5 +')).toBeNull();
  });
});

describe('assessWork — langkah angka (soal Dita)', () => {
  it('jawaban benar dengan langkah lengkap (kasus dari pengujian guru)', () => {
    const text = '- 5.000 × 7 = 35.000\n- 35.000 + 20.000 = 55.000\n- Kesimpulan: jumlah tabungan Dita adalah Rp55.000.';
    expect(assessWork(dita, text, catalog)).toEqual({ verdict: 'correct' });
  });

  it('jawaban benar dalam berbagai bentuk penulisan', () => {
    expect(assessWork(dita, 'y = 5.000(7) + 20.000 = 55.000', catalog).verdict).toBe('correct');
    expect(assessWork(dita, 'Jadi 5.000 x 7 + 20.000 = 55.000', catalog).verdict).toBe('correct');
    expect(assessWork(dita, 'Apakah Rp55.000 benar?', catalog).verdict).toBe('correct');
    expect(assessWork(dita, '1. 5.000 × 7 = 35.000\n2. 35.000 + 20.000 = 55.000', catalog).verdict).toBe('correct');
  });

  it('hitungan keliru: menyebut baris yang salah', () => {
    const r = assessWork(dita, '5.000 × 7 = 30.000\n30.000 + 20.000 = 50.000', catalog);
    expect(r).toEqual({ verdict: 'wrong', errorAt: '5.000 × 7 = 30.000' });
  });

  it('kesimpulan tidak sama dengan kunci → salah, dengan diagnosis miskonsepsi', () => {
    const r = assessWork(dita, '5.000 × 7 = 35.000. Jadi tabungannya Rp35.000', catalog);
    expect(r.verdict).toBe('wrong');
    expect(r.note).toBe(catalog['M-OP-02'].message.replace(/^Belum tepat\.\s*/, ''));
    expect(r.note).not.toContain('55');
  });

  it('hitungan cocok tetapi belum sampai hasil yang ditanya → belum lengkap', () => {
    const r = assessWork(dita, '5.000 × 7 = 35.000', catalog);
    expect(r.verdict).toBe('incomplete');
  });

  it('hanya bertanya → belum ada jawaban', () => {
    expect(assessWork(dita, 'Aku bingung mulai dari mana', catalog).verdict).toBe('none');
    expect(assessWork(dita, 'Langkah 2: aku kalikan 5.000 dengan 7 dulu ya?', catalog).verdict).toBe('none');
  });

  it('tidak salah membaca penanda langkah "Langkah 2:" sebagai pembagian', () => {
    expect(assessWork(dita, 'Langkah 2: 5.000 × 7 = 35.000, lalu 35.000 + 20.000 = 55.000', catalog).verdict).toBe('correct');
  });

  it('angka negatif dan pecahan (BS-3)', () => {
    expect(assessWork(step('BS-3', 3), '3 = 4 + c, jadi c = -1', catalog).verdict).toBe('correct');
    expect(assessWork(step('BS-3', 3), 'c = 7', catalog).verdict).toBe('wrong');
    expect(assessWork(step('BS-3', 2), 'm = (7 - 3) / (4 - 2) = 4/2 = 2', catalog).verdict).toBe('correct');
  });
});

describe('assessWork — langkah persamaan & pilihan', () => {
  it('persamaan setara dianggap benar, yang lain salah', () => {
    const eq = step('BS-3', 4);
    expect(assessWork(eq, 'Persamaannya y = 2x − 1 kan?', catalog).verdict).toBe('correct');
    expect(assessWork(eq, 'y = -1 + 2x', catalog).verdict).toBe('correct');
    expect(assessWork(eq, 'y = 2x + 1', catalog).verdict).toBe('wrong');
    expect(assessWork(eq, 'aku belum tahu', catalog).verdict).toBe('none');
  });

  it('langkah pilihan ganda tidak dinilai dari teks bebas', () => {
    expect(assessWork(step('BS-4', 3), 'pilihan A', catalog).verdict).toBe('none');
  });
});

describe('assessConversation', () => {
  it('pertanyaan konfirmasi memakai pekerjaan siswa sebelumnya', () => {
    const earlier = ['Aku bingung', '5.000 × 7 = 35.000\n35.000 + 20.000 = 55.000'];
    expect(assessConversation(dita, 'Apakah jawabanku sudah benar?', earlier, catalog)).toEqual({ verdict: 'correct', fromEarlier: true });
  });

  it('pekerjaan terbaru yang dipakai, bukan yang lama', () => {
    const earlier = ['5.000 × 7 = 30.000'];
    expect(assessConversation(dita, '5.000 × 7 = 35.000, 35.000 + 20.000 = 55.000', earlier, catalog).verdict).toBe('correct');
  });

  it('tanpa pekerjaan sama sekali → none', () => {
    expect(assessConversation(dita, 'halo', ['apa itu gradien?'], catalog).verdict).toBe('none');
  });
});
