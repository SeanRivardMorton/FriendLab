import prisma from "../../../lib/prisma";
import ClientProtectedPage from "../../protected/client/page";
import DeleteEventButton from "./DeleteEventButton";

const getEvent = (id) => {
  const event = prisma.event.findUnique({
    where: {
      id: id[0],
    },
  });
  return event;
};

const EventsPage = async ({ params }) => {
  const { id } = params;
  const event = await getEvent(id);
  const date = event?.date && new Date(event.date).toLocaleString();

  return (
    <ClientProtectedPage>
      <div className="card w-11/12 mx-auto mt-4 bg-base-100 shadow-xl">
        <div className="card-body">
          <div className="flex flex-col">
            <h2 className="card-title">{event?.name}</h2>
            <p>{event?.description}</p>
            <p>{date}</p>
            <div className="flex flex-row justify-end">
              <DeleteEventButton />
            </div>
          </div>
        </div>
      </div>
    </ClientProtectedPage>
  );
};
export default EventsPage;
