import { usePathname, useSearchParams } from "next/navigation";

import { headers } from "next/headers";
import prisma from "../../../lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]";

const getProfile = async (id) => {
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

const ProfilePage = async () => {
  const header = headers();
  const profileId = header.get("x-invoke-path")?.split("profile/")[1];
  const user = await getProfile(profileId);

  // console.log(user);

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
