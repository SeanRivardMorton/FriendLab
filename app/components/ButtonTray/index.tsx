import { ChevronLeftIcon, PlusIcon } from "@radix-ui/react-icons";
import Link from "next/link";

interface ButtonTrayProps {
  actionSlot?: React.ReactNode;
  children: React.ReactNode;
  href?: string;
}

/**
 * Usage:
 * 
 * - Default
 * 
  <ButtonTray>
    <h1>Name</h1>
  </ButtonTray>
 * 
 */

const ButtonTray: React.FC<ButtonTrayProps> = ({
  children,
  actionSlot,
  href,
}) => {
  return (
    <div className="translate-y-3 mb-4 -translate-x-2 shadow-xl shadow-base-100 card card-compact bg-base-200 w-fit rounded-e-full">
      <div className="card-body">
        <div className="card-title flex flex-row justify-between">
          {href && (
            <Link href={href} className="btn btn-circle bg-base-100">
              <ChevronLeftIcon className="h-8 w-8" />
            </Link>
          )}
          {children}
          {actionSlot ? (
            actionSlot
          ) : (
            <button className="btn btn-circle bg-base-100 ml-6">
              <PlusIcon className="h-8 w-8" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ButtonTray;
