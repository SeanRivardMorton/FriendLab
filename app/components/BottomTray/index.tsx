import {
  CalendarIcon,
  ChatBubbleIcon,
  LightningBoltIcon,
  PlusIcon,
  RocketIcon,
} from "@radix-ui/react-icons";

const BottomTray = () => {
  return (
    <div className="flex flex-row justify-end mb-8">
      <div className="card card-compact bg-base-200 w-4/5 rounded-s-full">
        <div className="card-body">
          <div className="card-actions">
            <button className="btn btn-circle bg-base-100">
              <LightningBoltIcon className="h-8 w-8" />
            </button>
            <button className="btn btn-circle bg-base-100">
              <ChatBubbleIcon className="h-8 w-8" />
            </button>
            <button className="btn btn-circle bg-base-100">
              <CalendarIcon className="h-8 w-8" />
            </button>
            <button className="btn btn-circle bg-base-100">
              <PlusIcon className="h-8 w-8" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BottomTray;
