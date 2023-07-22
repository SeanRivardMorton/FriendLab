"use client";

import { LightningBoltIcon } from "@radix-ui/react-icons";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

type NewEventFormValues = {
  name: string;
  description: string;
  location: string;
  date: string;
  time: string;
  attendees: string;
};

const NewEventsForm = () => {
  const form = useForm<NewEventFormValues>({
    defaultValues: {
      name: "",
      description: "",
      location: "",
      date: "",
      attendees: "",
    },
  });
  const updateForm = useMutation({
    mutationFn: (values: NewEventFormValues) => {
      return fetch("/api/events/new", {
        method: "POST",
        body: JSON.stringify(values),
      });
    },
    onSuccess: () => {
      form.reset();
    },
  });
  const handleSubmit = form.handleSubmit((data) => {
    updateForm.mutate(data);
  });
  return (
    <div className="card w-11/12 mx-auto mt-4 bg-base-100 shadow-xl">
      <div className="card-body">
        <div className="flex flex-row justify-between">
          <h1 className="text-xl">New Event</h1>
          {updateForm.isLoading && (
            <span className="loading loading-bars loading-sm"></span>
          )}
        </div>
        <form onSubmit={handleSubmit} className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Event Title</span>
          </label>
          <input
            {...form.register("name", { required: true })}
            type="text"
            placeholder="Pub, Movie, Walk, etc."
            className="input input-bordered w-full max-w-xs"
          />
          <br></br>
          <label className="label">
            <span className="label-text">What&apos;s it about?</span>
          </label>
          <input
            {...form.register("description", { required: true })}
            type="text"
            placeholder="Celebrating Summer"
            className="input input-bordered w-full max-w-xs"
          />
          <br></br>
          <label className="label">
            <span className="label-text">Where?</span>
          </label>
          <input
            {...form.register("location", { required: true })}
            type="text"
            placeholder="Good Mixer, Camden"
            className="input input-bordered w-full max-w-xs"
          />
          <br></br>
          <label className="label">
            <span className="label-text">Time?</span>
          </label>
          <input
            {...form.register("date", { required: true })}
            type="text"
            placeholder="Next Wednesday, 7pm"
            className="input input-bordered w-full max-w-xs"
          />
          <br></br>
          <label className="label">
            <span className="label-text">Who&apos;s coming?</span>
          </label>
          <input
            {...form.register("attendees", { required: true })}
            type="text"
            placeholder="Bob, Alice, etc."
            className="input input-bordered w-full max-w-xs"
          />
          <button type="submit" className="btn btn-primary mt-8 mx-auto">
            <LightningBoltIcon />
            Save Event
            <LightningBoltIcon />
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewEventsForm;
