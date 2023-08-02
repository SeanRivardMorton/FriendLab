import { ChevronRightIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";

import GroupUserAvatarsRow from "./GroupUserAvatarRow";

const GroupList = ({ groups }) => {
  return (
    <ul>
      <div className="divider"></div>
      {groups?.map((group) => (
        <li key={group.id}>
          <Link
            href={`/groups/${group.id}`}
            className="flex flex-row my-2 ml-2 justify-between"
          >
            <div className="flex flex-row">
              <div className="my-auto ml-2">
                <GroupUserAvatarsRow group={group} />
              </div>
              <h2 className="text-2xl my-auto w-fit line-clamp-1">
                {group.name}
              </h2>
            </div>
            <div className=" mr-4">
              <ChevronRightIcon className="h-8 w-8" />
            </div>
          </Link>
          <div className="divider"></div>
        </li>
      ))}
    </ul>
  );
};

export default GroupList;
