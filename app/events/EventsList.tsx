import { CheckIcon, ChevronRightIcon, Cross1Icon } from "@radix-ui/react-icons";
import { formatDistance } from "date-fns";
import Image from "next/image";
import Link from "next/link";

const sortEventsByDate = (events) =>
  events.sort(
    (a, b) => new Date(a.date).valueOf() - new Date(b.date).valueOf()
  );

const EventsList = ({ events }) => {
  return (
    <ol>
      <div className="divider"></div>
      {sortEventsByDate(events).map((event) => {
        const date = formatDistance(new Date(event?.date ?? null), new Date(), {
          addSuffix: true,
        });
        return (
          <Link href={`/events/${event.id}`} key={event.id} className="w-full">
            <div className=" mx-1 flex flex-row justify-between">
              <div className="flex flex-row">
                <Image
                  className="rounded-full w-8 h-8 ring-primary"
                  src={event.creator?.image}
                  alt={`event creater: ${event?.creator?.name}`}
                  height={44}
                  width={44}
                />
                <div className="flex flex-col ml-2">
                  <div className="my-auto">{event?.name}</div>
                  <p className="text-xs my-auto">{date}</p>
                </div>
              </div>
              {/* <p className="text-xs">{date}</p> */}
              <div className="flex flex-row justify-end">
                {event.eventResponse[0]?.response === "ACCEPTED" && (
                  <CheckIcon className="w-8 h-8 text-success" />
                )}
                {event.eventResponse[0]?.response === "DECLINED" && (
                  <Cross1Icon className="w-8 h-8 text-error" />
                )}
                <ChevronRightIcon className="w-8 h-8" />
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
