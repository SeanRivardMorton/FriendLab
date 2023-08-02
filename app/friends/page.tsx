import { PlusIcon } from "@radix-ui/react-icons";
import { redirect } from "next/navigation";

import getCurrentUserFriends from "../api/friends/getCurrentUsetFriends";
import getFriendsOfUser from "../api/friends/getFriendsOfUser";
import { getSession } from "../api/getSession";
import ButtonTray from "../components/ButtonTray";
import {
  CircleButtonInset,
  CircleButtonLinkInset,
} from "../components/Form/button";
import FriendList from "../components/FriendList";
import { LOGIN_ROUTE } from "../constants";

const FriendPage = async () => {
  const session = await getSession();
  if (!session?.user?.id) redirect(LOGIN_ROUTE);
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
