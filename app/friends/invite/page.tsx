import { redirect } from "next/navigation";

import { getSession } from "../../api/getSession";
import { LOGIN_ROUTE } from "../../constants";
import ClientFriendInvitePage from "./clientPage";
import HandleInvite from "./HandleInvite";

const last6Digits = (id: string) => id.slice(-6);

const InviteFriendPage = async ({ searchParams }) => {
  const { friend } = searchParams;
  const asyncComponent: JSX.Element = await HandleInvite({
    friendId: friend?.id,
  });
  if (friend) return asyncComponent;
  const session = await getSession();
  if (session?.user?.id === friend?.id) return redirect(LOGIN_ROUTE);

  if (!session?.user?.id) return redirect(LOGIN_ROUTE);
  const basePath =
    process.env.NEXTAUTH_URL?.split("/api")[0] || "https://friendlab.co.uk";
  const shortenedId = last6Digits(session?.user?.id);
  const link = `${basePath}/friends/invite?friend=${shortenedId}`;
  return (
    <>
      <ClientFriendInvitePage inviteLink={link} />
    </>
  );
};

export default InviteFriendPage;
