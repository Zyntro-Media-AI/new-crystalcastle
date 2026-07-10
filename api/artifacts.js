import { createClient } from "@supabase/supabase-js";
import { z } from "zod";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Define schema for artifact validation
const artifactSchema = z.object({
  video_url: z.string().url().optional(),
  prompt: z.string().min(1, "Prompt is required"),
  filename: z.string().min(1, "Filename is required"),
  category: z.string().min(1, "Category is required"),
  brand: z.string().optional(),
  image_url: z.string().url().optional(),
  engine: z.string().min(1, "Engine is required"),
});

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method === "GET") {
    try {
      const { data, error } = await supabase
        .from("artifact")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(50);

      if (error) throw error;
      return res.status(200).json({ data });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  if (req.method === "POST") {
    try {
      // Validate request body
      const parsed = artifactSchema.parse(req.body);

      const { data, error } = await supabase
        .from("artifact")
        .insert([parsed])
        .select();

      if (error) throw error;
      return res.status(200).json({ data });
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({ error: err.errors });
      }
      return res.status(500).json({ error: err.message });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}
