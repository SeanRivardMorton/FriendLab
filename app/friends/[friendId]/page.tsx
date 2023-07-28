import getUser from "../../api/user/getUser";
import getCurrentUserFriends from "../../api/friends/getCurrentUsetFriends";
import { redirect } from "next/navigation";
import { LOGIN_ROUTE } from "../../constants";
import { getSession } from "../../api/getSession";
import ClientFriendPage from "./client";

const FriendPage = async ({ params }) => {
  const session = await getSession();
  if (!session?.user?.id) redirect(LOGIN_ROUTE);
  const { friendId } = params;
  const friend = await getUser(friendId);
  if (!friend) return <>This user does not exist</>;
  const friendsOfFriend = await getCurrentUserFriends(friendId);

  const isFriend = friendsOfFriend.find(
    (friendOfFriend) => friendOfFriend.id === session?.user?.id
  );

  return (
    <>
      <ClientFriendPage
        friend={friend}
        friendsOfFriend={friendsOfFriend}
        isFriend={!!isFriend}
      />
    </>
  );
};

export default FriendPage;
