import {
  CheckIcon,
  PaperPlaneIcon,
  PlusIcon,
  RocketIcon,
  StarFilledIcon,
} from "@radix-ui/react-icons";

const HandleInvite = async ({ friendId }) => {
  console.log(friendId);
  return (
    <div className="">
      <div className="card card-compact bg-base-200 w-11/12 rounded-e-full">
        <div className="card-body">
          <div className="card-title flex flex-row justify-between">
            <h1>Welcome To FriendLab</h1>
            <button className="btn btn-circle bg-base-100 text-warning animate-pulse">
              <StarFilledIcon className="h-8 w-8" />
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-end">
        <div className="card card-compact bg-base-200 w-11/12 rounded-l-full mt-4">
          <div className="card-body">
            <div className="card-title flex flex-row justify-between">
              <button className="btn btn-circle text-success bg-base-100 animate-pulse">
                <CheckIcon className="h-8 w-8" />
              </button>
              <h2>You've just followed a link from a friend</h2>
            </div>
          </div>
        </div>
      </div>
      <div className="card card-compact mt-4 bg-base-200 w-11/12 rounded-e-full">
        <div className="card-body">
          <div className="card-title flex flex-row justify-between">
            <h1>Sign up to get started!</h1>
            <button className="btn btn-circle bg-base-100 text-primary animate-pulse">
              <RocketIcon className="h-8 w-8" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HandleInvite;
