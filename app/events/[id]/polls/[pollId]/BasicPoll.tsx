"use client";

import { useMutation } from "@tanstack/react-query";
import { useParams } from "next/navigation";

import { CircleButtonInset } from "../../../../components/Form/button";

const putPollVote = async (eventId, pollId, optionId) => {
  const res = await fetch(`/events/${eventId}/polls/${pollId}/vote`, {
    method: "PUT",
    body: JSON.stringify({ optionId }),
  });
  const data = await res.json();
  return data;
};

const BasicPoll = ({ name, value, color, IconProp, pollId, optionId }) => {
  const { id } = useParams();
  const { mutate: updatePollVote } = useMutation({
    mutationFn: () => putPollVote(id, pollId, optionId),
    onSuccess: (e) => console.log(e),
  });
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
        <CircleButtonInset onClick={updatePollVote}>
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
