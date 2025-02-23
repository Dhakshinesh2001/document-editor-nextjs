import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Provider from "./provider";
import { Inter as FontSans } from "next/font/google"
import { cn } from "@/lib/utils"
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: "LiveDocs",
  description: "Collaborative documentation made easy",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
        variables: {
          colorPrimary: "#3371FF",
          fontSize:'16px'
        }
      }}
    >
    <html lang="en">
      <body
        className={
          cn("min-h-scree font-sans antialiased",
          fontSans.variable,
          )
        }
      >
        <Provider>    
              {children}
        </Provider>

      </body>
    </html>
    </ClerkProvider>
  );
}
