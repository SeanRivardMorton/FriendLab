import {
  DrawingPinFilledIcon,
  GearIcon,
  PersonIcon,
} from "@radix-ui/react-icons";
import Link from "next/link";

interface TopNavProps {
  avatar?: string;
}

const TopNav = () => {
  return (
    <div className="lg:w-2/4 lg:mx-auto text-4xl m-2 text-primary flex flex-row justify-between">
      <div className="card">
        <h1 className="card-title my-auto text-neutral-content">
          <Link href="/">FriendLab</Link>
        </h1>
      </div>
      <div>
        <Link
          href="/news"
          aria-label="Link to news page"
          className="btn btn-circle bg-base-200 mr-4"
        >
          <DrawingPinFilledIcon className="h-6 w-6" />
        </Link>
        <Link
          href="/friends"
          aria-label="Link to friends page"
          className="btn btn-circle bg-base-200 mr-4"
        >
          <PersonIcon className="h-6 w-6" />
        </Link>
        <Link
          href="/settings"
          aria-label="link to settings"
          className="btn btn-circle bg-base-200 mr-4"
        >
          <GearIcon className="h-6 w-6" />
        </Link>
      </div>
    </div>
  );
};

export default TopNav;
