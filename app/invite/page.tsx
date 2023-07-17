import { getServerSession } from "next-auth/next";
import { Suspense } from "react";
import prisma from "../../lib/prisma";
import { authOptions } from "../api/auth/[...nextauth]";
import ClientInvite from "./clientSideInvite";

const Invite = async () => {
  const session = await getServerSession(authOptions);
  const user = await prisma.user.findFirst({
    where: {
      email: session?.user?.email,
    },
  });

  if (user) {
    console.log(user);
  }

  return (
    <div>
      <Suspense fallback={<div>loading</div>}>
        <ClientInvite user={user}>Hey</ClientInvite>
      </Suspense>
    </div>
  );
};

export default Invite;
