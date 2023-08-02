"use client";
import {
  CheckIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  Cross1Icon,
} from "@radix-ui/react-icons";
// import Vial from "../../assets/vial.svg";
import theme from "daisyui/src/theming/themes";
import { formatDistance } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import {
  AcceptInviteButton,
  DeclineInviteButton,
} from "../FunctionalButtons/UserEventResponseButtons";

// surely there is a better way than this?
const { primary } = theme["[data-theme=aqua]"];

const QuickEvents = ({ events, initialIndex, userId }) => {
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
        <div className="flex max-w-md flex-col">
          <h2 className="text-5xl font-bold">Next Event</h2>
          <h3 className="">{event.name}</h3>
          <div className="flex flex-row justify-end">
            <button
              onClick={previousEvent}
              className="btn-ghost btn-circle btn my-auto"
            >
              <ChevronLeftIcon className="h-8 w-8" />
            </button>

            <DeclineInviteButton
              onSuccess={() => {}}
              userId={userId}
              eventId={event.id}
            />
            <Link
              href={`/events/${event.id}`}
              style={{ boxShadow: `${primary} 0px 0px 10px` }}
              className="w-fill btn mx-auto my-6 h-32 w-32 rounded-full border-2 border-dashed border-white shadow-primary"
            >
              <Image
                src={"vial.svg"}
                height={44}
                width={44}
                alt="logo"
                className="mx-auto rotate-12"
              />
            </Link>
            <AcceptInviteButton
              onSuccess={() => {}}
              userId={userId}
              eventId={event.id}
            />
            <button
              onClick={nextEvent}
              className="btn-ghost btn-circle btn my-auto"
            >
              <ChevronRightIcon className="h-8 w-8" />
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
