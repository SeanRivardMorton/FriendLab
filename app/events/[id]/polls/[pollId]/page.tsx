"use client";
import BottomTray from "../../../../components/BottomTray";
import ButtonTray from "../../../../components/ButtonTray";
import DeleteButton from "../../../../components/DeleteButton.tsx";
import { usePoll } from "../usePoll";

const UpdatePollPage = ({ params }) => {
  const { id, pollId } = params;
  const { data } = usePoll(id, pollId);

  return (
    <>
      <ButtonTray href={`/events/${id}/edit`}>
        <h2>Update Poll</h2>
      </ButtonTray>
      <form className="mx-2 my-4">
        <label className="label-text">Poll Question:</label>
        <input
          type="text"
          className="input-bordered input my-2 w-full"
          defaultValue={data?.question}
        />
        {data?.options.map((option, i) => (
          <div key={option.id}>
            <label className="label-text">Poll Option {i + 1}:</label>
            <input
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
          returnUrl={`/events/${id}/edit`}
          deleteUrl={`/api/events/${id}/polls/${pollId}`}
        />
      </BottomTray>
    </>
  );
};

export default UpdatePollPage;
