import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import prisma from "../../../lib/prisma";
import { getUserFriends } from "../../api/friends/getUserFriends";
import { getSession } from "../../api/getSession";
import { getGroupById } from "../../api/groups/getGroupById";
import { LOGIN_ROUTE } from "../../constants";
import FriendsList from "../../friends/components/FriendsList";
import DeleteGroupButton from "../components/DeleteGroupButton";

const GroupPage = async ({ params }) => {
  const groupId = params.groupId[0];
  const session = await getSession();

  if (!session?.user?.id) {
    redirect(LOGIN_ROUTE);
  }

  const groupData = getGroupById(groupId);
  const friendData = getUserFriends(session?.user?.id);

  const [group, friendships] = await Promise.all([groupData, friendData]);
  const friends = friendships.map((friendship) => friendship.friend);

  return (
    <div className="card card-compact">
      <div className="card-body">
        <h2 className="card-title flex flex-row justify-between">
          <span>
            {group?.name} ({group?.members.length})
          </span>
          <DeleteGroupButton groupId={groupId} />
        </h2>
        <Link href={`/profile/${group?.creator.id}`} className="avatar my-2">
          <div className="h-11 mx-1 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
            {group?.creator.image && (
              <Image
                height={44}
                width={44}
                src={group?.creator.image}
                alt={`${group?.creator.name}'s logo`}
              />
            )}
          </div>
          <span className="ml-4">{group?.creator.name}</span>
        </Link>
        <h3>Members:</h3>
        <FriendsList friends={group?.members} />
      </div>
    </div>
  );
};

export default GroupPage;
