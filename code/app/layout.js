import "./globals.css";
import { Inter } from "next/font/google";
import { BackgroundBeams } from "@/components/background-beams";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "LegalLint",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} relative min-h-screen w-full overflow-hidden bg-neutral-950`}
      >
        {/* NEW: Aceternity background beams covering the entire screen */}
        <BackgroundBeams />

        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen">
          {children}
        </div>
      </body>
    </html>
  );
}
