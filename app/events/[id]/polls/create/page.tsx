"use client";
import { CheckIcon } from "@radix-ui/react-icons";
import { useParams } from "next/navigation";

import BottomTray from "../../../../components/BottomTray";
import ButtonTray from "../../../../components/ButtonTray";
import { CircleButtonInset } from "../../../../components/Form/button";
import useNewPoll from "../usePoll";

const PollPage = () => {
  const params = useParams();
  const { form, submit } = useNewPoll(params.id);
  return (
    <>
      <ButtonTray href={`/events/${params.id}/edit`}>
        <h2>New Poll</h2>
      </ButtonTray>
      <form onSubmit={submit} className="mx-2 my-4">
        <label className="label-text">Poll Question:</label>
        <input
          {...form.register("question")}
          type="text"
          className="input-bordered input my-2 w-full"
        />
        <label className="label-text">Poll Option 1:</label>
        <input
          {...form.register("options.0.text")}
          type="text"
          className="input-bordered input my-2 w-full"
        />
        <label className="label-text">Poll Option 2:</label>
        <input
          {...form.register("options.1.text")}
          type="text"
          className="input-bordered input my-2 w-full"
        />
        <label className="label-text">Poll Option 3:</label>
        <input
          {...form.register("options.2.text")}
          type="text"
          className="input-bordered input my-2 w-full"
        />
        <BottomTray>
          <CircleButtonInset>
            <CheckIcon className="h-8 w-8 text-success" />
          </CircleButtonInset>
        </BottomTray>
      </form>
    </>
  );
};

export default PollPage;
