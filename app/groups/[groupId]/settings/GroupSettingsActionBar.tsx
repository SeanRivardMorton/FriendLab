"use client";
import { TrashIcon } from "@radix-ui/react-icons";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

const deleteEvent = async (id) => {
  return fetch(`/api/groups/${id}`, {
    method: "DELETE",
  });
};

const GroupSettingsActionsBar = ({ groupId }) => {
  const router = useRouter();
  const mutate = useMutation({
    mutationFn: deleteEvent,
    onSuccess: () => {
      router.push("/");
    },
  });
  return (
    <div className="card card-compact bg-base-200 rounded-l-full w-2/3">
      <div className="card-body">
        <div className="card-title flex flex-row justify-end w-full">
          <button
            onClick={() => mutate.mutate(groupId)}
            className={`btn btn-circle text-error bg-base-100`}
          >
            <TrashIcon className="h-8 w-8" />
          </button>
          {mutate.isLoading && (
            <div className="btn btn-circle bg-base-200">
              <span className="loading loading-bars loading-md"></span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GroupSettingsActionsBar;
