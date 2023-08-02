import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";

import prisma from "../../../lib/prisma";

export const getGroupsByUserId = async (id: string) => {
  const creatorRes = await prisma.group.findMany({
    where: {
      OR: [
        {
          creatorId: id,
        },
        {
          members: {
            some: {
              id,
            },
          },
        },
      ],
    },
    include: {
      members: true,
    },
  });

  return creatorRes;
};

export type Groups = Prisma.GroupGetPayload<{}>;
