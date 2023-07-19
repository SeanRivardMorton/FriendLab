"use client";
import Image from "next/image";
import React from "react";
import { useForm } from "react-hook-form";
import Vial from "../assets/vial.svg";
import SignInButton from "../invite/SignInButton";

// This page is to be phased out
export default function Home() {
  const [isInterested, setIsInterested] = React.useState(false);
  const [isSaved, setIsSaved] = React.useState(false);
  const form = useForm({
    defaultValues: {
      email: "",
    },
  });

  // const onSubmit = form.handleSubmit(async (data) => {
  //   const response = await fetch("/api/waitlist", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(data),
  //   }).then((d) => {
  //     return d.json();
  //   });

  //   const result = await response;
  //   if (result?.error) return;

  //   setIsSaved(true);
  // });

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
              src={Vial}
            />
            <SignInButton />
          </div>
        </div>
      </div>
    </main>
  );
}
