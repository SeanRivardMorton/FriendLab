import { PlusIcon } from "@radix-ui/react-icons";
import { getSession } from "../../api/getSession";
import CreateEventForm from "./CreateEventForm";

const CreatePage = async () => {
  // const session = await getSession();
  // const groups = await getGroupsByUserId(session?.user?.id);
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
      <CreateEventForm />
    </>
  );
};

export default CreatePage;
