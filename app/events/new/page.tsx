import { LightningBoltIcon } from "@radix-ui/react-icons";
import ClientProtectedPage from "../../protected/client/page";
import NewEventsForm from "./NewEventForm";

const NewEventsPage = () => {
  return (
    <ClientProtectedPage>
      <NewEventsForm />
    </ClientProtectedPage>
  );
};

export default NewEventsPage;
