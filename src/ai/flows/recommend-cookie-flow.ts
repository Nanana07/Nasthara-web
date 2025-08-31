'use server';
/**
 * @fileOverview A cookie recommendation AI agent.
 *
 * - recommendCookie - A function that handles the cookie recommendation process.
 */
import { ai } from '@/ai/genkit';
import { RecommendationInputSchema, RecommendationOutputSchema, type RecommendationInput } from '@/ai/flows/recommend-cookie-types';

const products = [
    { name: 'Nastar', description: 'Manis, lumer di mulut, dengan isian selai nanas premium. Klasik dan selalu jadi favorit.' },
    { name: 'Palm Cheese', description: 'Perpaduan unik rasa gurih dari keju edam dan manis dari gula palem. Renyah di luar, lembut di dalam.' },
    { name: 'Lidah Kucing', description: 'Kue tipis, renyah, dan ringan dengan rasa manis vanila yang lembut. Sempurna untuk teman minum teh.' },
    { name: 'Kastengel Premium', description: 'Sangat kaya rasa keju karena menggunakan keju edam dan parmesan. Gurih, renyah, dan bikin nagih.' },
    { name: 'Choco Mede', description: 'Kombinasi klasik cokelat premium dan kacang mede renyah. Manisnya pas, tidak berlebihan.' },
    { name: 'Bawang Gunting', description: 'Camilan gurih dan renyah dengan aroma bawang yang khas. Cocok untuk yang tidak terlalu suka manis.' },
];

export async function recommendCookie(input: RecommendationInput) {
    const productList = products.map(p => `- ${p.name}: ${p.description}`).join('\n');

    const prompt = `You are a friendly and expert bakery assistant for "Nasthara". Your goal is to recommend the perfect cookie to a customer based on their preferences for flavor, texture, and special ingredients.

    Here are the available cookies:
    ${productList}

    The customer has created a "magic recipe" with these characteristics:
    - Base Flavor: "${input.baseFlavor}"
    - Texture: "${input.texture}"
    - Special Ingredient: "${input.specialIngredient}"

    Based on this combination, choose the ONE most suitable cookie from the list. Provide a short, friendly, and persuasive reason for your recommendation in Indonesian. Frame the reason as if you've just magically concocted this cookie for them. Your response must be in a valid JSON format.`;

    const { output } = await ai.generate({
        prompt,
        output: {
            schema: RecommendationOutputSchema,
        }
    });
    
    return output!;
}
