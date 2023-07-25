import { ArrowUpIcon } from "@radix-ui/react-icons";
import colors from "tailwindcss/colors";

interface PollProps {
  value?: number;
  displayName?: string;
  colour?: string;
}

const Poll: React.FC<PollProps> = ({
  value = 30,
  displayName = "Lorem",
  colour = "red",
}) => {
  const color = colors[colour][400];
  return (
    <div
      style={{ color: color }}
      className="card card-compact mt-4 bg-base-200 w-fit p-3 rounded-e-full text-2xl pr-4 flex flex-row"
    >
      <div className="mr-4">
        {displayName}
        <div
          style={{ width: `${value}vw`, backgroundColor: color }}
          className="h-2 rounded-2xl"
        ></div>
      </div>
      <button className="btn btn-circle bg-base-100">
        <ArrowUpIcon className="h-6 w-6" />
      </button>
    </div>
  );
};

const FriendLabPoll = () => {
  return (
    <div className="mb-4">
      <Poll displayName="Movie" value={70} colour="red" />
      <Poll displayName="Pub" value={55} colour="green" />
      <Poll displayName="Darts" value={33} colour="blue" />
    </div>
  );
};

export default FriendLabPoll;
