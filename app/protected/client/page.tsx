"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

const ClientProtectedPage = () => {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/api/auth/signin");
    },
  });
  if (status === "loading") return <p>Loading...</p>;
  if (!session) {
    // redirect("/api/auth/signin");
    // return <p>Redirecting...</p>;
  }
  return (
    <>
      <h1>Client Protected Page</h1>
    </>
  );
};

export default ClientProtectedPage;
