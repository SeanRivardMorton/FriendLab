import { FaceIcon, PlusIcon } from "@radix-ui/react-icons";
import Link from "next/link";

const AddGroupButton = () => {
  return (
    <Link className="btn btn-circle btn-outline" href={`/groups/new`}>
      <PlusIcon className="h-8 w-8" />
    </Link>
  );
};

const QuickGroups = ({ groups }) => {
  const groupsToShow = groups.slice(0, 4);
  return (
    <div className="bg-base-100 m-2 card card-compact">
      <div className="card-body">
        <h2 className="card-title flex flex-row justify-between">
          <span>Groups</span>
          <FaceIcon className="h-6 w-6" />
        </h2>
        <div className="card-actions">
          <AddGroupButton />
          {groups &&
            groupsToShow.map((group) => {
              return (
                <Link
                  key={group.id}
                  className="m-1 btn btn-ghost -mx-2"
                  href={`/groups/${group.id}`}
                >
                  <div className="avatar placeholder flex flex-col">
                    <div className="text-neutral-content rounded-full h-12 border-2 border-base-content">
                      <span className="text-xl">{group.name.slice(0, 1)}</span>
                    </div>
                    <span className="w-10 text-xs line-clamp-1 text-elipsis text-primary">
                      {group.name}
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

export default QuickGroups;
