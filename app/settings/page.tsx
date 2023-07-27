import { GearIcon } from "@radix-ui/react-icons";
import { getSession } from "../api/getSession";
import { redirect } from "next/navigation";
import { LOGIN_ROUTE } from "../constants";
import SettingsForm from "./settingsform";
import SignOutButton from "./SignOutButton";

const SettingsPage = async () => {
  const session = await getSession();
  if (!session?.user?.id) redirect(LOGIN_ROUTE);
  return (
    <div className="flex flex-col justify-between h-[80vh]">
      <div className="card card-compact">
        <div className="card-body justify-between">
          <div>
            <div className="flex flex-row ">
              <GearIcon className="h-6 w-6" />
              <h2 className="card-title">Settings</h2>
            </div>
            <SettingsForm />
          </div>
        </div>
      </div>
      <SignOutButton />
    </div>
  );
};

export default SettingsPage;
