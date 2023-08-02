"use client";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

import { Event } from "../../../api/events/getEventById";
import { Groups } from "../../../api/groups/getGroupsById";

const putEventData = async (event: Event) => {
  return fetch(`/api/events/${event.id}`, {
    method: "PUT",
    body: JSON.stringify(event),
  });
};

interface EditEventPageFormProps {
  event: Event;
  groups: Groups[];
}

const EditEventPageForm: React.FC<EditEventPageFormProps> = ({
  event,
  groups,
}) => {
  const mutate = useMutation(putEventData);

  const form = useForm({
    defaultValues: {
      ...event,
    },
  });
  const handleSubmit = form.handleSubmit((data) => {
    mutate.mutate({ ...data });
  });
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-control">
        <label className="label">
          <span className="label-text">Name</span>
        </label>
        <input
          {...form.register("name")}
          type="text"
          placeholder="Name"
          className="input input-bordered"
        />
        <label className="label">
          <span className="label-text">Location</span>
        </label>
        <input
          {...form.register("location")}
          type="text"
          placeholder="Name"
          className="input input-bordered"
        />
        <label className="label">
          <span className="label-text">Description</span>
        </label>
        <input
          {...form.register("description")}
          type="text"
          placeholder="Name"
          className="input input-bordered"
        />
        <label className="label">
          <span className="label-text">Assign to group</span>
        </label>
        <select
          {...form.register("group.id")}
          className="select select-bordered"
        >
          <option defaultValue={0} disabled>
            Assign to group
          </option>
          {groups.map((group) => (
            <option key={group.id} value={group.id}>
              {group.name}
            </option>
          ))}
        </select>
      </div>
      <button className="btn btn-primary mt-2">Save</button>
    </form>
  );
};

export default EditEventPageForm;
