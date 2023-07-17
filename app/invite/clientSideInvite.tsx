"use client";
import { useSearchParams } from "next/navigation";
import React from "react";

const ClientInvite = ({ children, user }) => {
  const searchParams = useSearchParams();
  const ref = searchParams?.get("ref");

  const postInvite = async () => {
    const response = await fetch("api/invite", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ref,
        // user,
      }),
    }).then((d) => {
      return d.json();
    });
    console.log(response);
    return response;
  };

  React.useEffect(() => {
    if (ref) {
      localStorage.setItem("ref", ref);
      if (user) {
        const response = postInvite();
        // console.log(response);
      }
    }
  }, []);

  if (!user) return <div>{children}</div>;

  return <div>{children}</div>;
};

export default ClientInvite;
