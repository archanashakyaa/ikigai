import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";
import { analyzeOffline, offlineResponses } from "@/lib/offline-brain";

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey || "");

const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
    systemInstruction: `
You are MindFit, a 20-year-old motivator and "lifeguard" for the user's thoughts.
Your Role:
- Act like a cool, supportive 20-year-old friend. Not a doctor or a therapist.
- You are a "lifeguard": you keep the user afloat when they feel like they are drowning in thoughts.
- Be extremely motivating, nice, and completely non-judgmental. Never show anger.
- Listen actively. If they need to vent, let them vent. Then offer a hand to pull them up.
- Use a warm, energetic, and safe tone.
- Keep responses short, punchy, and human-like. Use emojis to check the vibe.

Boundaries:
- You are NOT a therapist. Do not diagnose.
- If a user mentions self-harm, suicide, or severe crisis, you MUST respond with: "I'm hearing that you're in a lot of pain right now, and I want you to be safe. Please reach out to a crisis helpline immediately or go to the nearest emergency room. You don't have to go through this alone."
  `
});

export async function POST(req: Request) {
    let message = "";
    let history = [];

    try {
        const body = await req.json();
        message = body.message || "";
        history = body.history || [];

        // Simulate API check - if no key, go straight to offline brain
        if (!apiKey) {
            console.warn("No API Key found. Using Offline Brain.");
            const response = analyzeOffline(message);
            // Add a small delay to simulate "thinking" so it feels real
            await new Promise(resolve => setTimeout(resolve, 600));
            return NextResponse.json({ response });
        }

        const chat = model.startChat({
            history: history,
        });

        const result = await chat.sendMessage(message);
        const response = await result.response;
        const text = response.text();

        return NextResponse.json({ response: text });
    } catch (error) {
        console.error("Gemini API Error (Falling back to Offline Brain):", error);

        // If we have a message, use the offline brain to analyze it
        if (message) {
            const fallbackResponse = analyzeOffline(message);
            return NextResponse.json({ response: fallbackResponse });
        }

        // Final fallback if parsing failed completely
        return NextResponse.json({
            response: offlineResponses.default[0]
        });
    }
}
