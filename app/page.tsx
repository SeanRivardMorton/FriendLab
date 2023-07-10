"use client";
import Image from "next/image";
import React from "react";
import Beaker from "./assets/vial.svg";

export default function Home() {
  const [isInterested, setIsInterested] = React.useState(false);

  return (
    <main>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">
              Welcome to <br /> Friend lab!
            </h1>
            <Image
              className="m-auto my-4 rotate-12"
              width={80}
              height={80}
              alt="vial"
              src={Beaker}
            />
            <div className="h-24">
              {isInterested ? (
                <form className="flex flex-col">
                  <input
                    type="text"
                    placeholder="Your Email"
                    className="mb-8 input input-bordered input-primary w-full max-w-xs"
                  />
                  <button className="btn btn-primary" type="submit">
                    Join Waitlist
                  </button>
                </form>
              ) : (
                <button
                  onClick={() => setIsInterested(true)}
                  className="btn btn-primary"
                >
                  Join Waitlist
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
