import type { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
const { GoogleGenerativeAI } = require("@google/generative-ai");
import { HarmBlockThreshold, HarmCategory } from "@google/generative-ai"

const key = process.env.GOOGLE_API_KEY;


export async function GET() {
    const data = await main();
    return NextResponse.json({ success: true, value: data });
}



async function main() {
    const model = new ChatGoogleGenerativeAI({
        model: "gemini-pro",
        maxOutputTokens: 2048,
        safetySettings: [
            {
                category: HarmCategory.HARM_CATEGORY_HARASSMENT,
                threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
            },
        ],
    });

    // Batch and stream are also supported
    const res = await model.invoke([
        ["human", "write about cars"],
    ]);

    return res
}
