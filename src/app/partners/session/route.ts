import { NextRequest, NextResponse } from "next/server";
import {
  createPartnerSession,
  getPartnerAuthConfiguration,
  PARTNER_SESSION_COOKIE,
  partnerSessionCookieOptions,
  passwordMatches,
} from "@/lib/partner-portal/auth";
import {
  getPartnerPortalBasePath,
  safePartnerPortalNext,
} from "@/lib/partner-portal/routing";

const INVALID_PASSWORD_DELAY_MS = 650;

export async function POST(request: NextRequest) {
  const basePath = await getPartnerPortalBasePath();
  const configuration = getPartnerAuthConfiguration();
  const formData = await request.formData().catch(() => null);
  const nextPath = safePartnerPortalNext(formData?.get("next") ?? null, basePath);
  const password = formData?.get("password");

  if (!configuration) {
    return NextResponse.redirect(new URL(`${basePath}?error=configuration`, request.url), 303);
  }

  if (
    typeof password !== "string"
    || password.length > 256
    || !passwordMatches(password, configuration)
  ) {
    await new Promise((resolve) => setTimeout(resolve, INVALID_PASSWORD_DELAY_MS));
    const loginUrl = new URL(basePath, request.url);
    loginUrl.searchParams.set("error", "invalid");
    loginUrl.searchParams.set("next", nextPath);
    return NextResponse.redirect(loginUrl, 303);
  }

  const response = NextResponse.redirect(new URL(nextPath, request.url), 303);
  response.cookies.set(
    PARTNER_SESSION_COOKIE,
    createPartnerSession(configuration),
    partnerSessionCookieOptions(configuration),
  );
  return response;
}
