"use client";
import { useParams } from "next/navigation";

const FriendPage = () => {
  const params = useParams();

  //   const friendId = params.get("friendId");
  return <div>Friend: </div>;
};

export default FriendPage;
