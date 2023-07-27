import { redirect } from "next/navigation";
import { getSession } from "../../api/getSession";
import { LOGIN_ROUTE } from "../../constants";
import ClientFriendInvitePage from "./clientPage";
import HandleInvite from "./HandleInvite";

const last6Digits = (id: string) => id.slice(-6);

const InviteFriendPage = async ({ searchParams }) => {
  const { friend } = searchParams;
  if (friend) return <HandleInvite friendId={friend} />;

  const session = await getSession();
  if (!session?.user?.id) return redirect(LOGIN_ROUTE);
  const basePath = process.env.NEXTAUTH_URL?.split("/api")[0];
  const shortenedId = last6Digits(session?.user?.id);
  const link = `${basePath}/invite?friend=${shortenedId}`;
  return (
    <>
      <ClientFriendInvitePage inviteLink={link} />
    </>
  );
};

export default InviteFriendPage;
