import { Pencil1Icon, PersonIcon } from "@radix-ui/react-icons";
import Link from "next/link";

const GroupControls = ({ groupId }) => {
  return (
    <div className="flex flex-row justify-end">
      <div className="card card-compact bg-base-200 w-2/3 rounded-l-full">
        <div className="card-body">
          <div className="card-title">
            <Link
              href={`/groups/${groupId}/settings`}
              className="btn btn-circle bg-base-100"
            >
              <Pencil1Icon className="h-8 w-8" />
            </Link>
            <Link
              href={`/groups/${groupId}/members`}
              className="btn btn-circle bg-base-100"
            >
              <PersonIcon className="h-8 w-8" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupControls;
