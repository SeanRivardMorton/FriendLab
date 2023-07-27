import {
  DrawingPinFilledIcon,
  GearIcon,
  PersonIcon,
} from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface TopNavProps {
  avatar?: string;
}

const TopNav: React.FC<TopNavProps> = () => {
  return (
    <div className="text-4xl m-2 w-screen text-primary flex flex-row justify-between">
      <Link href="/">FriendLab</Link>
      <div>
        <Link href="/news" className="btn btn-circle bg-base-200 mr-4">
          <DrawingPinFilledIcon className="h-6 w-6" />
        </Link>
        <Link href="/friends" className="btn btn-circle bg-base-200 mr-4">
          <PersonIcon className="h-6 w-6" />
        </Link>
        <Link href="/settings" className="btn btn-circle bg-base-200 mr-4">
          <GearIcon className="h-6 w-6" />
        </Link>
      </div>
    </div>
  );
};

export default TopNav;
