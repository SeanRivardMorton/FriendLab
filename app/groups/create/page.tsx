import getFriendsOfUser from "../../api/friends/getFriendsOfUser";
import ClientGroupCreatePage from "./clientPage";

const Page = async () => {
  const friends = await getFriendsOfUser();
  return (
    <>
      <ClientGroupCreatePage friends={friends} />
    </>
  );
};

export default Page;
