'use server';
import { nextHandler } from '@genkit-ai/next';
import '@/ai/flows/recommend-cookie-flow';
import '@/ai/flows/story-generator-flow';
import '@/ai/flows/gift-assistant-flow';

export const POST = nextHandler();
