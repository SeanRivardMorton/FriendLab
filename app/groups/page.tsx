import { PlusIcon } from "@radix-ui/react-icons";
import { redirect } from "next/navigation";
import getEventsByGroupId from "../api/events/getEventsByGroupId";
import { getSession } from "../api/getSession";
import { getGroupsByUserId } from "../api/groups/getGroupsById";
import ButtonTray from "../components/ButtonTray";
import { CircleButton } from "../components/Form/button";
import { LOGIN_ROUTE } from "../constants";
import ClientGroupPage from "./clientPage";
import GroupsList from "./GroupsList";

const GroupPage = async () => {
  const session = await getSession();
  if (!session?.user?.id) return redirect(LOGIN_ROUTE);
  const groups = await getGroupsByUserId(session?.user?.id);

  return (
    <>
      <ClientGroupPage groups={groups} />
    </>
  );
};

export default GroupPage;
