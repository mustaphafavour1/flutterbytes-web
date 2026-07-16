import { NextResponse } from "next/server";
import { getSheetsDiagnostics } from "@/lib/sheets";

// Always run on-demand so this reflects the live runtime state, never a cached build.
export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  const diag = await getSheetsDiagnostics();
  return NextResponse.json(diag, {
    headers: { "Cache-Control": "no-store, max-age=0" },
  });
}
