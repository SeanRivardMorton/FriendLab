"use client";
import { PlusIcon } from "@radix-ui/react-icons";
import React from "react";
import ButtonTray from "../components/ButtonTray";
import { CircleButtonLinkInset } from "../components/Form/button";
import GroupsList from "./GroupsList";

const ClientGroupPage = (props) => {
  const [groups, setGroups] = React.useState(props.groups);

  return (
    <>
      <ButtonTray
        href="/"
        actionSlot={
          <CircleButtonLinkInset href="/groups/create">
            <PlusIcon className="h-8 w-8" />
          </CircleButtonLinkInset>
        }
      >
        <h1>Your Groups</h1>
      </ButtonTray>
      <GroupsList groups={groups} />
    </>
  );
};

export default ClientGroupPage;
