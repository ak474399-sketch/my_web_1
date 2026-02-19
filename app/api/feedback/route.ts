import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { supabaseAdmin } from "@/lib/supabase";

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id as string | undefined;

  let body: { message?: string; context?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const message = typeof body.message === "string" ? body.message.trim() : "";
  if (!message || message.length > 2000) {
    return NextResponse.json(
      { error: "Message required (max 2000 characters)" },
      { status: 400 }
    );
  }

  const context = typeof body.context === "string" ? body.context.trim().slice(0, 200) : null;

  const { error } = await supabaseAdmin.from("feedback").insert({
    user_id: userId ?? null,
    message,
    context: context || null,
  });

  if (error) {
    console.error("[/api/feedback]", error);
    return NextResponse.json({ error: "Failed to submit feedback" }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
