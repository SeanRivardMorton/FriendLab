import getEventsByUserId from "../api/events/getEventsByUserId";
import { getSession } from "../api/getSession";
import BottomTray from "../components/BottomTray";
import ButtonTray from "../components/ButtonTray";
import EventsList from "./EventsList";

const EventsPage = async () => {
  const session = await getSession();
  if (!session?.user) {
    return <div>Not logged in</div>;
  }
  const events = await getEventsByUserId(session?.user?.id);
  return (
    <div>
      <ButtonTray>
        <h2>Events</h2>
      </ButtonTray>
      <EventsList events={events} />
      <BottomTray />
    </div>
  );
};

export default EventsPage;
