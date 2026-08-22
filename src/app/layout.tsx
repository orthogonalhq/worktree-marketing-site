import type { Metadata } from "next";
import { Fira_Code, IBM_Plex_Mono, Inter } from "next/font/google";
import { StructuredData } from "@/components/structured-data";
import { organizationWebsiteJsonLd, siteName, siteUrl } from "@/lib/seo";
import "./tailwind.css";
import "../styles/tokens/primitives.css";
import "../styles/tokens/app-theme.css";
import "../styles/tokens/components.css";
import "./globals.css";

const inter = Inter({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-inter",
});

const firaCode = Fira_Code({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-fira-code",
});

const ibmPlexMono = IBM_Plex_Mono({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-ibm-plex-mono",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: {
    default: "Worktree | Hands-on AI Engineering and Managed Operations",
    template: "%s | Worktree",
  },
  applicationName: siteName,
  description:
    "Worktree works alongside your team to build, install, and manage AI agents and workflows that fit how your business operates.",
  openGraph: { siteName, type: "website" },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${firaCode.variable} ${ibmPlexMono.variable}`}>
        <StructuredData data={organizationWebsiteJsonLd} />
        {children}
      </body>
    </html>
  );
}
