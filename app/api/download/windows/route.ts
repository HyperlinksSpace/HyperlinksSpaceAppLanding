import { NextResponse } from "next/server";
import {
  getLatestWindowsDownloadUrl,
  WINDOWS_RELEASES_PAGE,
} from "@/app/lib/latest-windows-download";

export const runtime = "nodejs";

export async function GET() {
  const downloadUrl = await getLatestWindowsDownloadUrl();

  if (!downloadUrl) {
    return NextResponse.redirect(WINDOWS_RELEASES_PAGE);
  }

  return NextResponse.redirect(downloadUrl);
}
