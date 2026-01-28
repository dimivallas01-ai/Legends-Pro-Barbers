
import { GoogleGenAI, Type } from "@google/genai";

export const config = {
    runtime: 'edge',
};

const apiKey = process.env.GEMINI_API_KEY;

export default async function handler(request: Request) {
    if (!apiKey) {
        return new Response(JSON.stringify({ error: "API key not configured" }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    if (request.method !== 'POST') {
        return new Response(JSON.stringify({ error: "Method not allowed" }), {
            status: 405,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    try {
        const { description, base64Image } = await request.json();

        const ai = new GoogleGenAI({ apiKey });
        const model = "gemini-1.5-flash";

        const systemInstruction = `
      You are a world-class master barber and style consultant at "Legends Barber".
      Your goal is to suggest 3 legendary hairstyles based on the user's description and optional photo.
      Focus on masculinity, modern trends, and face shape compatibility.
      Provide the output in a clean JSON array of objects.
    `;

        const prompt = `
      Analyze this request: "${description}".
      ${base64Image ? "Also analyze the attached photo for face shape and hair texture." : ""}
      Recommend 3 hairstyles. 
      Return a JSON array with properties: name, description, maintenanceLevel, suitableFaceShapes.
    `;

        const contents = base64Image
            ? {
                parts: [
                    { text: prompt },
                    { inlineData: { mimeType: 'image/jpeg', data: base64Image } }
                ]
            }
            : prompt;

        const response = await ai.models.generateContent({
            model,
            contents,
            config: {
                systemInstruction,
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.ARRAY,
                    items: {
                        type: Type.OBJECT,
                        properties: {
                            name: { type: Type.STRING },
                            description: { type: Type.STRING },
                            maintenanceLevel: { type: Type.STRING },
                            suitableFaceShapes: {
                                type: Type.ARRAY,
                                items: { type: Type.STRING }
                            }
                        },
                        required: ["name", "description", "maintenanceLevel", "suitableFaceShapes"]
                    }
                }
            }
        });

        const text = response.text();
        return new Response(text, {
            headers: { 'Content-Type': 'application/json' }
        });

    } catch (error) {
        console.error("Gemini API Error:", error);
        return new Response(JSON.stringify({ error: "Failed to generate recommendations" }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
