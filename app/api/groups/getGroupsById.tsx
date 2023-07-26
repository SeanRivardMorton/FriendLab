import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";

export const getGroupsByUserId = async (id: string) => {
  const creatorRes = prisma.group.findMany({
    where: {
      creatorId: id,
    },
  });

  return creatorRes;
};

export type Groups = Prisma.GroupGetPayload<{}>;
