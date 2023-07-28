import { PlusIcon } from "@radix-ui/react-icons";
import { redirect } from "next/navigation";
import { getSession } from "../../api/getSession";
import { LOGIN_ROUTE } from "../../constants";
import CreateEventForm from "./CreateEventForm";

const CreatePage = async ({ searchParams }) => {
  const { gId } = searchParams;
  const session = await getSession();
  if (!session?.user?.id) redirect(LOGIN_ROUTE);

  return (
    <>
      <div className="card card-compact bg-base-200 w-2/3 rounded-e-full">
        <div className="card-body">
          <div className="card-title flex flex-row justify-between">
            <h1>Create An Event</h1>
            <button className="btn btn-circle bg-base-100">
              <PlusIcon className="h-8 w-8" />
            </button>
          </div>
        </div>
      </div>
      <CreateEventForm groupId={gId} />
    </>
  );
};

export default CreatePage;
