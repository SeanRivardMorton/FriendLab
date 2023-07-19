import { getServerSession } from "next-auth";
import prisma from "../../../lib/prisma";
import { authOptions } from "../../api/auth/[...nextauth]";
import CopyLink from "../../components/CopyLink";
import ClientProtectedPage from "../../protected/client/page";

const FriendInvitePage = async () => {
  const session = await getServerSession(authOptions);
  const user = await prisma.user.findFirst({
    where: {
      email: session?.user?.email,
    },
  });
  const baseUrl =
    process.env.NEXTAUTH_URL || "https://friendlab.co.uk/api/auth/signin";

  const url = baseUrl.replace("api/auth/signin", "invite");
  const link = user ? `${url}?ref=${user.id.slice(-6)}` : url;

  return (
    <ClientProtectedPage>
      <div className="card w-11/12 mx-auto mt-4 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Invite Friends to Friend Lab</h2>
          <p>Share this link with your friends</p>
          <p className="border-2 rounded border-spacing-2 p-1 border-primary">
            {link}
          </p>
          <CopyLink link={link}></CopyLink>
        </div>
      </div>
    </ClientProtectedPage>
  );
};

export default FriendInvitePage;
