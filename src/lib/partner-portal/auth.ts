import "server-only";

import { createHash, createHmac, timingSafeEqual } from "node:crypto";

export const PARTNER_SESSION_COOKIE = "worktree_partner_portal";

const DEFAULT_SESSION_DAYS = 7;
const MAX_SESSION_DAYS = 30;

type PartnerAuthConfiguration = {
  password: string;
  sessionSecret: string;
  sessionSeconds: number;
};

function fixedLengthDigest(value: string) {
  return createHash("sha256").update(value).digest();
}

function safeEqual(left: string, right: string) {
  return timingSafeEqual(fixedLengthDigest(left), fixedLengthDigest(right));
}

function configuredSessionDays() {
  const requestedDays = Number(process.env.PARTNER_PORTAL_SESSION_DAYS ?? DEFAULT_SESSION_DAYS);

  if (!Number.isFinite(requestedDays)) return DEFAULT_SESSION_DAYS;
  return Math.min(Math.max(Math.trunc(requestedDays), 1), MAX_SESSION_DAYS);
}

export function getPartnerAuthConfiguration(): PartnerAuthConfiguration | null {
  const password = process.env.PARTNER_PORTAL_PASSWORD;
  const sessionSecret = process.env.PARTNER_PORTAL_SESSION_SECRET;

  if (!password || !sessionSecret || sessionSecret.length < 32) return null;

  return {
    password,
    sessionSecret,
    sessionSeconds: configuredSessionDays() * 24 * 60 * 60,
  };
}

function sessionSignature(payload: string, secret: string) {
  return createHmac("sha256", secret).update(payload).digest("base64url");
}

export function passwordMatches(candidate: string, configuration: PartnerAuthConfiguration) {
  return safeEqual(candidate, configuration.password);
}

export function createPartnerSession(configuration: PartnerAuthConfiguration) {
  const expiresAt = Math.floor(Date.now() / 1000) + configuration.sessionSeconds;
  const payload = `v1.${expiresAt}`;
  return `${payload}.${sessionSignature(payload, configuration.sessionSecret)}`;
}

export function isValidPartnerSession(value: string | undefined, configuration: PartnerAuthConfiguration) {
  if (!value) return false;

  const [version, expiresAtValue, signature, ...extra] = value.split(".");
  if (version !== "v1" || !expiresAtValue || !signature || extra.length > 0) return false;

  const expiresAt = Number(expiresAtValue);
  if (!Number.isInteger(expiresAt) || expiresAt <= Math.floor(Date.now() / 1000)) return false;

  const payload = `${version}.${expiresAtValue}`;
  return safeEqual(signature, sessionSignature(payload, configuration.sessionSecret));
}

export function partnerSessionCookieOptions(configuration: PartnerAuthConfiguration) {
  return {
    httpOnly: true,
    maxAge: configuration.sessionSeconds,
    path: "/",
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
  };
}
