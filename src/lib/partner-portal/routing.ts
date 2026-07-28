import "server-only";

export async function getPartnerPortalBasePath() {
  return "/partners";
}

export function safePartnerPortalNext(value: FormDataEntryValue | null, basePath: string) {
  if (typeof value !== "string") return basePath || "/";

  const expectedPrefix = basePath ? `${basePath}/` : "/";
  if (value === (basePath || "/") || value.startsWith(expectedPrefix)) return value;

  return basePath || "/";
}
