import * as v from 'valibot';

export const RuleSchema = v.object({
    name: v.string(),
    description: v.nullable(v.string()),
    type: v.string(),
    value: v.any(),
    repo: v.string(),
    strict: v.boolean(),
    options: v.nullable(v.array(v.string())),
    extras: v.nullable(v.array(v.string())),
    branches: v.nullable(v.array(v.string())),
    categories: v.nullable(v.array(v.string())),
    validators: v.nullable(v.array(v.string()))
})

export const RulesSchema = v.array(RuleSchema);

export type Rule = v.InferOutput<typeof RuleSchema>;
export type Rules = v.InferOutput<typeof RulesSchema>;