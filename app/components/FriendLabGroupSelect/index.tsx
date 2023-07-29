"use client";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";
import { Groups } from "../../api/groups/getGroupsById";
import ButtonTray from "../ButtonTray";

interface FriendLabGroupSelectProps {
  groups: Groups[];
}

const FriendLabGroupSelect: React.FC<FriendLabGroupSelectProps> = ({
  groups,
}) => {
  const form = useForm({
    defaultValues: {
      groupName: "All",
    },
  });

  const groupName = form.watch("groupName");

  return (
    <form>
      <ButtonTray
        actionSlot={
          <Link
            href={groupName === "All" ? "/groups" : `/groups/${groupName}`}
            className="btn btn-circle bg-base-100 mx-1"
          >
            <ArrowRightIcon
              aria-label="link to see groups"
              className="h-8 w-8"
            />
          </Link>
        }
      >
        <select
          {...form.register("groupName")}
          className="select w-full max-w-xs"
        >
          <option value="All">All Groups</option>
          {groups?.map((group) => (
            <option key={group.id} value={group.id}>
              {group.name}
            </option>
          ))}
        </select>
      </ButtonTray>
    </form>
  );
};

export default FriendLabGroupSelect;
