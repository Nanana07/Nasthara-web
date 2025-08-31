import { z } from 'zod';

export const StoryInputSchema = z.object({
  name: z.string().describe("The name of the cookie."),
  description: z.string().describe("The description or a creative clue about the cookie.")
});
export type StoryInput = z.infer<typeof StoryInputSchema>;

export const StoryOutputSchema = z.object({
  story: z.string().describe('A short, whimsical, and heartwarming fairy tale about the cookie, written in Indonesian.'),
});
export type StoryOutput = z.infer<typeof StoryOutputSchema>;
