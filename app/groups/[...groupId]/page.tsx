import prisma from "../../../lib/prisma";
import { headers } from "next/headers";
import AddUserToGroupButton from "./addUserToGroupSelect";

const getGroup = async (groupId) => {
  const group = await prisma.group.findFirst({
    where: {
      id: groupId,
    },
    include: {
      members: true,
    },
  });

  return group;
};

const getFriendsOfUser = async (userId) => {
  const friends = await prisma.friendship.findMany({
    where: {
      userId: userId,
    },
    include: {
      friend: true,
    },
  });

  return friends;
};

const GroupPage = async ({ params }) => {
  const groupId = params.groupId[0];
  const group = await getGroup(groupId);
  const friends = group?.id && (await getFriendsOfUser(group?.creatorId));

  return (
    <div className="card w-11/12 mx-auto my-4 bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">{group?.name}</h2>
        <h3 className="text-xl">Members</h3>
        {group?.members.map((member) => (
          <div key={member.id}>{member.name}</div>
        ))}
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text text-primary">
              Add a friend to the group
            </span>
          </label>
          <AddUserToGroupButton friends={friends} groupId={group?.id} />
        </div>
      </div>
    </div>
  );
};

export default GroupPage;
