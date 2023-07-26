import { ChevronLeftIcon, PlusIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import getGroupsByGroupId from "../../../api/groups/getGroupsByGroupId";

const GroupMembersPage = async ({ params }) => {
  const { groupId } = params;
  const groupData = await getGroupsByGroupId(groupId);

  return (
    <>
      <div className="card card-compact bg-base-200 w-2/3 rounded-e-full mb-8">
        <div className="card-body">
          <div className="card-title flex flex-row justify-between">
            <div className="flex flex-row">
              <Link
                href={`/groups/${groupId}`}
                className="bg-base-100 btn btn-circle mr-4"
              >
                <ChevronLeftIcon className="h-8 w-8" />
              </Link>
              <h1 className="my-auto">Members</h1>
            </div>
            <button className="btn btn-circle bg-base-100">
              <PlusIcon className="h-8 w-8" />
            </button>
          </div>
        </div>
      </div>
      <ul className="h-full">
        {groupData?.members.map((member) => (
          <li key={member.id}>
            <div className="flex flex-row my-2 ml-2 justify-between">
              <div className="flex flex-row">
                <h2 className="text-2xl">{member.name}</h2>
              </div>
            </div>
            <div className="divider"></div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default GroupMembersPage;
