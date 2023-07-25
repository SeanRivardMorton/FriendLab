import { getUserFriends } from "../../api/friends/getUserFriends";
import { getSession } from "../../api/getSession";
import NewGroupForm from "./components/NewGroupForm";

const NewGroup = async () => {
  const session = await getSession();
  if (!session?.user?.id) {
    return <div>loading...</div>;
  }
  const friendships = await getUserFriends(session?.user?.id);
  const friends = friendships.map((friendship) => friendship.friend);

  return (
    <div className="card card-compact">
      <div className="card-body">
        <div className="card-title">Create Group</div>
        <div className="card-actions">
          <NewGroupForm friends={friends} />
        </div>
      </div>
    </div>
  );
};

export default NewGroup;
