import Navbar from "@/components/ui/Navbar";
import ScrollToTop from "@/components/ui/ScrollToTop";
import ReduxStoreProvider from "@/providers/ReduxStoreProvider";
import TanstackProvider from "@/providers/TanstackProvider";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "TMDB Movies",
  description: "An ultimate platform for movies",
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): JSX.Element => {
  return (
    <html lang="en">
      <head>
        <link rel="shortcut icon" href="/favicon.webp" type="image/x-icon" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const storedTheme = localStorage.getItem("theme");
                const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
                if (storedTheme === "dark" || (!storedTheme && prefersDark)) {
                  document.documentElement.classList.add("dark");
                } else {
                  document.documentElement.classList.remove("dark");
                }
              })();
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased dark:bg-black dark:text-white bg-white`}
      >
        <TanstackProvider>
          <ReduxStoreProvider>
            <section className="max-w-7xl mx-auto px-10 lg:px-0">
              <Navbar />
              {children}
            </section>
            <ScrollToTop />
          </ReduxStoreProvider>
        </TanstackProvider>
      </body>
    </html>
  );
}
export default RootLayout;
