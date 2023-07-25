"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

const ClientProtectedPage = ({ children }) => {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/login");
    },
  });
  return (
    <>
      <h1>{children}</h1>
    </>
  );
};

export default ClientProtectedPage;
