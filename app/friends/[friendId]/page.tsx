import getUser from "../../api/user/getUser";
import ButtonTray from "../../components/ButtonTray";
import Image from "next/image";
import getFriendsOfUser from "../../api/friends/getFriendsOfUser";
import getCurrentUserFriends from "../../api/friends/getCurrentUsetFriends";
import FriendList from "../../components/FriendList";

const FriendPage = async ({ params }) => {
  const { friendId } = params;
  const friend = await getUser(friendId);
  if (!friend) return <>This user does not exist</>;
  const friendsOfFriend = await getCurrentUserFriends(friendId);
  return (
    <>
      <ButtonTray
        href="/friends"
        actionSlot={
          <button className="btn btn-circle bg-base-100">
            {friend?.image && (
              <Image
                src={friend?.image}
                alt="user image"
                className="rounded-full h-10 w-10"
                width={24}
                height={24}
              />
            )}
          </button>
        }
      >
        <h1>{friend.name}</h1>
      </ButtonTray>
      <FriendList friends={friendsOfFriend} />
    </>
  );
};

export default FriendPage;
