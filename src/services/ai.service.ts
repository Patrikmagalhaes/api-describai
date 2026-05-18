import fs from "fs";

import ai from "../lib/gemini";

type GenerateAltAIParams = {
    filePath: string;

    language: string;
    tone: string;
    size: string;
};

export async function generateAltWithAI({
    filePath,
    language,
    tone,
    size,
}: GenerateAltAIParams) {




    const toneMap = {
        natural: "Use a natural and accessible tone.",

        formal: "Use a formal and professional tone.",

        seo: "Optimize the description for SEO while keeping accessibility.",

        detailed: "Provide a highly detailed visual description.",
    };

    const sizeMap = {
        short: "Keep the description very short.",

        medium: "Keep the description medium-sized.",

        long: "Provide a longer and more descriptive ALT text.",
    };

    const prompt = `
Generate an ALT description for accessibility purposes.

Language: ${language}

${toneMap[tone as keyof typeof toneMap]}

${sizeMap[size as keyof typeof sizeMap]}

Describe only visible elements.
Avoid assumptions.
`;

    const imageBuffer = fs.readFileSync(filePath);

    const base64Image =
        imageBuffer.toString("base64");

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",

        contents: [
            {
                role: "user",

                parts: [
                    {
                        text: prompt,
                    },

                    {
                        inlineData: {
                            mimeType: "image/png",
                            data: base64Image,
                        },
                    },
                ],
            },
        ],
    });
    fs.unlinkSync(filePath);
    return response.text;
}