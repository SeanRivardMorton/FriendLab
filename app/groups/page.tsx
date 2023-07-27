import { redirect } from "next/navigation";
import { getSession } from "../api/getSession";
import { getGroupsByUserId } from "../api/groups/getGroupsById";
import { LOGIN_ROUTE } from "../constants";
import ClientGroupPage from "./clientPage";

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
