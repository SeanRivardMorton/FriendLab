"use client";
import { UploadIcon } from "@radix-ui/react-icons";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import type { Event } from "../../api/events/getEventById";
import { UploadButton } from "../../utils/uploadthing";

const createEvent = async (data) => {
  return fetch("/api/events", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

const CreateEventForm = ({ group }) => {
  const router = useRouter();
  // const { start}
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
    mutate.mutate({ ...data, groupId: group.id, attendees: group.members });
  });

  return (
    <form onSubmit={handleSubmit} className="mx-2">
      <div className="flex h-[80vh] flex-col justify-between">
        <div className="form-control ">
          <label className="label">
            <span className="label-text">Event Name</span>
          </label>

          {/* <button className="btn-circle btn mb-2">
            <UploadIcon className="h-8 w-8"></UploadIcon>
          </button> */}

          <input
            {...form.register("name")}
            type="text"
            placeholder="Event Name"
            className="input-bordered input"
          />
          <label className="label">
            <span className="label-text">Description</span>
          </label>
          <input
            {...form.register("description")}
            type="text"
            placeholder="Event Name"
            className="input-bordered input"
          />
          <label className="label">
            <span className="label-text">Date Time</span>
          </label>

          <input
            {...form.register("date")}
            type="datetime-local"
            placeholder="Event Name"
            className="input-bordered input"
          />
          <label className="label">
            <span className="label-text">Location</span>
          </label>
          <input
            {...form.register("location")}
            type="text"
            placeholder="Event Name"
            className="input-bordered input"
          />

          {mutate.isLoading && (
            <div className="m-auto mt-8">
              <span className="loading loading-bars loading-md"></span>
            </div>
          )}
        </div>
        <button className="btn-primary btn">Create Event</button>
      </div>
    </form>
  );
};

export default CreateEventForm;
