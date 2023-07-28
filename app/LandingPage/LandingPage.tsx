import { ArrowRightIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";

const slogans = [
  "Friend Hangout Planner",
  "Dinner Party Coordinator",
  "Fantasy Tabletop Planner",
  "Frugal Hangout Advisor",
  "Techy Meetup Planner",
  "Cat Sitting Tracker",
  "Work Drinks Decider",
  "Movie Night Agent",
  "Game Day Coordinator",
  "BBQ Day Planner",
  "Stag Do Planner",
  "Hen Do Planner",
  "Poker Night Scheduler",
];

const LandingPage = () => {
  return (
    <>
      <div className="hero min-h-screen">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <div className="text-center">
              <h2
                style={{ wordSpacing: "100vw" }}
                className="text-4xl mx-auto underline"
              >
                {slogans[Math.floor(Math.random() * slogans.length)]}
              </h2>
            </div>
            <h1 className="text-3xl mt-24">Friend Lab.</h1>
            <div className="flex flex-row justify-around mt-8">
              <span className="my-auto text-xl">
                Start <ArrowRightIcon className="w-10 h-10" />
              </span>
              <Link
                href="/login"
                className="btn btn-circle h-28 w-28 bg-base-200 "
              >
                <Image
                  className=""
                  src="/vial.svg"
                  height={44}
                  width={44}
                  alt="go to login"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
