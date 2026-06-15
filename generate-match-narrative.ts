'use server';
/**
 * @fileOverview A Genkit flow for generating exciting match descriptions and rivalry previews for Free Fire tournaments.
 *
 * - generateMatchNarrative - A function that handles the generation process.
 * - GenerateMatchNarrativeInput - The input type for the generateMatchNarrative function.
 * - GenerateMatchNarrativeOutput - The return type for the generateMatchNarrative function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateMatchNarrativeInputSchema = z.object({
  teamA: z.string().describe('The name of the first team.'),
  teamB: z.string().describe('The name of the second team.'),
  teamAStats: z
    .string()
    .describe('Key statistics or a brief description of Team A, e.g., win/loss record, star players, recent performance.'),
  teamBStats: z
    .string()
    .describe('Key statistics or a brief description of Team B, e.g., win/loss record, star players, recent performance.'),
  tournamentName: z.string().describe('The name of the tournament.'),
  matchDate: z.string().describe('The date of the upcoming match.'),
  context: z
    .string()
    .optional()
    .describe('Any additional context about the match, potential rivalries, or narratives.'),
});
export type GenerateMatchNarrativeInput = z.infer<typeof GenerateMatchNarrativeInputSchema>;

const GenerateMatchNarrativeOutputSchema = z.object({
  matchDescription: z
    .string()
    .describe('A hype-filled and engaging description of the upcoming match.'),
  rivalryPreview: z
    .string()
    .describe('A compelling preview highlighting the rivalry between the two teams, if applicable, otherwise a general preview.'),
});
export type GenerateMatchNarrativeOutput = z.infer<typeof GenerateMatchNarrativeOutputSchema>;

export async function generateMatchNarrative(
  input: GenerateMatchNarrativeInput
): Promise<GenerateMatchNarrativeOutput> {
  return generateMatchNarrativeFlow(input);
}

const narrativePrompt = ai.definePrompt({
  name: 'generateMatchNarrativePrompt',
  input: {schema: GenerateMatchNarrativeInputSchema},
  output: {schema: GenerateMatchNarrativeOutputSchema},
  prompt: `You are an expert Free Fire esports commentator and analyst. Your goal is to generate exciting, hype-filled narratives for upcoming matches.

Use the following information to create a captivating match description and a rivalry preview. Ensure the tone is energetic, engaging, and builds anticipation.

Tournament: {{{tournamentName}}}
Match Date: {{{matchDate}}}

Team A: {{{teamA}}}
Team A Stats/Info: {{{teamAStats}}}

Team B: {{{teamB}}}
Team B Stats/Info: {{{teamBStats}}}

Additional Context: {{{context}}}

---

Now, generate the match narrative. Remember to be exciting and use vivid language.

Match Description:

Rivalry Preview:`,
});

const generateMatchNarrativeFlow = ai.defineFlow(
  {
    name: 'generateMatchNarrativeFlow',
    inputSchema: GenerateMatchNarrativeInputSchema,
    outputSchema: GenerateMatchNarrativeOutputSchema,
  },
  async input => {
    const {output} = await narrativePrompt(input);
    return output!;
  }
);
