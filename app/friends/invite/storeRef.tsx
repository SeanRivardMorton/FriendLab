"use client";

import { useSearchParams } from "next/navigation";
import React from "react";

const StoreFriendInvite = () => {
  const params = useSearchParams();
  const friendId = params.get("friend");
  React.useEffect(() => {
    if (!friendId) return;
    localStorage.setItem("friendId", friendId);
  }, []);
  return <></>;
};

export default StoreFriendInvite;
