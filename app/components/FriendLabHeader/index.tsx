import {
  CalendarIcon,
  Cross1Icon,
  GearIcon,
  Pencil1Icon,
  PersonIcon,
} from "@radix-ui/react-icons";

const FriendLabHeader = () => {
  return (
    <div className="card bg-base-200 card-compact w-fit rounded-e-full">
      <div className="m-2 flex flex-row justify-start">
        <div className="card-title ml-4 text-3xl">
          Glass House
          <button className="btn btn-circle bg-base-100">
            <Pencil1Icon className="h-6 w-6" />
          </button>
          <button className="btn btn-circle bg-base-100">
            <PersonIcon className="h-8 w-6" />
          </button>
          <button className="btn btn-circle bg-base-100">
            <CalendarIcon className="h-8 w-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FriendLabHeader;
