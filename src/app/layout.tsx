import type { Metadata } from "next";
import { Fira_Code, IBM_Plex_Mono, Inter } from "next/font/google";
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
  title: "Worktree | Managed Business-Agent Workflows",
  description:
    "Worktree installs managed business-agent routines that gather context, use your systems, route approvals, and keep recurring operational work moving.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${firaCode.variable} ${ibmPlexMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
