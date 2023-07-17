"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

const ClientProtectedPage = ({ children }) => {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/waitlist");
    },
  });
  if (status === "loading") return <p>Loading...</p>;
  if (!session) {
    // redirect("/api/auth/signin");
    // return <p>Redirecting...</p>;
  }
  return (
    <>
      <h1>{children}</h1>
    </>
  );
};

export default ClientProtectedPage;
