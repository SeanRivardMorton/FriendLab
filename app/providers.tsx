// app/providers.js
"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { usePathname, useSearchParams } from "next/navigation";
import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";
import { useEffect } from "react";
import React from "react";

if (typeof window !== "undefined") {
  posthog.init("phc_QJgwbbp86My5P4V6b7ey2GYcOn9jvLixeL3hpk4Scma", {
    api_host:
      process.env.NODE_ENV === "development"
        ? "https://eu.posthog.com"
        : "https://friendlab.co.uk/ingest",
  });
}

export function PostHogPageview(): any {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  // Track pageviews
  useEffect(() => {
    if (pathname) {
      let url = window.origin + pathname;
      if (searchParams?.toString()) {
        url = url + `?${searchParams?.toString()}`;
      }
      posthog.capture("$pageview", {
        $current_url: url,
      });
    }
  }, [pathname, searchParams]);
}

export function PHProvider({ children }) {
  return <PostHogProvider client={posthog}>{children}</PostHogProvider>;
}

export default function Providers({ children }) {
  const [queryClient] = React.useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
