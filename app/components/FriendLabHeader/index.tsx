import {
  CalendarIcon,
  Cross1Icon,
  Pencil1Icon,
  PersonIcon,
  TrashIcon,
} from "@radix-ui/react-icons";
import Link from "next/link";

import { Event } from "../../api/events/getEventById";

interface FriendLabHeaderProps {
  event: Event;
}

const FriendLabHeader: React.FC<FriendLabHeaderProps> = ({ event }) => {
  return (
    <div className="card bg-base-200 card-compact w-fit rounded-e-full">
      <div className="m-2 flex flex-row justify-start">
        <div className="card-title ml-4 text-3xl">
          {event?.group?.name}
          <Link
            href={`/events/${event?.id}/edit`}
            className="btn btn-circle bg-base-100"
          >
            <Pencil1Icon className="h-6 w-6" />
          </Link>
          <button className="btn btn-circle bg-base-100">
            <PersonIcon className="h-8 w-6" />
          </button>
          <Link
            href={`/events/${event.id}/delete`}
            className="btn btn-circle bg-base-100"
          >
            <TrashIcon className="h-8 w-6" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FriendLabHeader;
