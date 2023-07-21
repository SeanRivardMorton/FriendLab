"use client";

import { useForm } from "react-hook-form";

const createGroup = async (name) => {
  console.log("fetching");
  const response = await fetch("api/groups", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
    }),
  }).then((d) => {
    return d.json();
  });
  console.log(response);
};

const NewGroupButton = () => {
  const form = useForm({
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = form.handleSubmit(async ({ name }) => {
    createGroup(name);
  });

  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        placeholder="Type here"
        className="input input-bordered input-primary w-full max-w-xs"
        {...form.register("name")}
      />

      <button type="submit" className="btn btn-primary btn-sm">
        New Group
      </button>
    </form>
  );
};

export default NewGroupButton;
