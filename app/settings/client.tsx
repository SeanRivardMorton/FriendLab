"use client";
import { ChatBubbleIcon, GearIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import React from "react";

import { UserSettings } from "../api/settings/route";
import BottomTray from "../components/BottomTray";
import ButtonTray from "../components/ButtonTray";
import { CircleButtonInset } from "../components/Form/button";
import SignOutButton from "./SignOutButton";
import useSettings from "./useSettings";

interface ClientSettingsProps {
  userSettings: UserSettings;
}

const ClientSettings: React.FC<ClientSettingsProps> = ({ userSettings }) => {
  const { settings, settingsForm, submitForm, isLoading } =
    useSettings(userSettings);

  return (
    <>
      <ButtonTray
        href="/"
        actionSlot={
          <>
            <GearIcon className="h-8 w-8" />
          </>
        }
        secondarySlot={
          <>
            {isLoading && (
              <span className="loading loading-spinner loading-md"></span>
            )}
          </>
        }
      >
        <h2>Settings</h2>
      </ButtonTray>
      <form onBlur={submitForm} className="card card-compact">
        <div className="card-body">
          <div className="flex flex-row">
            <div className="avatar">
              <div className="my-auto mr-4 h-12 w-12 rounded-xl">
                {settings?.image && (
                  <Image
                    src={settings?.image}
                    alt="user"
                    height={22}
                    width={22}
                  />
                )}
              </div>
            </div>
            <div className="flex flex-col">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Update your name</span>
                </label>
                <input
                  type="text"
                  {...settingsForm.register("name")}
                  defaultValue={settings?.name || undefined}
                  placeholder="Type here"
                  className="input-bordered input w-full max-w-xs"
                />
              </div>

              <div className="prose">
                <p>{settings?.email}</p>
              </div>
            </div>
          </div>
        </div>
      </form>
      <BottomTray>
        <CircleButtonInset>
          <ChatBubbleIcon className="h-8 w-8" />
        </CircleButtonInset>
        <SignOutButton />
      </BottomTray>
    </>
  );
};

export default ClientSettings;
