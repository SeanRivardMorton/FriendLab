import { CalendarIcon, PlusIcon } from "@radix-ui/react-icons";
import Link from "next/link";

const AddEventButton = () => {
  return (
    <Link className="btn btn-circle btn-outline" href={`/events/new`}>
      <PlusIcon className="h-8 w-8" />
    </Link>
  );
};

const QuickEvents = ({ events }) => {
  const pastEvents = events.filter((event) => {
    return new Date(event.date) < new Date();
  });

  const upcomingEvents = events.filter((event) => {
    return new Date(event.date) > new Date();
  });

  const sortedByMostRecent = upcomingEvents.sort((a, b) => {
    return a.date - b.date;
  });

  const eventsToShow = sortedByMostRecent.slice(0, 3);
  return (
    <div className="bg-base-100 m-2 card card-compact">
      <div className="card-body">
        <h2 className="card-title flex flex-row justify-between">
          <span>Events</span>
          <CalendarIcon className="h-6 w-6" />
        </h2>
        <div className="card-actions">
          <div className="flex flex-row">
            <AddEventButton />
            {events &&
              eventsToShow.map((event) => {
                const dayOfEvent = new Date(event.date).getDate();
                const monthOfEvent = new Date(event.date).toLocaleString(
                  "default",
                  { month: "long" }
                );
                return (
                  <Link
                    key={event.id}
                    className="m-1 btn btn-ghost -mx-2"
                    href={`/events/${event.id}`}
                  >
                    <div className="avatar placeholder flex flex-col">
                      <div className="text-neutral-content rounded border-2 border-base-content w-14">
                        <span className="text-xl">{dayOfEvent}</span>
                      </div>
                      <span className="text-xs line-clamp-1 text-elipsis text-primary">
                        {monthOfEvent}
                      </span>
                    </div>
                  </Link>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickEvents;
