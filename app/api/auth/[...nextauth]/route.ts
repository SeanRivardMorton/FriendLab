import NextAuth, { NextAuthOptions } from "next-auth";

import { authOptions } from "./index";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
