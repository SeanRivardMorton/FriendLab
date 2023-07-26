import {
  ChevronLeftIcon,
  ChevronRightIcon,
  PlusIcon,
  RocketIcon,
} from "@radix-ui/react-icons";
import Link from "next/link";
import getEventsByGroupId from "../../api/events/getEventsByGroupId";
import getGroupsByGroupId from "../../api/groups/getGroupsByGroupId";

const GroupPage = async ({ params }) => {
  const { groupId } = params;
  const groupData = getGroupsByGroupId(groupId);
  const groupEventsData = getEventsByGroupId(groupId);

  const [group, groupEvents] = await Promise.all([groupData, groupEventsData]);

  return (
    <>
      <div className="card card-compact bg-base-200 rounded-e-full w-3/4 mb-8">
        <div className="card-body">
          <div className="card-title flex flex-row justify-between">
            <div className="flex flex-row">
              <Link href="/groups" className="btn btn-circle bg-base-100 mr-4">
                <ChevronLeftIcon className="h-8 w-8" />
              </Link>
              <h1 className="my-auto">{group?.name}</h1>
            </div>
            <Link href="/" className="btn btn-circle bg-base-100">
              <PlusIcon className="h-8 w-8" />
            </Link>
          </div>
        </div>
      </div>
      <ul>
        {groupEvents.map((event) => (
          <li key={event.id}>
            <Link
              href={`/events/${event.id}`}
              className="flex flex-row my-2 ml-2 justify-between"
            >
              <div className="flex flex-row">
                <RocketIcon className="h-8 w-8 mr-2" />
                <h2 className="text-2xl">{event.name}</h2>
              </div>
              <ChevronRightIcon className="h-8 w-8" />
            </Link>
            <div className="divider"></div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default GroupPage;
