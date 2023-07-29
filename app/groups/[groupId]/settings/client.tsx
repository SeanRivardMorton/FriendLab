"use client";

import { CheckIcon, TrashIcon } from "@radix-ui/react-icons";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React from "react";
import BottomTray from "../../../components/BottomTray";
import ButtonTray from "../../../components/ButtonTray";
import DeleteButton from "../../../components/DeleteButton.tsx";
import { CircleButtonInset } from "../../../components/Form/button";
import GroupSettingsForm from "./GroupSettingsForm";

const deleteEvent = async (id) => {
  return fetch(`/api/groups/${id}`, {
    method: "DELETE",
  });
};

const ClientGroupSettingsPage = ({ group }) => {
  const router = useRouter();
  const deleteGroupQuery = useMutation({
    mutationFn: deleteEvent,
    onSuccess: () => {
      router.push("/");
    },
  });
  return (
    <div className="flex flex-col justify-between">
      <ButtonTray href={`/groups/${group?.id}`} actionSlot={<></>}>
        <h1>Edit {group?.name} Group</h1>
      </ButtonTray>
      <GroupSettingsForm group={group} />
      <BottomTray>
        <DeleteButton
          returnUrl="/groups"
          deleteUrl={`/api/groups/${group.id}`}
        />
      </BottomTray>
    </div>
  );
};

export default ClientGroupSettingsPage;
