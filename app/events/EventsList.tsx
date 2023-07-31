import { ChevronRightIcon } from "@radix-ui/react-icons";
import Link from "next/link";

const EventsList = ({ events }) => {
  return (
    <ol>
      <div className="divider"></div>
      {events.map((event) => {
        return (
          <Link href={`/events/${event.id}`} key={event.id} className="w-full">
            <div className=" mx-1 flex flex-row justify-between">
              <div className="ml-1 my-auto">{event.name}</div>
              <ChevronRightIcon className="w-8 h-8" />
            </div>
            {/* <div>{event.description}</div> */}
            <div className="divider"></div>
          </Link>
        );
      })}
    </ol>
  );
};

export default EventsList;
