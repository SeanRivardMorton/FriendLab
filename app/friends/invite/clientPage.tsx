"use client";
import { PaperPlaneIcon } from "@radix-ui/react-icons";
import React from "react";

import ButtonTray from "../../components/ButtonTray";
import { CircleButtonLinkInset } from "../../components/Form/button";

const ClientFriendInvitePage = ({ inviteLink }) => {
  const [copied, setCopied] = React.useState(false);
  const copyLink = () => {
    navigator.clipboard.writeText(inviteLink);
    setCopied(true);
  };

  return (
    <div className="h-fit mb-2">
      <ButtonTray
        actionSlot={
          <CircleButtonLinkInset href={`/friends/invite`}>
            <PaperPlaneIcon className="h-8 w-8" />
          </CircleButtonLinkInset>
        }
      >
        Invite Friends
      </ButtonTray>
      <form className="form-control m-2">
        <label className="label">
          <span className="label-text">Invite With Email</span>
        </label>
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered input-primary w-full"
        />
        <div className="divider">OR</div>
        <h2 className="mb-1 ml-1 text-sm">Give them this link:</h2>
        <button
          type="button"
          onClick={copyLink}
          className="btn btn-ghost bg-primary bg-opacity-10"
        >
          {inviteLink}
        </button>
        {copied && (
          <span className="mx-auto text-sm">Copied to clipboard!</span>
        )}
      </form>
    </div>
  );
};

export default ClientFriendInvitePage;
