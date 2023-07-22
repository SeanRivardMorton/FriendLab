"use client";

import { Cross1Icon, StopIcon } from "@radix-ui/react-icons";

const DeleteEventButton = () => {
  return (
    <button className="btn btn-error btn-sm">
      <Cross1Icon />
      Delete
    </button>
  );
};

export default DeleteEventButton;
