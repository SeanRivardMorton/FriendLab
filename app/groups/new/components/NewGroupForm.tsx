"use client";

import { Mutation, useMutation } from "@tanstack/react-query";
import { watch } from "fs";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

const createGroup = async (data) => {
  const response = await fetch(`/api/groups`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((d) => {
    return d.json();
  });
  return response;
};

const NewGroupForm = ({ friends }) => {
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: createGroup,
    onSuccess: () => {
      router.push("/");
    },
  });

  const form = useForm({
    defaultValues: {
      name: "",
      description: "",
      friends: friends.map((f) => {
        return { id: f.id, name: f.name, selected: false };
      }),
    },
  });

  const onSelect = (e) => {
    const formFriends = form.getValues().friends;
    const newValues = formFriends.map((f) => {
      if (f.id === e.target.value) {
        return { ...f, selected: !f.selected };
      }
      return f;
    });
    form.setValue("friends", newValues);
  };

  const onSubmit = form.handleSubmit(({ name, description, friends }) => {
    const selectedFriends = friends.filter((f) => (f.selected ? f.id : null));
    const data = {
      name,
      description,
      members: selectedFriends,
    };
    mutation.mutate(data);
  });

  return (
    <form onSubmit={onSubmit} className="w-full">
      <div className="form-control w-full max-w-xs">
        <label className="label">
          <span className="label-text">What is the group name?</span>
        </label>
        <input
          {...form.register("name", { required: true })}
          type="text"
          placeholder="I don't know, you tell me"
          className="input input-bordered w-full max-w-xs"
        />

        <label className="label">
          <span className="label-text">What is the purpose of this group?</span>
        </label>
        <input
          {...form.register("description", { required: true })}
          type="text"
          placeholder="Eating Cheese"
          className="input input-bordered w-full max-w-xs"
        />
        <label className="my-2">
          <span className="label-text">Who is in this group?</span>
        </label>
        <label className="label">
          <span className="label-text">Add friends</span>
        </label>
        <select onChange={onSelect} className="select select-bordered">
          <option disabled>Pick one</option>
          {form.watch("friends").map((friend) => {
            return (
              <option
                value={friend.id}
                key={friend.id}
                className={`${friend.selected && "bg-base-content text-black"}`}
              >
                {friend.name}
              </option>
            );
          })}
        </select>
      </div>
      <button className="mt-2 btn btn-primary">Submit</button>
    </form>
  );
};

export default NewGroupForm;
