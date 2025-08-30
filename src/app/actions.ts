'use server';

import { personalizedCookieRecommendations, type PersonalizedCookieRecommendationsInput } from '@/ai/flows/personalized-cookie-recommendations';

export async function getCookieRecommendations(input: PersonalizedCookieRecommendationsInput) {
  try {
    const result = await personalizedCookieRecommendations(input);
    return { success: true, recommendations: result.recommendations };
  } catch (error) {
    console.error('Error getting cookie recommendations:', error);
    return { success: false, error: 'Failed to get recommendations. Please try again.' };
  }
}
