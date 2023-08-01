import { redirect } from "next/navigation";
import { getSession } from "../../api/getSession";
import ButtonTray from "../../components/ButtonTray";
import { LOGIN_ROUTE } from "../../constants";
import CreateEventForm from "./CreateEventForm";
import getGroupById from "../../api/groups/getGroupById";

const CreatePage = async ({ searchParams }) => {
  const { gId } = searchParams;
  const group = await getGroupById(gId);
  const session = await getSession();
  if (!session?.user?.id) redirect(LOGIN_ROUTE);

  return (
    <>
      <ButtonTray>
        <h2>Create an event</h2>
      </ButtonTray>
      <CreateEventForm group={group} />
    </>
  );
};

export default CreatePage;
