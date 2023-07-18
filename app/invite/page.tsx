import { getServerSession } from "next-auth/next";
import { Suspense } from "react";
import prisma from "../../lib/prisma";
import { authOptions } from "../api/auth/[...nextauth]";
import ClientInvite from "./clientSideInvite";
import SignInButton from "./SignInButton";

const Invite = async () => {
  const session = await getServerSession(authOptions);
  const user = await prisma.user.findFirst({
    where: {
      email: session?.user?.email,
    },
  });

  if (!session) {
    return (
      <Suspense fallback={<div>loading</div>}>
        <ClientInvite user={user}>
          <div className="card w-11/12 mx-auto mt-4 bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">Welcome to Friend Lab!</h2>
              <p>Create new Account</p>
              <SignInButton />
            </div>
          </div>
        </ClientInvite>
      </Suspense>
    );
  }

  return (
    <Suspense fallback={<div>loading</div>}>
      <ClientInvite user={user}>
        <div className="card w-11/12 mx-auto mt-4 bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Welcome to Friend Lab!</h2>
            <p>You&apos;ve just followed a link from a friend</p>
          </div>
        </div>
      </ClientInvite>
    </Suspense>
  );
};

export default Invite;
