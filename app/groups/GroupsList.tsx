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
          <div className="flex flex-row my-2 ml-2 justify-between">
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
              <div className="my-auto ml-4">
                <GroupUserAvatarsRow group={group} />
              </div>
              {/* <h2 className="text-2xl my-auto ml-4">{name}</h2> */}
            </div>
            <Link href={`/groups/${group.id}`} className="btn btn-circle mr-4">
              <ChevronRightIcon className="h-8 w-8" />
            </Link>
          </div>
          <div className="divider"></div>
        </li>
      ))}
    </ul>
  );
};

export default GroupList;
