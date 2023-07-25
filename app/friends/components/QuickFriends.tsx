import { PersonIcon, PlusIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import Image from "next/image";

const AddGroupButton = () => {
  return (
    <Link className="btn btn-circle btn-outline" href={`/friends/invite`}>
      <PlusIcon className="h-8 w-8" />
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
                  className="m-1 btn btn-ghost -mx-2"
                  href={`/profile/${friend.id}`}
                >
                  <div className="avatar flex flex-col">
                    <div className="h-11 mx-1 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                      {friend?.image && (
                        <Image
                          width={44}
                          height={44}
                          src={friend.image}
                          alt={`${friend.name}'s logo`}
                        />
                      )}
                    </div>
                    <span className="w-10 text-xs line-clamp-1 text-elipsis text-primary mt-1">
                      {friend.name}
                    </span>
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
