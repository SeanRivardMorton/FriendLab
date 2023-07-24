import { PersonIcon, PlusIcon } from "@radix-ui/react-icons";
import Link from "next/link";

const AddGroupButton = () => {
  return (
    <Link className="m-1" href={`/groups/new`}>
      <div className="avatar placeholder flex flex-col">
        <div className="text-neutral-content rounded-full h-12 border-2 border-base-content">
          <span className="text-xl">
            <PlusIcon />
          </span>
        </div>
        <span className="w-8 text-xs text-elipsis m-auto text-primary">
          Add
        </span>
      </div>
    </Link>
  );
};

const QuickFriends = ({ friends, options = { add: true } }) => {
  const groupsToShow = friends.slice(0, 3);
  return (
    <div className="bg-base-100 m-2 card card-compact">
      <div className="card-body">
        <h2 className="card-title flex flex-row justify-between">
          <span>Friends</span>
          <PersonIcon className="w-6 h-6" />
        </h2>
        <div className="card-actions">
          {options.add && <AddGroupButton />}
          {friends &&
            groupsToShow.map((friend) => {
              return (
                <Link
                  key={friend.id}
                  className="m-1"
                  href={`/profile/${friend.id}`}
                >
                  <div className="avatar">
                    <div className="h-11 mx-1 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                      <img src={friend.image} alt={`${friend.name}'s logo`} />
                    </div>
                  </div>
                </Link>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default QuickFriends;
