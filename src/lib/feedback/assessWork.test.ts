import { describe, expect, it } from 'vitest';
import { assessConversation, assessWork, evaluateArithmetic, relateToResult } from './assessWork';
import { parseNumber } from '../math/parse';
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
const ditaProblem = `${getItem('BS-4')!.context}\n${dita.prompt}`;
const ditaSolved = ['5.000 × 7 = 35.000\n35.000 + 20.000 = 55.000\nKesimpulan: jumlah tabungan Dita adalah Rp55.000.'];

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
  it('pertanyaan konfirmasi setelah jawaban benar → LANJUTAN (jawaban utama sudah BENAR)', () => {
    const earlier = ['Aku bingung', '5.000 × 7 = 35.000\n35.000 + 20.000 = 55.000'];
    expect(assessConversation(dita, 'Apakah jawabanku sudah benar?', earlier, catalog)).toEqual({ verdict: 'followup' });
  });

  it('pertanyaan setelah pekerjaan yang salah memakai penilaian pesan sebelumnya', () => {
    expect(assessConversation(dita, 'Kenapa belum tepat?', ['5.000 × 7 = 30.000'], catalog)).toEqual({ verdict: 'wrong', errorAt: '5.000 × 7 = 30.000', fromEarlier: true });
  });

  it('pekerjaan terbaru yang dipakai, bukan yang lama', () => {
    const earlier = ['5.000 × 7 = 30.000'];
    expect(assessConversation(dita, '5.000 × 7 = 35.000, 35.000 + 20.000 = 55.000', earlier, catalog).verdict).toBe('correct');
  });

  it('pekerjaan salah lalu benar → BENAR, dan pesan sesudahnya LANJUTAN', () => {
    const earlier = ['5.000 × 7 = 30.000', '5.000 × 7 = 35.000\n35.000 + 20.000 = 55.000'];
    expect(assessConversation(dita, 'Belum cukup, masih kurang Rp5.000', earlier, catalog, ditaProblem).verdict).toBe('followup');
  });

  it('tanpa pekerjaan sama sekali → none', () => {
    expect(assessConversation(dita, 'halo', ['apa itu gradien?'], catalog).verdict).toBe('none');
  });
});

describe('penalaran lanjutan setelah jawaban utama benar (kasus uji Netlify: Rp55.000 vs buku Rp60.000)', () => {
  const followUp = (text: string) => assessConversation(dita, text, ditaSolved, catalog, ditaProblem);
  const SHORTFALL = 'Angka di pesan siswa cocok dengan hasil yang sudah benar (55.000): 5.000 = selisih 60.000 dan 55.000.';

  it('"masih kurang Rp5.000" bukan jawaban pengganti → LANJUTAN, dikenali sebagai selisih', () => {
    expect(followUp('Belum cukup, masih kurang Rp5.000')).toEqual({ verdict: 'followup', note: SHORTFALL });
    expect(followUp('Jadi uangnya belum cukup karena masih kurang Rp5.000')).toEqual({ verdict: 'followup', note: SHORTFALL });
    expect(followUp('Belum cukup karena 55.000 kurang dari 60.000. Kurangnya 5.000')).toEqual({ verdict: 'followup', note: SHORTFALL });
  });

  it('penalaran dengan baris hitungan yang benar → LANJUTAN tanpa tanda keliru', () => {
    expect(followUp('60.000 − 55.000 = 5.000, jadi masih kurang Rp5.000')).toEqual({ verdict: 'followup', note: SHORTFALL });
  });

  it('penalaran tanpa angka → LANJUTAN (bukan "meminta konfirmasi")', () => {
    expect(followUp('belum cukup')).toEqual({ verdict: 'followup' });
  });

  it('regresi: baris hitungan keliru di pesan lanjutan tetap ditandai', () => {
    expect(followUp('60.000 − 55.000 = 4.000, jadi kurang 4.000')).toMatchObject({ verdict: 'followup', errorAt: '60.000 − 55.000 = 4.000' });
  });

  it('regresi: mengulang jawaban utama yang benar tetap BENAR', () => {
    expect(followUp('Tabungannya Rp55.000 kan?')).toEqual({ verdict: 'correct' });
  });

  it('regresi: tanpa jawaban benar sebelumnya, angka 5.000 tetap dinilai terhadap kunci (SALAH)', () => {
    expect(assessConversation(dita, 'Jadi tabungannya Rp5.000', [], catalog, ditaProblem).verdict).toBe('wrong');
    expect(assessConversation(dita, 'Jadi tabungannya Rp5.000', ['5.000 × 7 = 35.000'], catalog, ditaProblem).verdict).toBe('wrong');
  });

  it('relateToResult: jumlah, selisih, dan angka yang tidak berhubungan', () => {
    const key = parseNumber('55000')!;
    expect(relateToResult('kalau ditambah 20.000 jadi 75.000', key, ditaProblem)).toContain('75.000 = jumlah 55.000 dan 20.000');
    expect(relateToResult('butuh 8 hari', key, ditaProblem)).toBeUndefined();
    expect(relateToResult('masih kurang 5.000', key, '')).toBeUndefined();
  });
});
