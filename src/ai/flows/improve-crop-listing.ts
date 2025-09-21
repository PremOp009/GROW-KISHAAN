// src/ai/flows/improve-crop-listing.ts
'use server';

/**
 * @fileOverview This file defines a Genkit flow that suggests improvements to crop listings using AI.
 *
 * The flow takes a crop listing as input and returns suggestions for improving its clarity, keywords, and market appeal.
 * It exports:
 *   - improveCropListing: The main function to call to get listing improvements.
 *   - ImproveCropListingInput: The input type for the improveCropListing function.
 *   - ImproveCropListingOutput: The output type for the improveCropListing function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ImproveCropListingInputSchema = z.object({
  title: z.string().describe('The title of the crop listing.'),
  description: z.string().describe('The description of the crop being listed.'),
  photoDataUri: z
    .string()
    .describe(
      "A photo of the crop, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'." // Corrected typo here
    ),
  address: z.string().describe('The address where the crop is located.'),
  price: z.number().describe('The price of the crop.'),
  quantity: z.string().describe('The quantity of the crop available.'),
});
export type ImproveCropListingInput = z.infer<typeof ImproveCropListingInputSchema>;

const ImproveCropListingOutputSchema = z.object({
  improvedTitle: z.string().describe('The improved title for the crop listing.'),
  improvedDescription: z.string().describe('The improved description for the crop listing.'),
  suggestedKeywords: z
    .array(z.string())
    .describe('Suggested keywords to improve the listing\s searchability.'),
  marketAppealSuggestions: z
    .string()
    .describe('Suggestions to improve the market appeal of the listing.'),
  imageHint: z.string().describe('A one or two word hint for a stock photo representing the crop. For example: "mangoes" or "fresh bread".'),
});
export type ImproveCropListingOutput = z.infer<typeof ImproveCropListingOutputSchema>;

export async function improveCropListing(
  input: ImproveCropListingInput
): Promise<ImproveCropListingOutput> {
  return improveCropListingFlow(input);
}

const prompt = ai.definePrompt({
  name: 'improveCropListingPrompt',
  input: {schema: ImproveCropListingInputSchema},
  output: {schema: ImproveCropListingOutputSchema},
  prompt: `You are an AI-powered marketing assistant for farmers.
  Your goal is to help farmers improve their crop listings to attract more customers.
  Based on the information provided, suggest improvements to the listing, including:
  - A more appealing title
  - A more detailed and engaging description
  - Relevant keywords to improve searchability
  - Suggestions to highlight the unique selling points of the crop
  - A one or two word hint for a stock photo representing the crop. For example: "mangoes" or "fresh bread".

  Here is the current crop listing:

  Title: {{{title}}}
  Description: {{{description}}}
  Photo: {{media url=photoDataUri}}
  Address: {{{address}}}
  Price: {{{price}}}
  Quantity: {{{quantity}}}

  Please provide the improved title, description, keywords, market appeal suggestions, and image hint.
  Format the keywords as a list.
`,
});

const improveCropListingFlow = ai.defineFlow(
  {
    name: 'improveCropListingFlow',
    inputSchema: ImproveCropListingInputSchema,
    outputSchema: ImproveCropListingOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
