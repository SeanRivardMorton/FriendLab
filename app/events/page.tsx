import prisma from "../../lib/prisma";
import { getSession } from "../api/getSession";
import BottomTray from "../components/BottomTray";
import ButtonTray from "../components/ButtonTray";
import EventsList from "./EventsList";

const userWithEvents = async (userId) => {
  return await prisma.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      eventsCreated: {
        include: {
          creator: true,
          eventResponse: {
            where: {
              userId,
            },
            include: {
              user: true,
            },
          },
        },
      },
      eventsAttending: {
        include: {
          creator: true,
          eventResponse: {
            where: {
              userId,
            },
            include: {
              user: true,
            },
          },
        },
      },
    },
  });
};

const EventsPage = async () => {
  const session = await getSession();
  if (!session?.user) {
    return <div>Not logged in</div>;
  }
  const a = await userWithEvents(session?.user?.id);
  console.log("asdfasdf", a);
  const events = a?.eventsAttending;
  return (
    <div>
      <ButtonTray href="/">
        <h2>Events</h2>
      </ButtonTray>
      <EventsList events={events} />
      <BottomTray />
    </div>
  );
};

export default EventsPage;
