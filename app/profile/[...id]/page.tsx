"use client";
import { usePathname, useSearchParams } from "next/navigation";
import ProfileCard from "../ProfileCard";

const ProfilePage = () => {
  const pathName = usePathname();
  const id = pathName?.split("profile/")[1];
  return (
    <>
      <ProfileCard profileId={id} />
    </>
  );
};

export default ProfilePage;
