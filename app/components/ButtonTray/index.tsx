import { ChevronLeftIcon, PlusIcon, TrashIcon } from "@radix-ui/react-icons";
import Link from "next/link";

interface ButtonTrayProps {
  actionSlot?: React.ReactNode;
  secondarySlot?: React.ReactNode;
  children: React.ReactNode;
  href?: string;
  backSlot?: React.ReactNode;
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
  secondarySlot,
  backSlot,
  href,
}) => {
  return (
    <div className="flex flex-row justify-between">
      <div className="card card-compact mb-4 w-fit -translate-x-2 translate-y-3 rounded-e-full bg-base-200 shadow-xl shadow-base-100">
        <div className="card-body">
          <div className="card-title flex flex-row justify-between">
            {backSlot}
            {href && (
              <Link href={href} className="btn-circle btn bg-base-100">
                <ChevronLeftIcon className="h-8 w-8" />
              </Link>
            )}
            {children}
            {actionSlot ? (
              actionSlot
            ) : (
              <button className="btn-circle btn ml-6 bg-base-100">
                <PlusIcon className="h-8 w-8" />
              </button>
            )}
          </div>
        </div>
      </div>
      {secondarySlot && (
        <div className="my-auto ml-auto mr-4">{secondarySlot}</div>
      )}
    </div>
  );
};

export default ButtonTray;
