import getEventById from "../../../api/events/getEventById";
import ClientEventSettingsPage from "./client";

const EditEventPage = async ({ params }) => {
  const event = await getEventById(params.id);

  return <ClientEventSettingsPage event={event} />;
};

export default EditEventPage;
