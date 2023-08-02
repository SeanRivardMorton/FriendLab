import { getServerSession } from "next-auth";

import { authOptions } from "./auth/[...nextauth]";

export const getSession = async () => await getServerSession(authOptions);
