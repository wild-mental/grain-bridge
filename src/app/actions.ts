'use server';

import { smartMatchRecommendations, type SmartMatchRecommendationsInput } from "@/ai/flows/smart-match-recommendations";

export async function getSmartMatchRecommendation(input: SmartMatchRecommendationsInput) {
  try {
    // Add a delay to simulate network latency and show the loading state
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const result = await smartMatchRecommendations(input);
    return { success: true, data: result };
  } catch (error) {
    console.error("Error in smart match recommendation flow:", error);
    const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred.";
    return { success: false, error: `Failed to get recommendation: ${errorMessage}` };
  }
}
