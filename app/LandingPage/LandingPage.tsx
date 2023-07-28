import { ArrowRightIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";

const LandingPage = () => {
  return (
    <>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h2 className="text-4xl h-12 underline underline-offset-8">
              Dinner
            </h2>
            <h2 className="text-4xl h-12 underline underline-offset-8">
              Party
            </h2>
            <h2 className="text-4xl h-12 underline underline-offset-8">
              Coordinator
            </h2>
            <h1 className="text-3xl mt-24">Friend Lab.</h1>
            <div className="flex flex-row justify-around mt-8">
              <span className="my-auto">
                Start <ArrowRightIcon className="w-8 h-8" />
              </span>
              <Link
                href="/signup"
                className="btn btn-circle h-28 w-28 bg-base-100 "
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
