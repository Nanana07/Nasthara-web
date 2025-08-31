'use server';
/**
 * @fileOverview A cookie story generator AI agent.
 *
 * - generateCookieStory - A function that handles the cookie story generation process.
 */
import { ai } from '@/ai/genkit';
import { StoryInputSchema, StoryOutputSchema, type StoryInput } from '@/ai/flows/story-generator-types';

const generateCookieStoryFlow = ai.defineFlow(
  {
    name: 'generateCookieStoryFlow',
    inputSchema: StoryInputSchema,
    outputSchema: StoryOutputSchema,
  },
  async (input: StoryInput) => {
    const prompt = `You are a magical storyteller for a home bakery called "Nasthara". Your task is to write a very short, whimsical, and heartwarming fairy tale (dongeng) in Indonesian about a specific cookie.

The cookie to write about is:
- Name: "${input.name}"
- Clue/Description: "${input.description}"

The story should be:
- Magical and imaginative.
- Suitable for all ages.
- Brief, just 2-3 short paragraphs.
- Written in a warm, friendly, and slightly poetic tone.
- Make the cookie the hero or the central magical element of the story.
- Your response must be in a valid JSON format.`;

    const { output } = await ai.generate({
        prompt,
        output: {
            schema: StoryOutputSchema,
        }
    });
    
    return output!;
  }
);

export async function generateCookieStory(input: StoryInput) {
    return await generateCookieStoryFlow(input);
}
