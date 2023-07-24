import { PlusIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import prisma from "../../../lib/prisma";
import { getSession } from "../../api/getSession";
import { getUserGroups } from "../../api/groups/getUserGroups";

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

const QuickGroups = async () => {
  const session = await getSession();
  if (!session?.user?.id) {
    return <>Not logged in</>;
  }
  const groups = await getUserGroups(session?.user?.id);

  // first 3 groups only
  const groupsToShow = groups.slice(0, 5);
  return (
    <div className="bg-base-100 m-2 card card-compact">
      <div className="card-body">
        <h2 className="card-title">Groups</h2>
        <div className="card-actions">
          <div className="flex flex-row h-18 overflow-auto w-fit">
            <AddGroupButton />
            {groups &&
              groupsToShow.map((group) => {
                return (
                  <Link
                    key={group.id}
                    className="m-1"
                    href={`/groups/${group.id}`}
                  >
                    <div className="avatar placeholder flex flex-col">
                      <div className="text-neutral-content rounded-full h-12 border-2 border-base-content">
                        <span className="text-xl">
                          {group.name.slice(0, 1)}
                        </span>
                      </div>
                      <span className="w-12 text-xs line-clamp-1 truncate text-primary">
                        {group.name}
                      </span>
                    </div>
                  </Link>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickGroups;
