import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { supabaseAdmin } from "@/lib/supabase";

export async function GET() {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id as string | undefined;

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data, error } = await supabaseAdmin
    .from("restorations")
    .select("id, original_url, restored_url, status, created_at")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(50);

  if (error) {
    console.error("[/api/restore/history]", error);
    return NextResponse.json(
      { error: "Failed to load history" },
      { status: 500 }
    );
  }

  return NextResponse.json({ items: data ?? [] });
}
