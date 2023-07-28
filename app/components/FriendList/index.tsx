import { ChevronRightIcon, PlusIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";

const FriendList = ({ friends }) => {
  return (
    <ul>
      <div className="divider"></div>
      {friends?.map((friend) => (
        <>
          <li key={friend.id}>
            <Link
              href={`/friends/${friend.id}`}
              className="flex flex-row my-2 ml-2 justify-between"
            >
              <div className="flex flex-row">
                <div className="btn btn-circle bg-base-200">
                  <Image
                    src={friend?.image}
                    alt={friend.name}
                    height={44}
                    width={44}
                    className="rounded-full h-12 w-12"
                  />
                </div>
                <h2 className="text-2xl my-auto ml-4">{friend.name}</h2>
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
