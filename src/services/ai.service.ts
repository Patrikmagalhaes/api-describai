import ai from "../lib/gemini";

type GenerateAltAIParams = {
    buffer: Buffer

    mimeType: string;

    language: string;
    tone: string;
    size: string;
};

export type AIResult = {
    altText: string;

    caption: string;

    seoDescription: string;

    html: string;

    keywords: string[];
};

export async function generateAltWithAI({
    buffer,
    mimeType,
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
Generate image accessibility and SEO metadata.

Language: ${language}

${toneMap[tone as keyof typeof toneMap]}

${sizeMap[size as keyof typeof sizeMap]}

Return ONLY valid JSON.

Format:
{
  "altText": "",
  "caption": "",
  "seoDescription": "",
  "keywords": [],
  "html": ""
}

Rules:
- altText must focus on accessibility
- caption should be natural and engaging
- seoDescription should be optimized for search engines
- keywords must be short and relevant
- html must contain a valid img tag
- Do not use markdown
- Do not wrap in backticks
- Return only raw JSON
`;



    const base64Image =
        buffer.toString("base64");
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
                            mimeType,
                            data: base64Image,
                        },
                    },
                ],
            },
        ],
    });

    const text = response.text;

    if (!text) {
        throw new Error("Empty AI response");
    }

    const cleanText = text
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

    const parsed = JSON.parse(cleanText);

    return parsed as AIResult;
}