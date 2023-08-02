import { redirect } from "next/navigation";

import { getSession } from "../../../api/getSession";
import getGroupById from "../../../api/groups/getGroupById";
import { LOGIN_ROUTE } from "../../../constants";
import ClientGroupSettingsPage from "./client";

const Page = async ({ params }) => {
  const session = await getSession();
  if (!session?.user?.id) redirect(LOGIN_ROUTE);
  const { groupId } = params;

  const group = await getGroupById(groupId);

  return (
    <>
      <ClientGroupSettingsPage group={group} />
    </>
  );
};

export default Page;
