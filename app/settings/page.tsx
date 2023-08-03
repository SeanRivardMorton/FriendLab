import { redirect } from "next/navigation";

import { getSession } from "../api/getSession";
import getUser from "../api/user/getUser";
import { LOGIN_ROUTE } from "../constants";
import ClientSettings from "./client";

const SettingsPage = async () => {
  const session = await getSession();
  if (!session?.user) redirect(LOGIN_ROUTE);
  const settings = await getUser(session?.user?.id);
  if (!session?.user?.id) redirect(LOGIN_ROUTE);
  return (
    <>
      <ClientSettings userSettings={settings} />
    </>
  );
};

export default SettingsPage;
