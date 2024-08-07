import { ArrowRightIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";

import SloganRotater from "../login/SloganRotater";

const slogans = [
  "Friend Hangout Scheduler",
  "Dinner Party Coordinator",
  "Fantasy Tabletop Planner",
  "Frugal Hangout Advisor",
  "Techy Meetup Planner",
  "Cat Sitting Tracker",
  "Work Drinks Decider",
  "Movie Night Planner",
  "Game Day Coordinator",
  "BBQ Day Planner",
  "Stag-Do Planner",
  "Hen-Do Planner",
  "Poker Night Scheduler",
  "Work drink instigator",
  "Gym Day Scheduler",
];

const LandingPage = () => {
  return (
    <>
      <div className="hero min-h-screen">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <SloganRotater slogans={slogans} />
            <h1 className="text-3xl mt-24 mb-8">Friend Lab.</h1>
            <div className="flex flex-row">
              <Link
                aria-labelledby = "linkLabel"
                href="/login"
                className="btn btn-circle btn-primary mx-auto h-28 w-28 "
              >
                <ArrowRightIcon className="h-16 w-16" />
              </Link>
            </div>
            <span className="mt-2 text-xl" id="linkLabel">Get Started</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
