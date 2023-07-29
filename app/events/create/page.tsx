import { PlusIcon } from "@radix-ui/react-icons";
import { redirect } from "next/navigation";
import { getSession } from "../../api/getSession";
import ButtonTray from "../../components/ButtonTray";
import { LOGIN_ROUTE } from "../../constants";
import CreateEventForm from "./CreateEventForm";

const CreatePage = async ({ searchParams }) => {
  const { gId } = searchParams;
  const session = await getSession();
  if (!session?.user?.id) redirect(LOGIN_ROUTE);

  return (
    <>
      <ButtonTray>
        <h2>Create an event</h2>
      </ButtonTray>
      <CreateEventForm groupId={gId} />
    </>
  );
};

export default CreatePage;
