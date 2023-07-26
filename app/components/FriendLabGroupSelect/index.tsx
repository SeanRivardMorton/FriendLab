"use client";
import { ArrowRightIcon, PlusIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";
import { Groups } from "../../api/groups/getGroupsById";

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
    <div className="card card-compact bg-base-200 rounded-e-full w-4/5">
      <form className="card-body mr-4 flex flex-row">
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
        <Link
          href={groupName === "All" ? "/groups" : `/groups/${groupName}`}
          className="btn btn-circle bg-base-100 mx-1"
        >
          <ArrowRightIcon className="h-8 w-8" />
        </Link>
      </form>
    </div>
  );
};

export default FriendLabGroupSelect;
