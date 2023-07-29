import {
  CheckIcon,
  ChevronLeftIcon,
  GearIcon,
  Pencil1Icon,
  PlusIcon,
  TrashIcon,
} from "@radix-ui/react-icons";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "../../../api/getSession";
import getGroupById from "../../../api/groups/getGroupById";
import BottomTray from "../../../components/BottomTray";
import ButtonTray from "../../../components/ButtonTray";
import { CircleButtonInset } from "../../../components/Form/button";
import { LOGIN_ROUTE } from "../../../constants";
import GroupSettingsActionsBar from "./GroupSettingsActionBar";
import GroupSettingsForm from "./GroupSettingsForm";

const Page = async ({ params }) => {
  const session = await getSession();
  if (!session?.user?.id) redirect(LOGIN_ROUTE);
  const { groupId } = params;

  const group = await getGroupById(groupId);

  return (
    <div className="flex flex-col justify-between">
      <ButtonTray
        href={`/groups/${group?.id}`}
        actionSlot={
          <CircleButtonInset>
            <CheckIcon className="w-8 h-7 text-success" />
          </CircleButtonInset>
        }
      >
        <h1>Edit {group?.name} Group</h1>
      </ButtonTray>
      <GroupSettingsForm group={group} />
      <BottomTray>
        <CircleButtonInset>
          <TrashIcon className="w-8 h-8 text-error" />
        </CircleButtonInset>
      </BottomTray>
    </div>
  );
};

export default Page;
