import { GoogleGenAI } from "@google/genai";

// This code runs on a server, where process.env.API_KEY is securely available.
const API_KEY = process.env.API_KEY;
if (!API_KEY) {
  throw new Error("API_KEY environment variable not set.");
}
const ai = new GoogleGenAI({ apiKey: API_KEY });

// This function handles incoming requests to /api/generate
export default async function handler(request: Request) {
  if (request.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 });
  }

  try {
    const { prompt } = await request.json();

    if (!prompt) {
      return new Response(JSON.stringify({ error: "Prompt is required." }), { 
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const fullPrompt = `YouTube thumbnail for a video about: "${prompt}". Make it extremely eye-catching, high resolution, and follow modern design trends. Aspect ratio 16:9.`;

    const response = await ai.models.generateImages({
      model: 'imagen-3.0-generate-002',
      prompt: fullPrompt,
      config: {
        numberOfImages: 1,
        outputMimeType: 'image/png',
        aspectRatio: '16:9',
      },
    });

    if (!response.generatedImages || response.generatedImages.length === 0) {
      throw new Error("The AI did not return an image.");
    }

    const base64ImageBytes: string = response.generatedImages[0].image.imageBytes;
    if (!base64ImageBytes) {
        throw new Error("The generated image data is empty.");
    }

    const imageUrl = `data:image/png;base64,${base64ImageBytes}`;
    
    return new Response(JSON.stringify({ imageUrl }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error("Error in /api/generate:", error);
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
    return new Response(JSON.stringify({ error: errorMessage }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
  }
}
