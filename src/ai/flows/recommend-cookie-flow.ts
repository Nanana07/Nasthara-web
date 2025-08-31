'use server';
/**
 * @fileOverview A cookie recommendation AI agent.
 *
 * - recommendCookie - A function that handles the cookie recommendation process.
 */
import { ai } from '@/ai/genkit';
import { z } from 'zod';

const products = [
    { name: 'Nastar', description: 'Manis, lumer di mulut, dengan isian selai nanas premium. Klasik dan selalu jadi favorit.' },
    { name: 'Palm Cheese', description: 'Perpaduan unik rasa gurih dari keju edam dan manis dari gula palem. Renyah di luar, lembut di dalam.' },
    { name: 'Lidah Kucing', description: 'Kue tipis, renyah, dan ringan dengan rasa manis vanila yang lembut. Sempurna untuk teman minum teh.' },
    { name: 'Kastengel Premium', description: 'Sangat kaya rasa keju karena menggunakan keju edam dan parmesan. Gurih, renyah, dan bikin nagih.' },
    { name: 'Choco Mede', description: 'Kombinasi klasik cokelat premium dan kacang mede renyah. Manisnya pas, tidak berlebihan.' },
    { name: 'Bawang Gunting', description: 'Camilan gurih dan renyah dengan aroma bawang yang khas. Cocok untuk yang tidak terlalu suka manis.' },
];

const RecommendationInputSchema = z.string();

const RecommendationOutputSchema = z.object({
  name: z.string().describe('The name of the recommended cookie. Must be one of the available products.'),
  reason: z.string().describe('A brief, friendly, and persuasive reason (in Indonesian) why this cookie is recommended for the user based on their preference.'),
});

export async function recommendCookie(preference: string): Promise<z.infer<typeof RecommendationOutputSchema>> {
    const productList = products.map(p => `- ${p.name}: ${p.description}`).join('\n');

    const prompt = `You are a friendly and expert bakery assistant for "Nasthara". Your goal is to recommend the perfect cookie to a customer based on their preferences.

    Here are the available cookies:
    ${productList}

    Customer's preference: "${preference}"

    Based on the customer's preference, choose the ONE most suitable cookie from the list. Provide a short, friendly, and persuasive reason for your recommendation in Indonesian. Your response must be in a valid JSON format.`;

    const { output } = await ai.generate({
        prompt,
        output: {
            schema: RecommendationOutputSchema,
        }
    });
    
    return output!;
}
