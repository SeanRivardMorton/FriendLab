"use client";
import {
  AvatarIcon,
  FrameIcon,
  HomeIcon,
  TimerIcon,
} from "@radix-ui/react-icons";
import Link from "next/link";
import { usePathname } from "next/navigation";

const BottomNav = () => {
  const pathname = usePathname();
  return (
    <div className="btm-nav">
      <Link href="/" className={`${pathname === "/" && "active"}`}>
        <HomeIcon />
        <span className="btm-nav-label">Home</span>
      </Link>
      <Link
        href="/friends"
        className={`${pathname === "/friends" && "active"}`}
      >
        <AvatarIcon />
        <span className="btm-nav-label">Friends</span>
      </Link>
      <Link href="/events" className={`${pathname === "/events" && "active"}`}>
        <TimerIcon />
        <span className="btm-nav-label">Events</span>
      </Link>
    </div>
  );
};

export default BottomNav;
