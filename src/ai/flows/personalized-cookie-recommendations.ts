// This file uses server-side code.
'use server';

/**
 * @fileOverview Provides personalized cookie recommendations based on user order history.
 *
 * - personalizedCookieRecommendations - A function that generates personalized cookie recommendations.
 * - PersonalizedCookieRecommendationsInput - The input type for the personalizedCookieRecommendations function.
 * - PersonalizedCookieRecommendationsOutput - The return type for the personalizedCookieRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedCookieRecommendationsInputSchema = z.object({
  orderHistory: z
    .string()
    .describe(
      'The customer order history as a string.  Include each cookie ordered, and the quantity ordered, separated by commas.'
    ),
});
export type PersonalizedCookieRecommendationsInput = z.infer<
  typeof PersonalizedCookieRecommendationsInputSchema
>;

const PersonalizedCookieRecommendationsOutputSchema = z.object({
  recommendations: z
    .string()
    .describe(
      'A list of personalized cookie recommendations based on the order history.'
    ),
});
export type PersonalizedCookieRecommendationsOutput = z.infer<
  typeof PersonalizedCookieRecommendationsOutputSchema
>;

export async function personalizedCookieRecommendations(
  input: PersonalizedCookieRecommendationsInput
): Promise<PersonalizedCookieRecommendationsOutput> {
  return personalizedCookieRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedCookieRecommendationsPrompt',
  input: {schema: PersonalizedCookieRecommendationsInputSchema},
  output: {schema: PersonalizedCookieRecommendationsOutputSchema},
  prompt: `You are a cookie recommendation expert. Based on the customer's order history, recommend other cookies they might enjoy.

Order History: {{{orderHistory}}}

Recommendations:`,
});

const personalizedCookieRecommendationsFlow = ai.defineFlow(
  {
    name: 'personalizedCookieRecommendationsFlow',
    inputSchema: PersonalizedCookieRecommendationsInputSchema,
    outputSchema: PersonalizedCookieRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
