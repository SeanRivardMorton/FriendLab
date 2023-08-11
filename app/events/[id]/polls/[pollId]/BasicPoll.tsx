"use client";

import { CheckCircledIcon } from "@radix-ui/react-icons";
import { useMutation } from "@tanstack/react-query";
import { useParams } from "next/navigation";

import Avatar from "../../../../components/Avatar";
import { CircleButtonInset } from "../../../../components/Form/button";

const putPollVote = async (eventId, pollId, optionId) => {
  const res = await fetch(`/events/${eventId}/polls/${pollId}/vote`, {
    method: "PUT",
    body: JSON.stringify({ optionId }),
  });
  const data = await res.json();
  return data;
};

const BasicPoll = ({ option, color = "red", totalOptions }) => {
  const { id } = useParams();
  const { mutate: updatePollVote } = useMutation({
    mutationFn: () => putPollVote(id, option.pollId, option.id),
    onSuccess: (e) => console.log(e),
  });

  const usersThatHaveVoted = option.pollVote.map((vote) => vote.user);

  const value =
    option._count.pollVote === 0
      ? 0
      : (option._count.pollVote / totalOptions) * 100;

  return (
    <>
      <div
        style={{ width: `${value}%` }}
        className="my-2 flex min-w-min flex-row justify-between rounded-r-full bg-base-200 py-2 pl-2 pr-2 shadow-md"
      >
        <div className="flex w-full flex-col">
          <h3 style={{ color: `${color}` }} className="my-0">
            {option.text}
          </h3>
          <div
            style={{ borderColor: `${color}` }}
            className="mt-1 w-full rounded-full border-2"
          ></div>
        </div>

        <div className="my-auto flex flex-row">
          <div style={{ color: `${color}` }} className="mx-2 my-auto">
            {Math.floor(value)}%
          </div>
          <CircleButtonInset onClick={updatePollVote}>
            <CheckCircledIcon
              style={{ color: `${color}` }}
              className="my-auto h-8 w-8 text-success"
            />
          </CircleButtonInset>
        </div>
      </div>
      {usersThatHaveVoted.length > 0 && (
        <div className="ml-2 flex flex-row">
          {usersThatHaveVoted.map((user) => (
            <Avatar
              className="my-auto h-8 w-8"
              key={user?.id}
              src={user?.image}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default BasicPoll;
