import { PlusIcon } from "@radix-ui/react-icons";
import React from "react";
import { twMerge } from "tailwind-merge";

import ButtonTray from "../../components/ButtonTray";
import { CircleButtonInset } from "../../components/Form/button";

interface BasicPollProps {
  name: string;
  value: number;
  color: string;
  iconProp: React.ReactNode;
}

const BasicPoll = ({ name, value, color, IconProp }) => {
  return (
    <div
      style={{ width: `${value}%` }}
      className="my-2 flex min-w-min flex-row justify-between rounded-r-full bg-base-200 py-2 pl-2 pr-2 shadow-md"
    >
      <div className="flex w-full flex-col">
        <h3 style={{ color: `${color}` }} className="my-0">
          {name}
        </h3>
        <div
          style={{ borderColor: `${color}` }}
          className="mt-1 w-full rounded-full border-2"
        ></div>
      </div>

      <div className="my-auto flex flex-row">
        <div style={{ color: `${color}` }} className="mx-2 my-auto">
          {value}%
        </div>
        <CircleButtonInset>
          <IconProp
            style={{ color: `${color}` }}
            className="my-auto h-8 w-8 text-success"
          />
        </CircleButtonInset>
      </div>
    </div>
  );
};

export default BasicPoll;
