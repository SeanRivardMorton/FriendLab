"use client";
import React from "react";

const getProfile = async (id) => {
  const response = await fetch(`/api/profile/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((d) => {
    return d.json();
  });

  return response;
};

const ProfileCard = ({ profileId }) => {
  const [user, setUser] = React.useState<{
    image: string;
    name: string;
  } | null>(null);

  React.useEffect(() => {
    getProfile(profileId).then((data) => {
      setUser(data);
    });
  }, [profileId]);

  return (
    <div className="card w-11/12 mx-auto my-4 bg-base-100 shadow-xl">
      <div className="card-body">
        <h1 className="card-title">
          <img src={user?.image} alt="test" className="h-16 w-16 rounded-xl" />
          <span className="ml-2">{user?.name}</span>
        </h1>
      </div>
    </div>
  );
};

export default ProfileCard;
