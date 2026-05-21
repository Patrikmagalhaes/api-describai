import openrouter from "../lib/openrouter";

type GenerateAltAIParams = {
    imageUrl: string;

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
    imageUrl,
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


    const MODELS = [
        "qwen/qwen2.5-vl-72b-instruct",

        "meta-llama/llama-3.2-11b-vision-instruct",
    ];
    for (const model of MODELS) {
        try {
            const response =
                await openrouter.chat.completions.create({
                    model,

                    messages: [
                        {
                            role: "user",

                            content: [
                                {
                                    type: "text",

                                    text: prompt,
                                },

                                {
                                    type: "image_url",

                                    image_url: {
                                        url: imageUrl,
                                    },
                                },
                            ],
                        },
                    ],
                });

            const text =
                response.choices[0]?.message?.content;

            if (!text) {
                continue;
            }

            const cleanText = text
                .replace(/```json/g, "")
                .replace(/```/g, "")
                .trim();

            const parsed = JSON.parse(cleanText);

            return parsed as AIResult;
        } catch (error: any) {
            console.log("MODEL:", model);

            console.log(
                error?.response?.data ||
                error?.message ||
                error
            );
        }
    }

    throw new Error("All AI models failed");
}