import { PlusIcon } from "@radix-ui/react-icons";
import getCurrentUserFriends from "../api/friends/getCurrentUsetFriends";
import getFriendsOfUser from "../api/friends/getFriendsOfUser";
import ButtonTray from "../components/ButtonTray";
import FriendList from "../components/FriendList";

const FriendPage = async () => {
  const friends = await getFriendsOfUser();

  return (
    <>
      <ButtonTray>
        <h1>Your Friends</h1>
      </ButtonTray>
      <FriendList friends={friends} />
    </>
  );
};

export default FriendPage;
