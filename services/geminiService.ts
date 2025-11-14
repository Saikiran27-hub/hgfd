
import { GoogleGenAI, Type } from "@google/genai";
import type { PestAnalysisResult } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

const fileToGenerativePart = (file: File) => {
  return new Promise<{ inlineData: { data: string; mimeType: string } }>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64Data = (reader.result as string).split(',')[1];
      resolve({
        inlineData: {
          data: base64Data,
          mimeType: file.type,
        },
      });
    };
    reader.onerror = (error) => {
      reject(error);
    };
  });
};

export const analyzeCropImage = async (imageFile: File): Promise<PestAnalysisResult> => {
  try {
    const imagePart = await fileToGenerativePart(imageFile);
    
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: [
            {
                parts: [
                    imagePart,
                    { text: 'Analyze this image of a crop. Identify any pests or diseases. Provide a detailed analysis.' }
                ]
            }
        ],
        config: {
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.OBJECT,
                properties: {
                    pestOrDiseaseName: {
                        type: Type.STRING,
                        description: "The common name of the detected pest or disease.",
                    },
                    chemicalTreatment: {
                        type: Type.ARRAY,
                        items: { type: Type.STRING },
                        description: "A list of recommended chemical treatments.",
                    },
                    organicTreatment: {
                        type: Type.ARRAY,
                        items: { type: Type.STRING },
                        description: "A list of recommended organic or natural treatments.",
                    },
                    prevention: {
                        type: Type.ARRAY,
                        items: { type: Type.STRING },
                        description: "A list of measures to prevent future occurrences.",
                    },
                    urgencyLevel: {
                        type: Type.STRING,
                        description: "The level of urgency for treatment (Low, Medium, High, Critical).",
                    },
                },
                required: ["pestOrDiseaseName", "chemicalTreatment", "organicTreatment", "prevention", "urgencyLevel"],
            },
        },
    });

    const jsonString = response.text.trim();
    const result = JSON.parse(jsonString);
    return result as PestAnalysisResult;

  } catch (error) {
    console.error("Error analyzing crop image:", error);
    throw new Error("Failed to analyze image with Gemini API.");
  }
};
