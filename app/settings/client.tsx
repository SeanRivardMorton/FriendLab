"use client";
import { ChatBubbleIcon, GearIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import React from "react";

import { UserSettings } from "../api/settings/route";
import Avatar from "../components/Avatar";
import BottomTray from "../components/BottomTray";
import ButtonTray from "../components/ButtonTray";
import { CircleButtonInset } from "../components/Form/button";
import { MultiUploader } from "../components/UploadButton";
import { UploadButton } from "../utils/uploadthing";
import SignOutButton from "./SignOutButton";
import useSettings from "./useSettings";

interface ClientSettingsProps {
  userSettings: UserSettings;
}

const ClientSettings: React.FC<ClientSettingsProps> = ({ userSettings }) => {
  const { settings, settingsForm, submitForm, isLoading, updateSettings } =
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
            {settings?.image && (
              <div className="btn-circle btn my-auto mr-4 h-16 w-16 rounded-full">
                <MultiUploader
                  endpoint="imageUploader"
                  onSuccess={(res) => {
                    if (!res?.[0]?.fileUrl) return;
                    updateSettings({ image: res?.[0].fileUrl });
                  }}
                  onError={(error: Error) => {
                    console.error(error);
                  }}
                >
                  <Avatar src={settings?.image} />
                </MultiUploader>
              </div>
            )}
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

          {/* <UploadButton
            // style={{ border: "1px solid black", backgroundColor: "white" }}
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
              // Do something with the response
              if (!res?.[0]?.fileUrl) return;
              updateSettings({ image: res?.[0].fileUrl });
            }}
            onUploadError={(error: Error) => {
              // Do something with the error.
              alert(`ERROR! ${error.message}`);
            }}
          /> */}
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
