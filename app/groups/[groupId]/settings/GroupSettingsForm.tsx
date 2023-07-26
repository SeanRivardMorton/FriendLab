"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

const updateGroups = async (data) => {
  return fetch(`/api/groups/${data.id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
};

const GroupSettingsForm = ({ group }) => {
  const router = useRouter();
  const form = useForm({
    defaultValues: group,
  });
  const mutate = useMutation({
    mutationFn: updateGroups,
    onSuccess: (res) => {
      console.log(res);
    },
  });

  const onChange = form.handleSubmit((data) => {
    mutate.mutate(data);
  });

  return (
    <form onBlur={onChange}>
      <div className="form-control mx-1">
        <label className="label">
          <span className="label-text">Group Name</span>
        </label>
        <input
          {...form.register("name")}
          type="text"
          placeholder="Group Name"
          className="input input-bordered"
        />
        <label className="label">
          <span className="label-text">Description</span>
        </label>
        <input
          {...form.register("description")}
          type="text"
          placeholder="Description"
          className="input input-bordered"
        />
      </div>
    </form>
  );
};

export default GroupSettingsForm;
