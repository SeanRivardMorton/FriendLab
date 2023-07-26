"use client";
import { CheckIcon, Cross1Icon, PlusIcon } from "@radix-ui/react-icons";
import { Mutation, useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

const deleteEventPage = (eventId) => {
  return fetch(`/api/events/${eventId}`, {
    method: "DELETE",
  });
};

const DeleteEventPage = () => {
  const params = useParams();
  const router = useRouter();
  const { mutate, isLoading } = useMutation({
    mutationFn: deleteEventPage,
    onSuccess: (res) => {
      router.push("/");
    },
  });
  return (
    <>
      <div className="card card-compact bg-base-200 w-2/3 rounded-e-full">
        <div className="card-body">
          <div className="card-title flex flex-row justify-between">
            <h1>Delete?</h1>
            <div className="flex flex-row">
              {isLoading && (
                <div className="btn btn-circle">
                  <span className="loading loading-bars loading-sm"></span>
                </div>
              )}
              <Link
                href={`/events/${params?.id}`}
                className="btn btn-circle text-error bg-base-100"
              >
                <Cross1Icon className="h-8 w-8" />
              </Link>
              <button
                onClick={() => mutate(params?.id)}
                className="btn btn-circle text-success bg-base-100"
              >
                <CheckIcon className="h-8 w-8" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteEventPage;
