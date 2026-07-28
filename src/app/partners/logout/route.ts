import { NextRequest, NextResponse } from "next/server";
import {
  PARTNER_SESSION_COOKIE,
} from "@/lib/partner-portal/auth";
import { getPartnerPortalBasePath } from "@/lib/partner-portal/routing";

export async function POST(request: NextRequest) {
  const basePath = await getPartnerPortalBasePath();
  const response = NextResponse.redirect(new URL(basePath, request.url), 303);

  response.cookies.set(PARTNER_SESSION_COOKIE, "", {
    expires: new Date(0),
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });

  return response;
}
