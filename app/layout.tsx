import "./globals.css";
import { PHProvider, PostHogPageview } from "./providers";
import { Inter } from "next/font/google";
import { Suspense } from "react";

const inter = Inter({ subsets: ["latin"] });

const descriptions = [
  "Discover Friendlab, where the burdensome task of planning is gracefully alleviated, leaving you free to revel in the harmonious symphony of events and monetary arrangements.",
  "Step into the refined world of Friendlab, where the intricate intricacies of scheduling wizardry, event prowess, and bill-handling finesse coalesce into a transcendent experience of organizational nirvana.",
  "Friendlab: Enter the realm where the celestial spheres of scheduling, event coordination, and financial equilibrium align in sublime equilibrium, leaving you with naught but serene tranquility.",
  "With Friendlab, behold a world where the celestial forces of scheduling alignment, event optimization, and fiscal equilibrium converge in sublime harmony, leaving you in awe of its ineffable brilliance.",
  "Friendlab: Your personal hangout curator, making memories that matter.",
  "Experience seamless social connections with Friendlab in your pocket!",
  "Connecting friends, one hangout at a time, with Friendlab!",
  "Friendlab: The brainy buddy who plans epic hangouts, so you don't have to!",
  "Planning a hangout? Trust Friendlab—where genius meets 'Let's have a blast!'",
  "Buddy up with Friendlab and let the good times roll, because life's too short for boring hangouts!",
  "Friendlab: Helping you schedule your way out of awkward social encounters.",
  "Discover Friendlab: The perfect excuse to avoid spending time with your weird relatives.",
  "Friendlab: Making socializing easier, because your therapist isn't always available.",
  "Friendlab: The ultimate catalyst for regrettable hangouts you'll laugh about later.",
  "Unleash Friendlab and witness friendships survive the most outrageous hangouts.",
  "Friendlab: The social platform that reminds you that you have questionable taste in friends.",
];

const randomIndex = Math.floor(Math.random() * descriptions.length);

export const metadata = {
  title: "Friend Lab",
  description: descriptions[randomIndex],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Suspense>
        <PostHogPageview />
      </Suspense>
      <PHProvider>
        <body>{children}</body>
      </PHProvider>
    </html>
  );
}
