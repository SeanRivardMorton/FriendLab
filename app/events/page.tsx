import { PlusIcon } from "@radix-ui/react-icons";

import prisma from "../../lib/prisma";
import { getSession } from "../api/getSession";
import BottomTray from "../components/BottomTray";
import ButtonTray from "../components/ButtonTray";
import { CircleButtonLinkInset } from "../components/Form/button";
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
  const events = a?.eventsAttending;
  return (
    <div>
      <ButtonTray href="/" actionSlot={<div className="w-14"></div>}>
        <div>
          <h2>Socials</h2>
        </div>
      </ButtonTray>
      <EventsList events={events} />
      <BottomTray>
        <p className="my-auto text-lg font-bold ">New Plan:</p>
        <CircleButtonLinkInset href="/events/create">
          <PlusIcon className="h-8 w-8" />
        </CircleButtonLinkInset>
      </BottomTray>
    </div>
  );
};

export default EventsPage;
