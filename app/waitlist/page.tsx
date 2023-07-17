"use client";
import Image from "next/image";
import React from "react";
import { useForm } from "react-hook-form";
import Beaker from "../assets/vial.svg";

export default function Home() {
  const [isInterested, setIsInterested] = React.useState(false);
  const [isSaved, setIsSaved] = React.useState(false);
  const form = useForm({
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = form.handleSubmit(async (data) => {
    console.log(data);
    const response = await fetch("/api/waitlist", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((d) => {
      return d.json();
    });

    const result = await response;
    if (result?.error) return;

    setIsSaved(true);
  });

  return (
    <main>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content text-center">
          <div className="max-w-md flex flex-col">
            <h1 className="text-5xl font-bold">
              Welcome to <br /> Friend Lab!
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
                        {...form.register("email", {
                          pattern: {
                            value: /\S+@\S+\.\S+/,
                            message: "That doesn't look like an email",
                          },
                        })}
                        type="text"
                        placeholder="Your Email"
                        className="mb-8 input input-bordered input-primary w-full max-w-xs"
                      />
                      {form.formState.errors && (
                        <span className="mb-4">
                          {form.formState.errors?.email?.message}
                        </span>
                      )}
                      <button className="btn btn-primary" type="submit">
                        Join Waitlist
                      </button>
                    </form>
                  ) : (
                    <button
                      onClick={() => setIsInterested(true)}
                      className="btn btn-primary"
                    >
                      Sign up
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="card bg-base-100 shadow-xl my-8">
        <div className="card-body">
          <h2 className="card-title mx-auto">What is it?</h2>
          <p>
            Friend Lab helps friends hangout. Help schedule your next hangout
            with location, price, and interests in mind.
          </p>
        </div>
      </div>
    </main>
  );
}
