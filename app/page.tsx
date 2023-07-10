"use client";
import Image from "next/image";
import React from "react";
import { useForm } from "react-hook-form";
import Beaker from "./assets/vial.svg";

export default function Home() {
  const [isInterested, setIsInterested] = React.useState(false);
  const [isSaved, setIsSaved] = React.useState(false);
  const form = useForm({
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = form.handleSubmit((data) => {
    console.log(data);
    setIsSaved(true);
  });

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
              {isSaved && (
                <h2 className="text-lg">
                  😎 <span className="italic">Awesome, Thanks</span>
                </h2>
              )}
              {!isSaved && (
                <>
                  {isInterested ? (
                    <form className="flex flex-col" onSubmit={onSubmit}>
                      <input
                        {...form.register("email")}
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
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
