"use client";
import {
  ArrowDownIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  BarChartIcon,
  BellIcon,
  CalendarIcon,
  CameraIcon,
  ChatBubbleIcon,
  EyeOpenIcon,
  MagnifyingGlassIcon,
  PlusIcon,
  RocketIcon,
  SewingPinIcon,
  Share2Icon,
} from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";
import { getSession, useSession } from "next-auth/react";

const FriendLabThreads = () => {
  const { data } = useSession();

  return (
    <>
      <div className="flex flex-row justify-end pr-2">
        <div className="rounded h-16 w-16 relative -mt-20 border-base-300">
          <BarChartIcon className="h-16 w-16 text-base-300" />
        </div>
      </div>
      <div className="card card-compact bg-base-200 rounded-lg mt-2">
        <div className="w-2/5 h-1 mx-auto bg-primary rounded-full mt-1"></div>
        <div className="card-body">
          <h2 className="card-title flex flex-row justify-between">
            <span>New Event:</span>
            <div>
              <button className="btn btn-circle bg-base-100 mx-1">
                <RocketIcon className="h-8 w-8" />
              </button>
              <button className="btn btn-circle bg-base-100 mx-1">
                <Share2Icon className="h-8 w-8" />
              </button>
              <button className="btn btn-circle bg-base-100 mx-1">
                <MagnifyingGlassIcon className="h-8 w-8" />
              </button>
            </div>
          </h2>
          <div className="divider my-0"></div>
          <div className="flex flex-row ">
            <button className="btn btn-ghost my-auto rounded-full">
              <div className="avatar">
                <div className="w-12 h-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  {data?.user?.image && (
                    <Image
                      src={data?.user?.image}
                      width={44}
                      height={44}
                      alt="logo"
                    />
                  )}
                </div>
              </div>
            </button>
            <div className="">
              <p>
                I&apos;m thinking of doing something on Saturday. Anyone up for
                it? I&apos;ve added a few options below. Feel free to add your
                own.
              </p>
              <div className="flex flex-row justify-end text-primary">
                <CalendarIcon className="my-auto mx-1" />
                <Link href="/" className="mx-0.5">
                  1 day ago |{" "}
                </Link>
                <ChatBubbleIcon className="my-auto mx-0.5" />
                <Link href="/">6 comments | </Link>
                <EyeOpenIcon className="my-auto mx-0.5" />
                <Link href="/" className="mx-0.5">
                  {" "}
                  Poll
                </Link>
              </div>
            </div>
          </div>
          <div className="divider my-1"></div>
          <div className="flex flex-row justify-around">
            <button className="btn btn-circle bg-base-100 mx-1">
              <ArrowLeftIcon className="h-8 w-8" />
            </button>
            <button className="btn btn-circle bg-base-100 mx-1">
              <ChatBubbleIcon className="h-8 w-8" />
            </button>
            <button className="btn btn-circle bg-base-100 mx-1">
              <ArrowRightIcon className="h-8 w-8" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FriendLabThreads;
