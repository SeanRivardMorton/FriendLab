import { createDropdownMenuScope } from "@radix-ui/react-dropdown-menu";
import { getServerSession } from "next-auth";
// import { getSession } from ;
import prisma from "../../../lib/prisma";
import { getEventsById } from "../../api/events/getEventsById";
import { getUserFriends } from "../../api/friends/getUserFriends";
import { getSession } from "../../api/getSession";
import ClientProtectedPage from "../../protected/client/page";
import DeleteEventButton from "./DeleteEventButton";
import UpdateEventForm from "./UpdateEventForm";

const EventsPage = async ({ params }) => {
  const { id } = params;
  const session = await getSession();
  const event = await getEventsById(id);

  if (!session?.user?.id) {
    return <div>loading...</div>;
  }

  const friends = await getUserFriends(session?.user.id);
  console.log(friends);

  return (
    <ClientProtectedPage>
      {event && <UpdateEventForm event={event} friends={friends} />}
    </ClientProtectedPage>
  );
};
export default EventsPage;
