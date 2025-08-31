import { z } from 'zod';

export const GiftAssistantInputSchema = z.object({
  description: z.string().describe("A description of the occasion and the recipient to help recommend a cookie gift."),
});
export type GiftAssistantInput = z.infer<typeof GiftAssistantInputSchema>;

export const GiftAssistantOutputSchema = z.object({
  name: z.string().describe('The name of the recommended cookie. Must be one of the available products.'),
  reason: z.string().describe('A brief, friendly, and persuasive reason (in Indonesian) why this cookie is recommended as a gift based on the user\'s description.'),
});
export type GiftAssistantOutput = z.infer<typeof GiftAssistantOutputSchema>;
