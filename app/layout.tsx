import "./globals.css";
import { PHProvider, PostHogPageview } from "./providers";
import ReactQueryProvider from "./providers";
import { Suspense } from "react";
import Provider from "./components/Provider";

import { Analytics } from "@vercel/analytics/react";

import Loading from "./loading";
import TopNav from "./components/Layout/TopNav";
import { Ubuntu, Roboto } from "next/font/google";
import { getSession } from "./api/getSession";

export const metadata = {
  title: "Friend Lab",
  description:
    "Introducing Friend Lab, the innovative social media platform designed to transform the way adults plan hangouts with their friends. Say goodbye to the hassle of coordinating schedules, setting budgets, and finding the perfect locations, because Friend Lab does the work for you.",
};

// const inter = Inter({
//   subsets: ["latin", "latin-ext"],
//   display: "swap",
// });

const font = Ubuntu({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export default async function RootLayout({ children }) {
  const session = await getSession();
  return (
    <html lang="en-UK" className={`${font?.className}`}>
      <Suspense fallback={<>When do I happen?</>}>
        <PostHogPageview />
      </Suspense>
      <PHProvider>
        <ReactQueryProvider>
          <Provider>
            <Suspense fallback={<Loading />}>
              <body className="text-current bg-base-100">
                <TopNav avatar={session?.user?.image || undefined} />
                <div className="bg-base-100 overflow-auto">
                  <div className="lg:w-2/4 lg:mx-auto">
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
