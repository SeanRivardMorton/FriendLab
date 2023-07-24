import { getServerSession } from "next-auth";
import Link from "next/link";
import prisma from "../../lib/prisma";
import { authOptions } from "../api/auth/[...nextauth]";
import { getUserFriends } from "../api/friends/getUserFriends";
import { getSession } from "../api/getSession";
import { getUserGroups } from "../api/groups/getUserGroups";
import NewGroupButton from "./NewGroupButton";

const FriendsPage = async () => {
  const session = await getSession();

  if (!session?.user?.id) {
    return <>Not logged in</>;
  }

  const friendsData = getUserFriends(session?.user?.id);
  const groupsData = getUserGroups(session?.user?.id);

  const [friends, groups] = await Promise.all([friendsData, groupsData]);

  return (
    <>
      <div className="card w-11/12 mx-auto mt-4 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Recently Active</h2>
          {friends ? (
            friends.map((friend) => (
              <div key={friend.friend.id}>{friend.friend.name}</div>
            ))
          ) : (
            <p>You have no friends</p>
          )}
        </div>
      </div>
      <div className="card w-11/12 mx-auto mt-4 bg-base-100 shadow-xl">
        <div className="card-body flex flex-col">
          <h2 className="card-title justify-start">Groups</h2>
          {groups ? (
            groups.map((group) => (
              <div key={group.id}>
                <Link className="btn btn-link" href={`/groups/${group.id}`}>
                  {group.name}
                </Link>
              </div>
            ))
          ) : (
            <p>You have no groups</p>
          )}
          <div className="card-actions mb-2">
            <NewGroupButton />
          </div>
        </div>
      </div>
      {/* <div className="card w-11/12 mx-auto mt-4 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Friends</h2>
          <p>You have no friends</p>
        </div>
      </div> */}
    </>
  );
};

export default FriendsPage;
