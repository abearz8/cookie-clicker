import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "Cookie Clicker",
  description: "Created by Alex Baier based on the game Cookie Clicker",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
