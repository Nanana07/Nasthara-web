'use server';
/**
 * @fileOverview A cookie gift recommendation AI agent.
 *
 * - recommendGift - A function that handles the cookie gift recommendation process.
 */
import { ai } from '@/ai/genkit';
import { GiftAssistantInputSchema, GiftAssistantOutputSchema, type GiftAssistantInput } from '@/ai/flows/gift-assistant-types';

const products = [
    { name: 'Nastar', description: 'Manis, lumer di mulut, dengan isian selai nanas premium. Klasik dan selalu jadi favorit, cocok untuk hadiah bagi orang tua atau acara formal.' },
    { name: 'Palm Cheese', description: 'Perpaduan unik rasa gurih dari keju edam dan manis dari gula palem. Pilihan menarik untuk teman yang suka kejutan rasa.' },
    { name: 'Lidah Kucing', description: 'Kue tipis, renyah, dan ringan dengan rasa manis vanila yang lembut. Hadiah yang aman dan disukai hampir semua orang, terutama anak-anak.' },
    { name: 'Kastengel Premium', description: 'Sangat kaya rasa keju karena menggunakan keju edam dan parmesan. Hadiah mewah untuk para pencinta keju sejati.' },
    { name: 'Choco Mede', description: 'Kombinasi klasik cokelat premium dan kacang mede renyah. Hadiah yang pas untuk teman sebaya atau pasangan.' },
    { name: 'Bawang Gunting', description: 'Camilan gurih dan renyah dengan aroma bawang yang khas. Pilihan tepat untuk hadiah bagi yang tidak terlalu suka manis atau sebagai teman nonton.' },
];

export const recommendGiftFlow = ai.defineFlow(
  {
    name: 'recommendGiftFlow',
    inputSchema: GiftAssistantInputSchema,
    outputSchema: GiftAssistantOutputSchema,
  },
  async (input: GiftAssistantInput) => {
    const productList = products.map(p => `- ${p.name}: ${p.description}`).join('\n');

    const prompt = `You are "Asisten Kado Nasthara", a friendly and thoughtful gift expert for a bakery. Your task is to recommend the perfect cookie gift based on the customer's description.

    Here are the available cookies:
    ${productList}

    The customer is looking for a gift with this description:
    "${input.description}"

    Based on the customer's description, choose the ONE most suitable cookie from the list. Provide a short, friendly, and persuasive reason for your recommendation in Indonesian. Explain why it's the perfect gift for the occasion and recipient described. Your response must be in a valid JSON format.`;

    const { output } = await ai.generate({
        prompt,
        output: {
            schema: GiftAssistantOutputSchema,
        }
    });
    
    return output!;
  }
);
