"use client";
import Image from "next/image";
// import Vial from "../../assets/vial.svg";
import theme from "daisyui/src/theming/themes";
import Link from "next/link";
import { formatDistance } from "date-fns";
import {
  CheckIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  Cross1Icon,
} from "@radix-ui/react-icons";
import React from "react";

// surely there is a better way than this?
const { primary } = theme["[data-theme=luxury]"];

const QuickEvents = ({ events, initialIndex }) => {
  const [event, setEvent] = React.useState(events?.[initialIndex]);

  const previousEvent = () => {
    const index = events.indexOf(event);
    if (index === 0) {
      setEvent(events[events.length - 1]);
    } else {
      setEvent(events[index - 1]);
    }
  };

  const nextEvent = () => {
    const index = events.indexOf(event);
    if (index === events.length - 1) {
      setEvent(events[0]);
    } else {
      setEvent(events[index + 1]);
    }
  };

  if (!event) return null;

  const date = formatDistance(new Date(event?.date ?? null), new Date(), {
    addSuffix: true,
  });
  return (
    <div className="hero">
      <div className="hero-content text-center">
        <div className="max-w-md flex flex-col">
          <h1 className="text-5xl font-bold">Next Event</h1>
          <h2 className="">{event.name}</h2>
          <div className="flex flex-row justify-end">
            <button
              onClick={previousEvent}
              className="btn btn-circle btn-ghost my-auto"
            >
              <ChevronLeftIcon className="w-8 h-8" />
            </button>

            <button className="btn btn-circle text-error my-auto">
              <Cross1Icon className="w-8 h-8" />
            </button>
            <Link
              href={`/events/${event.id}`}
              style={{ boxShadow: `${primary} 0px 0px 10px` }}
              className="btn mx-auto w-fill border-white border-dashed border-2 rounded-full h-32 w-32 my-6 shadow-primary"
            >
              <Image
                src={"vial.svg"}
                height={44}
                width={44}
                alt="logo"
                className="rotate-12 mx-auto"
              />
            </Link>
            <button className="btn btn-circle my-auto text-success">
              <CheckIcon className="w-8 h-8" />
            </button>
            <button
              onClick={nextEvent}
              className="btn btn-circle btn-ghost my-auto"
            >
              <ChevronRightIcon className="w-8 h-8" />
            </button>
          </div>
          <span className="mb-2">{date}</span>
          <Link href={`/events/${event.id}`} className="btn">
            View
          </Link>
        </div>
      </div>
    </div>
  );
};

export default QuickEvents;
