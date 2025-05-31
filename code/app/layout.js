import "./globals.css";
import { IBM_Plex_Sans } from "next/font/google";
import { DotBackground } from "@/components/DotBG";
import { Spotlight } from "@/components/spotlight";
import ScrollLayoutWrapper from "@/components/ScrollLayoutWrapper";
import ScrollBlurOverlay from "@/components/ScrollBlurOverlay";

const ibm = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-ibm",
});

export const metadata = {
  title: "LegalLint",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={ibm.variable}>
      <body
        className={`${ibm.className} relative min-h-screen overflow-x-hidden bg-neutral-950`}
      >
        <DotBackground />
        <Spotlight />
        <ScrollBlurOverlay />
        <ScrollLayoutWrapper>{children}</ScrollLayoutWrapper>
      </body>
    </html>
  );
}
