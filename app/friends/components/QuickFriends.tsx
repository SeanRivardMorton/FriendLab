import { PlusIcon } from "@radix-ui/react-icons";
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

const QuickFriends = ({ friends }) => {
  const groupsToShow = friends.slice(0, 4);

  return (
    <div className="bg-base-100 m-2 card card-compact">
      <div className="card-body">
        <h2 className="card-title">Friends</h2>
        <div className="card-actions">
          <AddGroupButton />
          {friends &&
            groupsToShow.map((friendShip) => {
              return (
                <Link
                  key={friendShip.friend.id}
                  className="m-1"
                  href={`/profile/${friendShip.friend.id}`}
                >
                  <div className="avatar">
                    <div className="h-11 mx-1 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                      <img
                        src={friendShip.friend.image}
                        alt={`${friendShip.friend.name}'s logo`}
                      />
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
