import { ChatBubbleIcon, GearIcon } from "@radix-ui/react-icons";
import { redirect } from "next/navigation";

import { getSession } from "../api/getSession";
import BottomTray from "../components/BottomTray";
import ButtonTray from "../components/ButtonTray";
import { CircleButtonInset } from "../components/Form/button";
import { LOGIN_ROUTE } from "../constants";
import SettingsForm from "./settingsform";
import SignOutButton from "./SignOutButton";

const SettingsPage = async () => {
  const session = await getSession();
  if (!session?.user?.id) redirect(LOGIN_ROUTE);
  return (
    <>
      <ButtonTray
        href="/"
        actionSlot={
          <>
            <GearIcon className="h-8 w-8" />
          </>
        }
      >
        <h2>Settings</h2>
      </ButtonTray>
      <SettingsForm />
      <BottomTray>
        <CircleButtonInset>
          <ChatBubbleIcon className="h-8 w-8" />
        </CircleButtonInset>
        <SignOutButton />
      </BottomTray>
    </>
  );
};

export default SettingsPage;

// <div className="flex flex-col justify-between h-[80vh]">
//   <div className="card card-compact">
//     <div className="card-body justify-between">
//       <div>
//         <div className="flex flex-row ">
//           <GearIcon className="h-6 w-6" />
//           <h2 className="card-title">Settings</h2>
//         </div>
//         <SettingsForm />
//       </div>
//     </div>
//   </div>
//   <SignOutButton />
// </div>
