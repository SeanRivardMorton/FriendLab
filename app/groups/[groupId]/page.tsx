import {
  ChevronRightIcon,
  PlusIcon,
  RocketIcon,
  Pencil1Icon,
  PersonIcon,
} from "@radix-ui/react-icons";

import Link from "next/link";
import { redirect } from "next/navigation";
import getEventsByGroupId from "../../api/events/getEventsByGroupId";
import { getSession } from "../../api/getSession";
import getGroupsByGroupId from "../../api/groups/getGroupsByGroupId";
import BottomTray from "../../components/BottomTray";
import ButtonTray from "../../components/ButtonTray";
import { LOGIN_ROUTE } from "../../constants";
import GroupUserAvatarsRow from "../GroupUserAvatarRow";

const GroupPage = async ({ params }) => {
  const session = await getSession();
  if (!session?.user?.id) redirect(LOGIN_ROUTE);

  const { groupId } = params;
  const groupData = getGroupsByGroupId(groupId);
  const groupEventsData = getEventsByGroupId(groupId);

  const [group, groupEvents] = await Promise.all([groupData, groupEventsData]);

  return (
    <div className="flex flex-col justify-between h-[87vh]">
      <ButtonTray
        href="/groups"
        actionSlot={
          <Link
            href={`/events/create?gId=${groupId}`}
            className="btn btn-circle bg-base-100"
          >
            <PlusIcon className="h-8 w-8" />
          </Link>
        }
      >
        <div className="my-auto">
          <GroupUserAvatarsRow group={group} />
        </div>
      </ButtonTray>
      <div className="divider"></div>
      <ul className="h-full">
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
      <BottomTray>
        <Link
          href={`/groups/${groupId}/settings`}
          className="btn btn-circle bg-base-100"
        >
          <Pencil1Icon className="h-8 w-8" />
        </Link>
        <Link
          href={`/groups/${groupId}/members`}
          className="btn btn-circle bg-base-100"
        >
          <PersonIcon className="h-8 w-8" />
        </Link>
      </BottomTray>
    </div>
  );
};

export default GroupPage;
