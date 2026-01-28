import { HairstyleSuggestion } from "../types";

export const getHairstyleRecommendations = async (
  description: string,
  base64Image?: string
): Promise<HairstyleSuggestion[]> => {
  try {
    const response = await fetch('/api/analyze', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ description, base64Image }),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch recommendations');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Gemini Service Error:", error);
    return [];
  }
};
