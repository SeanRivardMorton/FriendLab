"use client";
import BottomTray from "../../../../components/BottomTray";
import ButtonTray from "../../../../components/ButtonTray";
import DeleteButton from "../../../../components/DeleteButton.tsx";
import { usePoll } from "../usePoll";

const ClientUpdatePollPage = ({ eventId, pollId, poll }) => {
  const { data, form, onSubmit } = usePoll(eventId, pollId, poll);

  return (
    <>
      <ButtonTray href={`/events/${eventId}/edit`}>
        <h2>Update Poll</h2>
      </ButtonTray>
      <form onBlur={onSubmit} className="mx-2 my-4">
        <label className="label-text">Poll Question:</label>
        <input
          type="text"
          className="input-bordered input my-2 w-full"
          defaultValue={data?.question}
          {...form.register("question")}
        />
        {data?.options.map((option, i) => (
          <div key={option.id}>
            <label className="label-text">Poll Option {i + 1}:</label>
            <input
              {...form.register(`options.${i}.text`)}
              key={i}
              type="text"
              className="input-bordered input my-2 w-full"
              defaultValue={option.text}
            />
          </div>
        ))}
      </form>
      <BottomTray>
        <DeleteButton
          returnUrl={`/events/${eventId}/edit`}
          deleteUrl={`/api/events/${eventId}/polls/${pollId}`}
        />
      </BottomTray>
    </>
  );
};

export default ClientUpdatePollPage;
