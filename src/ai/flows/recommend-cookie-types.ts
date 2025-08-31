import { z } from 'zod';

export const RecommendationInputSchema = z.object({
  baseFlavor: z.string().describe("The desired base flavor profile (e.g., 'Manis', 'Gurih', 'Kombinasi')."),
  texture: z.string().describe("The desired texture (e.g., 'Renyah', 'Lembut', 'Lumer')."),
  specialIngredient: z.string().describe("The preferred special ingredient (e.g., 'Keju', 'Cokelat', 'Kacang', 'Buah').")
});
export type RecommendationInput = z.infer<typeof RecommendationInputSchema>;

export const RecommendationOutputSchema = z.object({
  name: z.string().describe('The name of the recommended cookie. Must be one of the available products.'),
  reason: z.string().describe('A brief, friendly, and persuasive reason (in Indonesian) why this cookie is recommended for the user based on their preference.'),
});
export type RecommendationOutput = z.infer<typeof RecommendationOutputSchema>;
