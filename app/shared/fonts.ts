import { Bebas_Neue, Inter } from "next/font/google";

export const bebasNeue = Bebas_Neue({
  variable: "--font-bebas-neue",
  weight: "400",
  subsets: ["latin"],
});

export const inter = Inter({
  variable: "--font-inter-custom",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});
