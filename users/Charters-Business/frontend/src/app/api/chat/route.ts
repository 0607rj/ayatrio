import { NextResponse } from "next/server";
import askBot from "@/lib/bot/askBot";

export async function POST(req: Request) {
  const { message } = await req.json();

  const reply = await askBot(message);

  return NextResponse.json({
    reply: String(reply),
  });
}