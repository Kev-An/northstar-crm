import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Northstar CRM — A clearer view of every relationship",
  description: "A thoughtful workspace for managing customers, deals, and the relationships that move your business forward.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
