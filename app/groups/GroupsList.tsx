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
              <div className="btn btn-circle bg-base-200">
                <Image
                  src={"/vial.svg"}
                  alt={group.name}
                  height={44}
                  width={44}
                  className="rounded-full h-12 w-12"
                />
              </div>
              <div className="my-auto ml-1">
                <GroupUserAvatarsRow group={group} />
              </div>
              <h2 className="text-2xl my-auto w-fit line-clamp-1">
                {group.name}
              </h2>
            </div>
            <button className="btn btn-circle mr-4">
              <ChevronRightIcon className="h-8 w-8" />
            </button>
          </Link>
          <div className="divider"></div>
        </li>
      ))}
    </ul>
  );
};

export default GroupList;
