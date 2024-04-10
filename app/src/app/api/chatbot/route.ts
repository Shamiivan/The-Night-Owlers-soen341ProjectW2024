import type { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
const { GoogleGenerativeAI } = require("@google/generative-ai");
import { HarmBlockThreshold, HarmCategory } from "@google/generative-ai"

const key = process.env.GOOGLE_API_KEY;


export async function GET() {
    const data = "";
    return NextResponse.json({ success: true, value: data });
}
export async function POST(request : Request) {
    const data =  await request.json();
    const message = data.message;
    const res = await generateResponse(message);
    const answer = res.content;
    console.log(answer);
    return NextResponse.json({ success: true, value: answer});
}
    



async function generateResponse(message:string) {
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
        ["human", message],
    ]);

    return res
}
