import getFriendsOfUser from "../../../api/friends/getFriendsOfUser";
import getGroupsByGroupId from "../../../api/groups/getGroupsByGroupId";
import MembersList from "./MembersList";

const getFriendsNotInGroup = (friends, members) => {
  const friendIds = friends?.map((friend) => friend?.id);
  const memberIds = members?.map((member) => member?.id);
  const ids = friendIds?.filter((id) => !memberIds?.includes(id));
  return friends?.filter((friend) => ids?.includes(friend?.id));
};

const GroupMembersPage = async ({ params }) => {
  const { groupId } = params;
  const groupData = getGroupsByGroupId(groupId);
  const friendsData = getFriendsOfUser();

  const [group, friends] = await Promise.all([groupData, friendsData]);

  const friendsNotInGroup = getFriendsNotInGroup(friends, group?.members);

  return (
    <>
      <MembersList
        members={group?.members}
        groupId={groupId}
        friends={friendsNotInGroup}
      />
    </>
  );
};

export default GroupMembersPage;
