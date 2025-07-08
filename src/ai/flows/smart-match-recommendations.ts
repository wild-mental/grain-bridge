'use server';
/**
 * @fileOverview This file defines a Genkit flow for generating smart match recommendations
 * between surplus and shortage regions, considering various factors.
 *
 * - smartMatchRecommendations - A function that returns recommendations for matching surplus and shortage regions.
 * - SmartMatchRecommendationsInput - The input type for the smartMatchRecommendations function.
 * - SmartMatchRecommendationsOutput - The return type for the smartMatchRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SmartMatchRecommendationsInputSchema = z.object({
  surplusRegion: z.string().describe('The region with surplus grain.'),
  shortageRegion: z.string().describe('The region with shortage of grain.'),
  commodity: z.string().describe('The type of grain to be matched (rice, wheat, maize).'),
  surplusTonnage: z.number().describe('The amount of surplus grain in tonnes.'),
  shortageTonnage: z.number().describe('The amount of grain shortage in tonnes.'),
});
export type SmartMatchRecommendationsInput = z.infer<typeof SmartMatchRecommendationsInputSchema>;

const SmartMatchRecommendationsOutputSchema = z.object({
  recommendation: z.string().describe('The recommendation for matching the surplus and shortage regions, considering distance, tonnage, cost, and geopolitical situations.'),
  costEstimate: z.string().describe('The estimated cost for logistics and other expenses in USD.'),
  feasibilityScore: z.number().describe('A score indicating the feasibility of the match, from 0 to 1.'),
});
export type SmartMatchRecommendationsOutput = z.infer<typeof SmartMatchRecommendationsOutputSchema>;

export async function smartMatchRecommendations(input: SmartMatchRecommendationsInput): Promise<SmartMatchRecommendationsOutput> {
  return smartMatchRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'smartMatchRecommendationsPrompt',
  input: {schema: SmartMatchRecommendationsInputSchema},
  output: {schema: SmartMatchRecommendationsOutputSchema},
  prompt: `You are an AI assistant specialized in providing recommendations for matching regions with surplus grain to regions with grain shortages.

  Given the following information, provide a recommendation, an estimated cost in USD, and a feasibility score (0 to 1) for matching the surplus and shortage regions.

  Surplus Region: {{{surplusRegion}}}
  Shortage Region: {{{shortageRegion}}}
  Commodity: {{{commodity}}}
  Surplus Tonnage: {{{surplusTonnage}}}
  Shortage Tonnage: {{{shortageTonnage}}}

  Consider factors such as distance, transportation costs, geopolitical situations, and any other relevant information to provide the best possible match recommendation. The feasibility score should reflect the likelihood of successful transfer and the recommendation should be optimized.
  The cost estimate should include freight, handling, and a 5% platform reserve.
`,
});

const smartMatchRecommendationsFlow = ai.defineFlow(
  {
    name: 'smartMatchRecommendationsFlow',
    inputSchema: SmartMatchRecommendationsInputSchema,
    outputSchema: SmartMatchRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
