import { getServerSession } from "next-auth";
import prisma from "../../lib/prisma";
import { authOptions } from "../api/auth/[...nextauth]";

const ProfilePage = async () => {
  const session = await getServerSession(authOptions);
  const user = await prisma.user.findFirst({
    where: {
      email: session?.user?.email,
    },
  });
  return (
    <div className="card w-11/12 mx-auto my-4 bg-base-100 shadow-xl">
      <div className="card-body">
        <h1 className="card-title">
          <div className="h-16 w-16 ">
            {user?.image && (
              <img src={user?.image} alt="user logo" className="rounded-xl" />
            )}
          </div>
          <span className="ml-2">{user?.name}</span>
        </h1>
      </div>
    </div>
  );
};

export default ProfilePage;
