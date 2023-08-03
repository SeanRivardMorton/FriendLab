"use client";
import { CheckIcon, ChevronRightIcon, Cross1Icon } from "@radix-ui/react-icons";
import { useQuery } from "@tanstack/react-query";
import { formatDistance } from "date-fns";
import Image from "next/image";
import Link from "next/link";

import Avatar from "../components/Avatar";

const sortEventsByDate = (events) => {
  return events.sort(
    (a, b) => new Date(a.date).valueOf() - new Date(b.date).valueOf(),
  );
};

const getEvents = async () => {
  const response = await fetch(`/api/events`);
  const events = await response.json();
  return events;
};

const EventsList = (props) => {
  const { data: events } = useQuery({
    queryKey: ["events"],
    queryFn: () => getEvents(),
    initialData: props.events,
  });

  return (
    <ol>
      <div className="divider"></div>
      {sortEventsByDate(events).map((event) => {
        const date = formatDistance(new Date(event?.date ?? null), new Date(), {
          addSuffix: true,
        });
        return (
          <Link href={`/events/${event.id}`} key={event.id} className="w-full">
            <div className="mx-3 flex flex-row justify-between">
              <div className="flex flex-row">
                <Avatar
                  className="border-4 border-base-200"
                  src={event.creator?.image}
                />

                <div className="ml-2 flex flex-col">
                  <div className="my-auto">{event?.name}</div>
                  <p className="my-auto text-xs">{date}</p>
                </div>
              </div>
              {/* <p className="text-xs">{date}</p> */}
              <div className="my-auto flex flex-row justify-end">
                {event.eventResponse[0]?.response === "ACCEPTED" && (
                  <CheckIcon className="h-8 w-8 text-success" />
                )}
                {event.eventResponse[0]?.response === "DECLINED" && (
                  <Cross1Icon className="h-8 w-8 text-error" />
                )}
                <ChevronRightIcon className="h-8 w-8" />
              </div>
            </div>
            {/* <div>{event.description}</div> */}
            <div className="divider my-2"></div>
          </Link>
        );
      })}
    </ol>
  );
};

export default EventsList;
