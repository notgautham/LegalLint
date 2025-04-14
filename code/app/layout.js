import "./globals.css";
import { Inter } from "next/font/google";
import AnimatedBackground from "@/components/AnimatedBackground";
import OverlayCurves from "@/components/OverlayCurves";
import { BackgroundBeams } from "@/components/background-beams";


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "LegalLint",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="relative min-h-screen overflow-hidden bg-black">
        <AnimatedBackground />
        <OverlayCurves />
        <BackgroundBeams />
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-10">
          {children}
        </div>
      </body>
    </html>
  );
}
