import "./globals.css";
import { PHProvider, PostHogPageview } from "./providers";
import { Inter } from "next/font/google";
import { Suspense } from "react";
import Provider from "./components/Provider";
import { Header } from "./components/Header";

// const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Friend Lab",
  description:
    "Introducing Friend Lab, the innovative social media platform designed to transform the way adults plan hangouts with their friends. Say goodbye to the hassle of coordinating schedules, setting budgets, and finding the perfect locations, because Friend Lab does the work for you.",
};

export default function RootLayout({ children, session }) {
  return (
    <html lang="en">
      <Suspense>
        <PostHogPageview />
      </Suspense>
      <PHProvider>
        <Provider>
          <body>
            <Header />
            {children}
          </body>
        </Provider>
      </PHProvider>
    </html>
  );
}
