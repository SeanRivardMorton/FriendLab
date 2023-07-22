import { getServerSession } from "next-auth";
import Link from "next/link";
import prisma from "../../lib/prisma";
import { authOptions } from "../api/auth/[...nextauth]";
import ClientProtectedPage from "../protected/client/page";

const getEvents = async () => {
  const session = await getServerSession(authOptions);
  const user = await prisma.user.findFirst({
    where: {
      email: session?.user?.email,
    },
  });
  const events = await prisma.event.findMany({
    where: {
      creatorId: user?.id,
    },
  });
  return events;
};

const EventsPage = async () => {
  const events = await getEvents();

  return (
    <ClientProtectedPage>
      <div className="card w-11/12 mx-auto mt-4 bg-base-100 shadow-xl">
        <div className="card-body">
          <div className="flex flex-row justify-between">
            <h2 className="card-title">Your Events</h2>
            <Link className="btn btn-link" href="/events/new">
              Add
            </Link>
          </div>
          {events.map((event) => {
            return (
              <div
                key={event.id}
                className="card w-full mx-auto mt-1 bg-base-200 shadow-xl"
              >
                <div className="card-body">
                  <h2 className="card-title">{event.name}</h2>
                  <p>{event.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </ClientProtectedPage>
  );
};

export default EventsPage;
