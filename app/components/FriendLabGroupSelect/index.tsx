"use client";
import { PlusIcon } from "@radix-ui/react-icons";
import { Groups } from "../../api/groups/getGroupsById";

interface FriendLabGroupSelectProps {
  groups: Groups[];
}

const FriendLabGroupSelect: React.FC<FriendLabGroupSelectProps> = ({
  groups,
}) => {
  return (
    <div className="card card-compact bg-base-200 rounded-e-full w-4/5">
      <div className="card-body mr-4 flex flex-row">
        <select defaultValue="All" className="select w-full max-w-xs">
          <option disabled>All</option>
          {groups?.map((group) => (
            <option key={group.id} value={group.id}>
              {group.name}
            </option>
          ))}
        </select>
        <button className="btn btn-circle bg-base-100 mx-1">
          <PlusIcon className="h-8 w-8" />
        </button>
      </div>
    </div>
  );
};

export default FriendLabGroupSelect;
