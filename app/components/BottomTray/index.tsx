import {
  CalendarIcon,
  ChatBubbleIcon,
  LightningBoltIcon,
  PlusIcon,
  RocketIcon,
} from "@radix-ui/react-icons";

interface BottomTray {
  children?: React.ReactNode;
}

const BottomTray: React.FC<BottomTray> = ({ children }) => {
  return (
    <div className="flex flex-row justify-end mb-8">
      <div className="card card-compact bg-base-200 w-4/5 rounded-s-full">
        <div className="card-body">
          <div className="card-actions">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default BottomTray;
