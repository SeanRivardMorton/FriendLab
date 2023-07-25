"use client";
import {
  AvatarIcon,
  FrameIcon,
  HomeIcon,
  TimerIcon,
} from "@radix-ui/react-icons";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const BottomNav = () => {
  const { data, status } = useSession();
  const pathname = usePathname();

  if (!data) {
    return null;
  }

  return (
    <div className="btm-nav">
      <Link href="/" className={`${pathname === "/" && "active"}`}>
        <HomeIcon />
        <span className="btm-nav-label">Home</span>
      </Link>
      <Link
        href="/friends"
        className={`${pathname?.includes("/friends") && "active"}`}
      >
        <AvatarIcon />
        <span className="btm-nav-label">Friends</span>
      </Link>
      <Link
        href="/events"
        className={`${pathname?.includes("/events") && "active"}`}
      >
        <TimerIcon />
        <span className="btm-nav-label">Events</span>
      </Link>
    </div>
  );
};

export default BottomNav;
