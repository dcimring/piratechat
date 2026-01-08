/// <reference types="node" />
import { action } from "./_generated/server";
import { v } from "convex/values";
import { api } from "./_generated/api";
import { GoogleGenerativeAI } from "@google/generative-ai";

export const translateToPirate = action({
  args: { text: v.string() },
  handler: async (ctx, { text }) => {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is not set in environment variables");
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const prompt = `You are a salty, seasoned pirate captain. Translate the following text into authentic pirate speak. Keep it concise and maintain the original meaning, but add plenty of pirate flavor (arrr, matey, landlubber, etc.). Text: "${text}"`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const pirateText = response.text().trim();

    // Send the pirate's reply back to the database
    await ctx.runMutation(api.messages.send, {
      body: pirateText,
      author: "pirate",
    });
  },
});
