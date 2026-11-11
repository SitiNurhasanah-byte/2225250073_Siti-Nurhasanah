import { describe, expect, it } from 'vitest';
import { acceptLearningItems, content, getItem, stepsFor } from './loader';
import { parseNumber, parseLinearEquation } from '../math/parse';
import { isPointOnLine, pt, toLine } from '../math/line';
import type { Item } from './schema';

/**
 * Validasi konten (npm run validate:content).
 * Konten tidak boleh salah kunci: setiap jawaban diperiksa dengan lib/math.
 */
const items = [...content.items.values()];

describe('struktur konten', () => {
  it('ada 6 modul berurutan M1–M6', () => {
    expect(content.modules.map((m) => m.id)).toEqual(['M1', 'M2', 'M3', 'M4', 'M5', 'M6']);
  });

  it('setiap modul merujuk butir dan tahap yang ada', () => {
    for (const mod of content.modules) {
      for (const ref of [mod.example, ...mod.practice]) {
        const item = getItem(ref.itemId);
        expect(item, `${mod.id} → ${ref.itemId}`).toBeDefined();
        const steps = stepsFor(item!, ref);
        expect(steps.length, `${mod.id} → ${ref.itemId} tahap`).toBeGreaterThan(0);
        expect(ref.prefill, `${mod.id} prefill`).toBeLessThan(steps.length);
      }
    }
  });

  it('kartu: maksimal 3 kalimat per blok & istilah glosarium tersedia', () => {
    for (const mod of content.modules) {
      for (const card of mod.cards) {
        const plain = card.body.replace(/\$[^$]+\$/g, 'X');
        const sentences = plain.split(/[.!?](\s|$)/).filter((s) => s && s.trim().length > 1);
        expect(sentences.length, `${mod.id} "${card.title}"`).toBeLessThanOrEqual(3);
        for (const [, term] of card.body.matchAll(/\[\[([^\]|]+)/g)) {
          expect(content.glossary[term], `glosarium "${term}"`).toBeDefined();
        }
      }
    }
  });

  it('BS-1 s.d. BS-4 bernilai total 6 sesuai rubrik', () => {
    for (const id of ['BS-1', 'BS-2', 'BS-3', 'BS-4']) {
      const total = getItem(id)!.steps.reduce((sum, s) => sum + s.score, 0);
      expect(total, id).toBe(6);
    }
  });
});

describe('kebenaran kunci jawaban', () => {
  it.each(items.map((i) => [i.id, i] as [string, Item]))('%s', (_id, item) => {
    expect(item.hints).toHaveLength(3);
    for (const step of item.steps) {
      const label = `${item.id} tahap ${step.stage} (${step.label})`;
      for (const m of step.misconceptions) {
        expect(content.misconceptions[m.code], `${label}: kode ${m.code}`).toBeDefined();
      }
      if (step.kind === 'number') {
        const answer = parseNumber(step.answer);
        expect(answer, label).not.toBeNull();
        for (const m of step.misconceptions) {
          const wrong = parseNumber(m.value);
          expect(wrong, `${label}: ${m.value}`).not.toBeNull();
          expect(wrong!.equals(answer!), `${label}: miskonsepsi = kunci`).toBe(false);
        }
      }
      if (step.kind === 'equation') {
        const line = parseLinearEquation(step.answer);
        expect(line, label).not.toBeNull();
        // Kunci persamaan harus melalui semua titik yang ditampilkan di grafik soal.
        for (const p of item.graph?.points ?? []) {
          expect(isPointOnLine(pt(p.x, p.y), toLine(line!)), `${label} melalui (${p.x}, ${p.y})`).toBe(true);
        }
      }
      if (step.kind === 'choice') {
        expect(step.answer, label).toBeLessThan(step.options.length);
        for (const m of step.misconceptions) expect(m.value, label).not.toBe(String(step.answer));
      }
      if (step.kind === 'plot') {
        for (const [x, y] of step.answer) {
          expect(x >= step.graph.x[0] && x <= step.graph.x[1] && y >= step.graph.y[0] && y <= step.graph.y[1], label).toBe(true);
        }
      }
    }
  });
});

describe('soal penelitian', () => {
  it('soal posttest (research-posttest) ditolak oleh loader', () => {
    const fake = { ...getItem('BS-1')!, id: 'PT-1', group: 'research-posttest' as const };
    expect(acceptLearningItems([fake]).map((i) => i.id)).toEqual([]);
    expect([...content.items.keys()].some((id) => id.startsWith('PT-'))).toBe(false);
  });
  it('rubrik penelitian berisi 4 pretest dan 4 posttest bernilai 6', () => {
    for (const test of ['pretest', 'posttest'] as const) {
      const rows = content.rubric.filter((r) => r.test === test);
      expect(rows).toHaveLength(4);
      for (const r of rows) expect(r.stages.reduce((a, b) => a + b, 0), r.id).toBe(6);
    }
  });
});
