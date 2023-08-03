import { ChevronRightIcon, PlusIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";

import Avatar from "../Avatar";

const FriendList = ({ friends }) => {
  return (
    <ul>
      <div className="divider"></div>
      {friends?.map((friend) => (
        <>
          <li key={friend.id}>
            <Link
              href={`/friends/${friend.id}`}
              className="my-2 ml-2 flex flex-row justify-between"
            >
              <div className="ml-2 flex flex-row">
                <div className="btn-circle btn rounded-full bg-base-200">
                  <Avatar src={friend?.image} />
                </div>
                <h2 className="my-auto ml-4 text-2xl">{friend.name}</h2>
              </div>
              <div className="my-auto mr-2">
                <ChevronRightIcon className="h-8 w-8" />
              </div>
            </Link>
          </li>
          <div className="divider"></div>
        </>
      ))}
    </ul>
  );
};

export default FriendList;
