import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { api } from "./_generated/api";

export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("messages").order("asc").collect();
  },
});

export const send = mutation({
  args: { body: v.string(), author: v.string() },
  handler: async (ctx, { body, author }) => {
    await ctx.db.insert("messages", {
      body,
      author,
      timestamp: Date.now(),
    });

    if (author === "user") {
      // Trigger the pirate translation action
      await ctx.scheduler.runAfter(0, api.gemini.translateToPirate, {
        text: body,
      });
    }
  },
});
