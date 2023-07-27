import getFriendsOfUser from "../../../api/friends/getFriendsOfUser";
import getGroupsByGroupId from "../../../api/groups/getGroupsByGroupId";
import MembersList from "./MembersList";

const GroupMembersPage = async ({ params }) => {
  const { groupId } = params;

  const [group, friends] = await Promise.all([
    getGroupsByGroupId(groupId),
    getFriendsOfUser(),
  ]);

  return (
    <>
      <MembersList
        members={group?.members}
        groupId={groupId}
        friends={friends}
      />
    </>
  );
};

export default GroupMembersPage;
