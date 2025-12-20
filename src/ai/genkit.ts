import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/google-genai';

export const ai = genkit({
  plugins: [googleAI({apiKey: "AIzaSyDwk9Ag0n_H6AgfD5ffk6t8UvUv098Tfjg"})],
  model: 'googleai/gemini-pro',
});
