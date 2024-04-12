import type { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

import { ChatPromptTemplate } from "@langchain/core/prompts";
import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
const { GoogleGenerativeAI } = require("@google/generative-ai");
import { HarmBlockThreshold, HarmCategory } from "@google/generative-ai"
import { StringOutputParser } from "@langchain/core/output_parsers";

const key = process.env.GOOGLE_API_KEY;


export async function GET() {
    const data = "";
    return NextResponse.json({ success: true, value: data });
}
export async function POST(request: Request) {
    const data = await request.json();
    const message = data.message;
    const res = await generateResponse(message);
    const answer = res.content;
    console.log(answer);
    return NextResponse.json({ success: true, value: answer });
}




async function generateResponse(message: string) {
    const model = new ChatGoogleGenerativeAI({
        model: "gemini-pro",
        maxOutputTokens: 2048,
    });

    // not included as of now
    const outputParser = new StringOutputParser();

    const prompt = ChatPromptTemplate.fromMessages(
        [
            ["system", "You are Tom, a customer representative chatbot for Omni rental"],
            ["user", "{input}"],
        ]
    )

    const chain = prompt.pipe(model);
    const res = await chain.invoke({
        input: message,
    })

    return res
}
