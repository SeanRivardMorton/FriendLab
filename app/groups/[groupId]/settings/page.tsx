import { ChevronLeftIcon, GearIcon, PlusIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import getGroupById from "../../../api/groups/getGroupById";
import GroupSettingsActionsBar from "./GroupSettingsActionBar";
import GroupSettingsForm from "./GroupSettingsForm";

const Page = async ({ params }) => {
  const { groupId } = params;

  const group = await getGroupById(groupId);

  return (
    <div className="flex flex-col justify-between">
      <div className="h-[75vh]">
        <div className="card card-compact bg-base-200 w-3/4 rounded-e-full">
          <div className="card-body">
            <div className="card-title flex flex-row justify-between">
              <div className="flex flex-row">
                <Link
                  href={`/groups/${groupId}`}
                  className="btn btn-circle bg-base-100 mr-4"
                >
                  <ChevronLeftIcon className="h-8 w-8" />
                </Link>
                <h1 className="my-auto">{group?.name}</h1>
              </div>
              <button className="btn btn-circle bg-base-100">
                <GearIcon className={"h-8 w-8"} />
              </button>
            </div>
          </div>
        </div>
        <GroupSettingsForm group={group} />
      </div>
      <div className="w-full flex flex-row justify-end">
        <GroupSettingsActionsBar groupId={groupId} />
      </div>
    </div>
  );
};

export default Page;
