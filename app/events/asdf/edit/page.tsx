import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { redirect } from "next/navigation";
import getEventById from "../../../api/events/getEventById";
import { getSession } from "../../../api/getSession";
import { getGroupsByUserId } from "../../../api/groups/getGroupsById";
import { LOGIN_ROUTE } from "../../../constants";
// import EditEventPageForm from "./EditEventPageForm";

const EditEventPage = async ({ params }) => {
  const session = await getSession();
  if (!session?.user?.id) return redirect(LOGIN_ROUTE);
  const { id } = params;
  const eventData = getEventById(id);
  const groupData = getGroupsByUserId(session?.user?.id);

  const [event, groups] = await Promise.all([eventData, groupData]);

  return (
    <div className="card card-compact">
      <div className="card-body">
        <div className="card-title flex flex-row">
          <Link className="btn btn-circle" href={`/events/${id}`}>
            <ArrowLeftIcon className="h-6 w-6" />
          </Link>
          <h2>Edit Event</h2>
        </div>
        {/* <div className="card-actions">
          {event && <EditEventPageForm event={event} groups={groups} />}
        </div> */}
      </div>
    </div>
  );
};

export default EditEventPage;
