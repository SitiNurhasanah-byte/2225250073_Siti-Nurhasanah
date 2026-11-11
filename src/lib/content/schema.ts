import { z } from 'zod';

/** Angka/pecahan dalam bentuk teks agar tetap eksak, mis. "2", "-1/2", "5000". */
const numText = z.string().min(1);

export const graphLineSchema = z.object({
  m: numText,
  c: numText,
  label: z.string().optional(),
  dashed: z.boolean().optional(),
});

export const graphSchema = z.object({
  x: z.tuple([z.number(), z.number()]),
  y: z.tuple([z.number(), z.number()]),
  xStep: z.number().positive().default(1),
  yStep: z.number().positive().default(1),
  points: z
    .array(z.object({ x: z.number(), y: z.number(), label: z.string().optional() }))
    .default([]),
  lines: z.array(graphLineSchema).default([]),
  triangle: z.object({ x0: z.number(), dx: z.number() }).optional(),
});

const misconceptionRef = z.object({
  value: z.string(),
  code: z.string().regex(/^M-[A-Z]+-\d{2}$/),
});

const stepBase = {
  stage: z.number().int().positive(),
  score: z.number().min(0),
  label: z.string(),
  prompt: z.string(),
  why: z.string(),
  selfExplain: z.boolean().optional(),
  misconceptions: z.array(misconceptionRef).default([]),
};

export const stepSchema = z.discriminatedUnion('kind', [
  z.object({ ...stepBase, kind: z.literal('number'), answer: numText, prefix: z.string().optional(), suffix: z.string().optional() }),
  z.object({ ...stepBase, kind: z.literal('equation'), answer: z.string() }),
  z.object({ ...stepBase, kind: z.literal('choice'), options: z.array(z.string()).min(2), answer: z.number().int().min(0) }),
  z.object({
    ...stepBase,
    kind: z.literal('plot'),
    answer: z.array(z.tuple([z.number(), z.number()])).min(1),
    graph: graphSchema,
  }),
]);

export const itemSchema = z.object({
  id: z.string(),
  group: z.enum(['learning', 'research-posttest']),
  title: z.string(),
  indicator: z.enum(['reason', 'formulate', 'employ', 'interpret']),
  objectives: z.array(z.string()),
  draft: z.boolean().default(false),
  context: z.string(),
  given: z.array(z.string()),
  asked: z.array(z.string()),
  graph: graphSchema.optional(),
  steps: z.array(stepSchema).min(1),
  hints: z.array(z.string()).length(3),
  explanation: z.string(),
  sameConceptAs: z.array(z.string()).default([]),
  sameConceptNote: z.string().optional(),
});

export const cardSchema = z.object({
  title: z.string(),
  body: z.string(),
  graph: graphSchema.optional(),
});

const itemRef = z.object({
  itemId: z.string(),
  stages: z.array(z.number().int().positive()).optional(),
  prefill: z.number().int().min(0).default(0),
});

export const moduleSchema = z.object({
  id: z.string().regex(/^M\d$/),
  order: z.number().int(),
  title: z.string(),
  summary: z.string(),
  objectives: z.array(z.string()),
  cards: z.array(cardSchema).min(1),
  example: itemRef,
  practice: z.array(itemRef).min(1),
  recap: z.array(z.string()).max(3),
});

export const glossarySchema = z.record(z.string(), z.string());

export const misconceptionCatalogSchema = z.record(
  z.string(),
  z.object({ title: z.string(), message: z.string() }),
);

export const rubricSchema = z.array(
  z.object({
    id: z.string(),
    test: z.enum(['pretest', 'posttest']),
    title: z.string(),
    indicator: z.enum(['reason', 'formulate', 'employ', 'interpret']),
    stages: z.array(z.number().positive()),
  }),
);

export type Graph = z.infer<typeof graphSchema>;
export type GraphLine = z.infer<typeof graphLineSchema>;
export type Step = z.infer<typeof stepSchema>;
export type Item = z.infer<typeof itemSchema>;
export type Card = z.infer<typeof cardSchema>;
export type Module = z.infer<typeof moduleSchema>;
export type ItemRef = z.infer<typeof itemRef>;
export type Rubric = z.infer<typeof rubricSchema>;
export type Indicator = Item['indicator'];

export const indicatorLabel: Record<Indicator, string> = {
  reason: 'Mathematical Reasoning',
  formulate: 'Formulating Situations Mathematically',
  employ: 'Employing Concepts, Facts, and Procedures',
  interpret: 'Interpreting, Applying, and Evaluating Outcomes',
};
