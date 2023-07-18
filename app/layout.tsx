import "./globals.css";
import { PHProvider, PostHogPageview } from "./providers";
import { Suspense } from "react";
import Provider from "./components/Provider";
import { Header } from "./components/Header";

export const metadata = {
  title: "Friend Lab",
  description:
    "Introducing Friend Lab, the innovative social media platform designed to transform the way adults plan hangouts with their friends. Say goodbye to the hassle of coordinating schedules, setting budgets, and finding the perfect locations, because Friend Lab does the work for you.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="fantasy">
      <Suspense>
        <PostHogPageview />
      </Suspense>
      <PHProvider>
        <Provider>
          <body className="text-current">
            <Header />
            <div className="bg-base-200 h-[92vh] p-1 overflow-auto">
              <div className="lg:w-2/4 lg:mx-auto">{children}</div>
            </div>
          </body>
        </Provider>
      </PHProvider>
    </html>
  );
}
