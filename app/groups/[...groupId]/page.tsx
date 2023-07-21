import prisma from "../../../lib/prisma";
import { headers } from "next/headers";

const getGroup = async () => {
  const headersList = headers();
  const url = headersList.get("x-invoke-path");
  const groupId = url?.split("groups/")[1];
  const group = await prisma.group.findFirst({
    where: {
      id: groupId,
    },
  });

  return group;
};

const GroupPage = async () => {
  const group = await getGroup();

  return (
    <div className="card w-11/12 mx-auto my-4 bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">{group?.name}</h2>
      </div>
    </div>
  );
};

export default GroupPage;
