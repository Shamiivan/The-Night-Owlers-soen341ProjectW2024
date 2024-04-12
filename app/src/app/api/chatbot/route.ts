import type { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { ChatPromptTemplate, PromptTemplate, PipelinePromptTemplate } from "@langchain/core/prompts";
import { ChatGoogleGenerativeAI, GoogleGenerativeAIEmbeddings } from '@langchain/google-genai';
const { GoogleGenerativeAI } = require("@google/generative-ai");
import { HarmBlockThreshold, HarmCategory } from "@google/generative-ai"
import { StringOutputParser } from "@langchain/core/output_parsers";
import { CheerioWebBaseLoader } from "langchain/document_loaders/web/cheerio";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
import { createRetrievalChain } from "langchain/chains/retrieval";
import { HumanMessage, AIMessage } from "@langchain/core/messages";
import { createHistoryAwareRetriever } from "langchain/chains/history_aware_retriever";
import { MessagesPlaceholder } from "@langchain/core/prompts";
import { Document } from "@langchain/core/documents";
import { createRetrieverTool } from "langchain/tools/retriever";
import { split } from "postcss/lib/list";
import { TaskType } from "@google/generative-ai";
interface StructuredData {
    question: string;
    answer: string;
}
const key = process.env.GOOGLE_API_KEY;
// Function to parse the string and transform it into a structured format
function transformStringToStructuredOutput(rawString: string) : StructuredData[]{
    // Split the string into lines
    const lines:string[] = rawString.split('\n');

    // Initialize an array to hold the structured data
    const structuredData : StructuredData[]= [];

    // Iterate over the lines
    for (let i = 0; i < lines.length; i += 3) {
        // Extract the question and answer from the current and next lines
        const question = lines[i].replace(/\*\*/g, '').trim(); // Remove '**' and trim whitespace
        const answer = lines[i + 1].replace(/> /g, '').trim(); // Remove '> ' and trim whitespace

        // Add the question and answer to the structured data array
        structuredData.push({ question, answer });
    }

    // Return the structured data
    return structuredData;
}

export async function GET() {
    const data = "";
    return NextResponse.json({ success: true, value: data });
}
export async function POST(request: Request) {
    const data = await request.json();
    const userQuery = data.query;
    const res = await generateResponse(userQuery);
    const answer = res;
    // chatHistory.push(new HumanMessage(userQuery));
    // chatHistory.push(new AIMessage(answer));
    return NextResponse.json({ success: true, value: answer });
}




async function generateResponse(userQuery) {
    // console.log(userQuery)
    let chatHistory = [
        new HumanMessage("Hello"),
    ];
    const model = new ChatGoogleGenerativeAI({
        apiKey: key,
        model: "gemini-pro",
        maxOutputTokens: 2048,
    });



    const loader = new CheerioWebBaseLoader(
        `${process.env.NEXTAUTH_URL}/api/vehicles`,

    );

    const docs = await loader.load();

    // split text 

    const splitter = new RecursiveCharacterTextSplitter();
    const splitDocs = await splitter.splitDocuments(docs);

    const embeddings = new GoogleGenerativeAIEmbeddings({
        modelName: "embedding-001", // 768 dimensions
        taskType: TaskType.RETRIEVAL_DOCUMENT,
        title: "Document title",
    });

    const vectorstore = await MemoryVectorStore.fromDocuments(
        splitDocs,
        embeddings
    );


    const outputParser = new StringOutputParser();

    // get the doc from retrieval setup 
    const retriever = vectorstore.asRetriever();


    const retriverPrompt = ChatPromptTemplate.fromMessages([
        new MessagesPlaceholder("chat_history"),
        ["user", "{input}"],
        [
            "user",
            "You are a customer representative. Answer the user's questions based on the below context:\n\n{context}",
        ],
    ]);


    const retrieverChain = await createHistoryAwareRetriever({
        llm: model,
        retriever,
        rephrasePrompt: retriverPrompt,
    });

    // Define the prompt for the final chain
    const prompt = ChatPromptTemplate.fromMessages([
        [
            "system",
            "Answer the user's questions based on the following context: {context}.",
        ],
        new MessagesPlaceholder("chat_history"),
        ["user", "{input}"],
    ]);


    // const retrievalChain = await createRetrievalChain({
    //     retriever,
    //     combineDocsChain: documentChain,
    // });

    const chain = await createStuffDocumentsChain({
        llm: model,
        prompt: prompt,
    });
    const conversationChain = await createRetrievalChain({
        combineDocsChain: chain,
        retriever: retrieverChain,
    });
    // const response= await conversationChain.invoke({
    //     context : docs,
    //     chat_history: chatHistory,
    //     input: userQuery,

    // });
    // console.log(response);




    //// 
    const newPrompt =
        ChatPromptTemplate.fromTemplate(`
        You are a customer service representative. 
        Answer the  question based only on the context below
        Focus on the question and use the context if necessary.

    User question : {userQuery}

        <context>
        {context}
        </context>`
        );

    const documentChain = await createStuffDocumentsChain({
        llm: model,
        prompt,
    });
    const retrievalChain = await createRetrievalChain({
        combineDocsChain: documentChain,
        retriever,
    });
    const result = await retrievalChain.invoke({
        input: userQuery,
    });
    console.log(result);
    return result.answer;

}
