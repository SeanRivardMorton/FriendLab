import { PlusIcon } from "@radix-ui/react-icons";
import getCurrentUserFriends from "../api/friends/getCurrentUsetFriends";
import getFriendsOfUser from "../api/friends/getFriendsOfUser";
import ButtonTray from "../components/ButtonTray";
import {
  CircleButtonInset,
  CircleButtonLinkInset,
} from "../components/Form/button";
import FriendList from "../components/FriendList";

const FriendPage = async () => {
  const friends = await getFriendsOfUser();
  return (
    <>
      <ButtonTray
        actionSlot={
          <CircleButtonLinkInset href={`/friends/invite`}>
            <PlusIcon className="h-8 w-8" />
          </CircleButtonLinkInset>
        }
      >
        <h1>Your friends</h1>
      </ButtonTray>
      <FriendList friends={friends} />
    </>
  );
};

export default FriendPage;
