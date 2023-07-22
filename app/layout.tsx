import "./globals.css";
import { PHProvider, PostHogPageview } from "./providers";
import ReactQueryProvider from "./providers";
import { Suspense } from "react";
import Provider from "./components/Provider";
import { Header } from "./components/Header";
import { Analytics } from "@vercel/analytics/react";
import BottomNav from "./components/BottomNav";
import TopNav from "./components/TopNav";

export const metadata = {
  title: "Friend Lab",
  description:
    "Introducing Friend Lab, the innovative social media platform designed to transform the way adults plan hangouts with their friends. Say goodbye to the hassle of coordinating schedules, setting budgets, and finding the perfect locations, because Friend Lab does the work for you.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en-UK">
      <Suspense>
        <PostHogPageview />
      </Suspense>
      <PHProvider>
        <ReactQueryProvider>
          <Provider>
            <body className="text-current">
              {/* <Header /> */}
              <TopNav>
                <div className="bg-base-200 h-[87vh] p-1 pb-10 overflow-auto">
                  <div className="lg:w-2/4 lg:mx-auto">
                    {children}
                    <Analytics />
                  </div>
                </div>
              </TopNav>
              <BottomNav />
            </body>
          </Provider>
        </ReactQueryProvider>
      </PHProvider>
    </html>
  );
}
