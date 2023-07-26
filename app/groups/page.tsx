import {
  ChevronLeftIcon,
  ChevronRightIcon,
  PlusIcon,
} from "@radix-ui/react-icons";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "../api/getSession";
import { getGroupsByUserId } from "../api/groups/getGroupsById";
import { LOGIN_ROUTE } from "../constants";

const GroupPage = async () => {
  const session = await getSession();
  if (!session?.user?.id) return redirect(LOGIN_ROUTE);
  const groups = await getGroupsByUserId(session?.user?.id);

  return (
    <>
      <div className="card card-compact bg-base-200 rounded-e-full w-4/5 mb-4">
        <div className="card-body">
          <div className="card-title flex flex-row justify-between">
            <div className="flex flex-row">
              <Link href="/" className="btn btn-circle bg-base-100 mr-4">
                <ChevronLeftIcon className="h-8 w-8" />
              </Link>
              <h1 className="my-auto">Your Groups</h1>
            </div>
            <Link href="/groups/create" className="btn btn-circle bg-base-100">
              <PlusIcon className="h-8 w-8" />
            </Link>
          </div>
        </div>
      </div>
      <ul>
        {groups.map((group) => (
          <li
            key={group.id}
            className="card card-compact bg-base-200 rounded-e-full w-2/3 mb-4"
          >
            <div className="card-body">
              <div className="card-title flex flex-row justify-between">
                <h1>{group.name}</h1>
                <Link
                  href={`/groups/${group.id}`}
                  className="btn btn-circle bg-base-100"
                >
                  <ChevronRightIcon className="h-8 w-8" />
                </Link>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default GroupPage;
