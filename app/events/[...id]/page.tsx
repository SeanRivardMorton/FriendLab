import { redirect } from "next/navigation";
import { getEventById } from "../../api/events/getEventById";
import { getUserFriends } from "../../api/friends/getUserFriends";
import { getSession } from "../../api/getSession";
import ClientProtectedPage from "../../protected/client/page";
import UpdateEventForm from "./UpdateEventForm";

const EventsPage = async ({ params }) => {
  const { id } = params;
  const session = await getSession();
  const event = await getEventById(id);

  if (!session?.user?.id) {
    redirect("/api/auth/signin");
  }

  const friends = await getUserFriends(session?.user.id);

  return (
    <ClientProtectedPage>
      {event && <UpdateEventForm event={event} friends={friends} />}
    </ClientProtectedPage>
  );
};
export default EventsPage;
