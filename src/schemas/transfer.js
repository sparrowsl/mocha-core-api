//@ts-check
import { z } from 'zod';
import { parseNumber } from './parse-number';

export const createTransferSchema = z.object({
  from_number: z.string(),
  to_number: z.string(),
  amount: z.union([
    z.number(),
    z.string().transform((val, ctx) => {
      const parsed = parseNumber(val);
      if (parsed === null) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Invalid number format',
        });
        return z.NEVER;
      }
      return parsed;
    }),
  ]),
});
