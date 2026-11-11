import type { Graph } from '../lib/content/schema';
import { parseNumber } from '../lib/math/parse';
import type { PlaneLine } from './CartesianPlane';

const toNum = (text: string) => parseNumber(text)?.toNumber() ?? 0;

/** Mengubah spesifikasi grafik dari konten menjadi props CartesianPlane. */
export function graphToPlane(graph: Graph, { showLines = true }: { showLines?: boolean } = {}) {
  const lines: PlaneLine[] = showLines
    ? graph.lines.map((l) => ({ m: toNum(l.m), c: toNum(l.c), label: l.label, dashed: l.dashed }))
    : [];
  const first = graph.lines[0];
  const triangle =
    showLines && graph.triangle && first
      ? { x0: graph.triangle.x0, dx: graph.triangle.dx, m: toNum(first.m), c: toNum(first.c) }
      : undefined;
  return {
    x: graph.x,
    y: graph.y,
    xStep: graph.xStep,
    yStep: graph.yStep,
    lines,
    points: graph.points.map((p) => ({ ...p })),
    triangle,
  };
}

/** Deskripsi teks alternatif grafik untuk pembaca layar. */
export function describeGraph(graph: Graph): string {
  const parts: string[] = ['Bidang Cartesius'];
  if (graph.lines.length) parts.push(`dengan ${graph.lines.length} garis`);
  if (graph.points.length) {
    parts.push(`titik ${graph.points.map((p) => `(${p.x}, ${p.y})`).join(', ')}`);
  }
  return parts.join(', ');
}
