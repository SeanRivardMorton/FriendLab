import { usePathname, useSearchParams } from "next/navigation";

import { headers } from "next/headers";
import prisma from "../../../lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]";
import { cookies } from "next/headers";

const getProfile = async (id) => {
  if (!id) return;
  const profile = await prisma.user.findUnique({
    where: {
      id,
    },
    include: {
      friendships: true,
    },
  });

  const friendShipIds = profile?.friendships.map((friendship) => {
    return friendship.friendId;
  });

  const friends = await prisma.user.findMany({
    where: {
      id: {
        in: friendShipIds,
      },
    },
  });

  const enrichedProfile = { ...profile, friendships: friends };

  return enrichedProfile;
};

const ProfilePage = async ({ params }) => {
  const user = await getProfile(params.id[0]);

  return (
    <div className="card w-11/12 mx-auto my-4 bg-base-100 shadow-xl">
      <div className="card-body">
        <h1 className="card-title">
          <div className="h-16 w-16 ">
            {user?.image && (
              <img src={user?.image} alt="test" className="rounded-xl" />
            )}
          </div>
          <span className="ml-2">{user?.name}</span>
        </h1>
        <h2>Friends</h2>
        <div className="flex flex-col">
          {user?.friendships.map((friend) => (
            <span key={friend.id} className="flex flex-row p-1">
              <div className="h-8 w-8 rounded-xl mr-2">
                {friend?.image && (
                  <img
                    className="rounded-xl mr-2"
                    src={friend?.image}
                    alt="image"
                  />
                )}
              </div>
              {friend.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
