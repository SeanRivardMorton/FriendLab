import "./globals.css";
import { PHProvider, PostHogPageview } from "./providers";
import ReactQueryProvider from "./providers";
import { Suspense } from "react";
import Provider from "./components/Provider";

import { Analytics } from "@vercel/analytics/react";

import Loading from "./loading";
import TopNav from "./components/Layout/TopNav";
import { Ubuntu } from "next/font/google";
import { getSession } from "./api/getSession";

export const metadata = {
  title: "Friend Lab",
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
                <div className="overflow-auto flex flex-row justify-center">
                  <div className="lg:w-2/4 w-full lg:mx-auto bg-base-100 shadow-2xl mb-2 shadow-base-100">
                    {/* <div className="lg:w-2/4 lg:mx-auto"> */}
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
