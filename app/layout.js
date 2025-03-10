import { Inter, Roboto_Mono } from "next/font/google"; // ✅ Correct import
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
  weight: ["400", "700"], // ✅ Add specific weights if needed
});

export const metadata = {
  title: "EduMitra", // ✅ Update title
  description: "EduMitra - A Next.js Learning Platform",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.variable} ${robotoMono.variable} antialiased`}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
