"use client";
import { useSearchParams } from "next/navigation";
import React from "react";

const postInvite = async (refferal) => {
  const response = await fetch("api/invite", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      refferal,
    }),
  }).then((d) => {
    return d.json();
  });

  return response;
};

const ClientInvite = ({ children, user }) => {
  const searchParams = useSearchParams();
  const ref = searchParams?.get("ref");

  React.useEffect(() => {
    if (ref) {
      localStorage.setItem("ref", ref);
      if (user) {
        const response = postInvite(ref);
        // console.log(response);
      }
    }
  }, [ref, user]);

  if (!user) return <div>{children}</div>;

  return <div>{children}</div>;
};

export default ClientInvite;
