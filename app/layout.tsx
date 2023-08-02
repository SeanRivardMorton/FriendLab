import "./globals.css";

import { Analytics } from "@vercel/analytics/react";
import { Ubuntu } from "next/font/google";
import { Suspense } from "react";

import { getSession } from "./api/getSession";
import TopNav from "./components/Layout/TopNav";
import Provider from "./components/Provider";
import Loading from "./loading";
import { PHProvider, PostHogPageview } from "./providers";
import ReactQueryProvider from "./providers";

export const metadata = {
  title: "Friend Lab - Homepage",
  description:
    "Introducing Friend Lab, the innovative social media platform designed to transform the way adults plan hangouts with their friends. Say goodbye to the hassle of coordinating schedules, setting budgets, and finding the perfect locations, because Friend Lab does the work for you.",
};

const font = Ubuntu({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export default async function RootLayout({ children }) {
  const session = await getSession();

  return (
    <html lang="en-UK" className={`${font?.className} bg-base-200`}>
      <Suspense fallback={<>When do I happen?</>}>
        <PostHogPageview />
      </Suspense>
      <PHProvider>
        <ReactQueryProvider>
          <Provider>
            <Suspense fallback={<Loading />}>
              <body className="text-current">
                {session?.user && <TopNav />}
                <div className="flex flex-row justify-center overflow-auto">
                  <div className="min-h-[93vh] w-full rounded-xl bg-base-100 shadow-xl shadow-base-100 lg:mx-auto lg:min-h-[60vh] lg:w-2/4">
                    {children}
                    <Analytics />
                  </div>
                </div>
              </body>
            </Suspense>
          </Provider>
        </ReactQueryProvider>
      </PHProvider>
    </html>
  );
}
