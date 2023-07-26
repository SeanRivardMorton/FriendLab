"use client";
import { useMutation } from "@tanstack/react-query";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import type { Event } from "../../api/events/getEventById";

const createEvent = async (data) => {
  return fetch("/api/events", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

const CreateEventForm = () => {
  const params = useSearchParams();
  const groupId = params?.get("gId");
  const router = useRouter();
  const form = useForm<Event>({
    defaultValues: {
      name: "",
    },
  });
  const mutate = useMutation({
    mutationFn: createEvent,
    onSuccess: () => {
      router.push("/");
    },
  });

  const handleSubmit = form.handleSubmit((data) => {
    mutate.mutate({ ...data, groupId: groupId });
  });

  return (
    <form onSubmit={handleSubmit} className="mx-2">
      <div className="flex flex-col justify-between h-[80vh]">
        <div className="form-control ">
          <label className="label">
            <span className="label-text">Event Name</span>
          </label>
          <input
            {...form.register("name")}
            type="text"
            placeholder="Event Name"
            className="input input-bordered"
          />
          <label className="label">
            <span className="label-text">Description</span>
          </label>
          <input
            {...form.register("description")}
            type="text"
            placeholder="Event Name"
            className="input input-bordered"
          />
          <label className="label">
            <span className="label-text">Date Time</span>
          </label>
          <input
            {...form.register("date")}
            type="datetime-local"
            placeholder="Event Name"
            className="input input-bordered"
          />
          <label className="label">
            <span className="label-text">Location</span>
          </label>
          <input
            {...form.register("location")}
            type="text"
            placeholder="Event Name"
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
