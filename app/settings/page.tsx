"use client";
import { ExitIcon, GearIcon } from "@radix-ui/react-icons";
import { signOut } from "next-auth/react";
import SettingsForm from "./settingsform";

const SettingsPage = () => {
  return (
    <div className="card card-compact">
      <div className="card-body justify-between h-[90vh]">
        <div>
          <div className="flex flex-row ">
            <GearIcon className="h-6 w-6" />
            <h2 className="card-title">Settings</h2>
          </div>
          <SettingsForm />
        </div>
        <button className="btn btn-error">
          Logout
          <ExitIcon onClick={() => signOut()} className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
};

export default SettingsPage;
