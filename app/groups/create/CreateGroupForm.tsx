"use client";
import { useMutation } from "@tanstack/react-query";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import type { Event } from "../../api/events/getEventById";

const createGroup = async (data) => {
  return fetch("/api/groups", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

const CreateEventForm = () => {
  const router = useRouter();
  const form = useForm<Event>({
    defaultValues: {
      name: "",
      description: "",
    },
  });
  const mutate = useMutation({
    mutationFn: createGroup,
    onSuccess: () => {
      router.push("/groups");
    },
  });

  const handleSubmit = form.handleSubmit((data) => {
    mutate.mutate({ ...data });
  });

  return (
    <form onSubmit={handleSubmit} className="mx-2">
      <div className="flex flex-col justify-between h-[66vh]">
        <div className="form-control ">
          <label className="label">
            <span className="label-text">Group Name</span>
          </label>
          <input
            {...form.register("name")}
            type="text"
            placeholder="Knights of the round table"
            className="input input-bordered"
          />
          <label className="label">
            <span className="label-text">Description</span>
          </label>
          <input
            {...form.register("description")}
            type="text"
            placeholder="We kinda suck"
            className="input input-bordered"
          />

          {mutate.isLoading && (
            <div className="m-auto mt-8">
              <span className="loading loading-bars loading-md"></span>
            </div>
          )}
        </div>
        <button className="btn btn-primary">Create Event</button>
      </div>
    </form>
  );
};

export default CreateEventForm;
