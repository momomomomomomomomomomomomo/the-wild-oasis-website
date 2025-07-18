import Navigation from "./_components/Navigation";
import Logo from "@/app/_components/Logo";
import "@/app/_styles/globals.css";
import Header from "@/app/_components/Header.js";
import { Josefin_Sans } from "next/font/google";

const josefin = Josefin_Sans({
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: {
    template: "%s / The Wild Oasis",
    default: "Welcome / The Wild Oasis",
  },
  description:
    "Luxurious cabin hotel, located in the heart of the italian Dolomities, surrounded by beautiful mountains and dark forests",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" webcrx="">
      <body
        className={`${josefin.className} bg-primary-950 text-primary-100 relative flex min-h-screen flex-col antialiased`}
      >
        <Header />

        <div className="flex-1 px-8 py-12">
          <main className="mx-auto max-w-7xl">{children}</main>
        </div>
      </body>
    </html>
  );
}
