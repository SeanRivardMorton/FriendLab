"use client";
import { BarChartIcon, Pencil1Icon } from "@radix-ui/react-icons";

import BottomTray from "../../../components/BottomTray";
import ButtonTray from "../../../components/ButtonTray";
import DeleteButton from "../../../components/DeleteButton.tsx";
import { CircleButtonLinkInset } from "../../../components/Form/button";
import useEventSettings from "./useEventSettings";

const ClientEventSettingsPage = (props) => {
  const { event, addPoll, form, handleSubmit } = useEventSettings(props.event);
  return (
    <>
      <ButtonTray
        href={`/events/${props.event?.id}`}
        actionSlot={<div className="w-8"></div>}
      >
        <h2>Edit Event</h2>
      </ButtonTray>
      <div className="prose mx-2 my-4">
        <h3>{form.getValues("name")}</h3>
        <h4 className="text-lg font-normal">{form.getValues("location")}</h4>
        <p>{form.getValues("description")}</p>
        {form.watch("poll").map((poll, i) => (
          <div key={poll.id}>
            <div className="flex flex-row justify-between">
              <h4 className="text-lg font-normal">{poll?.question}</h4>
              <div className="mx-4 flex flex-row justify-between rounded-full bg-base-200 p-4 px-3 shadow-xl">
                <CircleButtonLinkInset
                  href={`/events/${event.id}/polls/${poll.id}`}
                >
                  <Pencil1Icon className="my-auto h-8 w-8 rotate-90 text-primary" />
                </CircleButtonLinkInset>
              </div>
            </div>
            <ul>
              {poll?.options &&
                poll.options.map((option, j) => (
                  <li key={option.id}>
                    <p>{option?.text}</p>
                  </li>
                ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="divider"></div>

      <BottomTray>
        <CircleButtonLinkInset href={`/events/${event.id}/polls/create`}>
          <BarChartIcon
            onClick={addPoll}
            className="h-8 w-8 rotate-90 text-primary"
          />
        </CircleButtonLinkInset>
      </BottomTray>
    </>
  );
};

export default ClientEventSettingsPage;

// dead idea graveyard lol..
{
  /* <form onBlur={handleSubmit} className="form-control">
{form.watch("poll").map((poll, i) => (
  <div key={i} className="prose mx-2 w-full max-w-xs">
    <label className="label">
      <span className="label-text">Poll Question</span>
    </label>
    <input
      type="text"
      defaultValue={poll?.question}
      placeholder="Type here"
      className="input-bordered input w-full max-w-xs"
    />
    {poll?.options &&
      poll.options.map((option, j) => (
        <div key={j}>
          <label className="label">
            <span className="label-text">{option.text}</span>
          </label>
          <input
            defaultValue={option?.text}
            type="text"
            placeholder="Type here"
            className="input-bordered input w-full max-w-xs"
          />
        </div>
      ))}
    <div className="divider"></div>
  </div>
))}
</form> */
}

// I like the idea of this, but it's not quite right.
{
  /* <div className="mx-4 flex flex-row justify-end rounded-full bg-base-200 p-4 shadow-xl">
<div className="flex w-full flex-row justify-around">
  <div className="flex flex-row">
    <p className="my-auto mr-2">New Poll</p>
    <CircleButtonInset onClick={addPoll}>
      <BarChartIcon className="h-8 w-8 rotate-90 text-primary" />
    </CircleButtonInset>
  </div>
  <div className="divider divider-horizontal"></div>
  <div className="flex flex-row">
    <p className="my-auto mr-2">Invites</p>
    <CircleButtonInset>
      <PersonIcon className="h-8 w-8 text-secondary" />
    </CircleButtonInset>
  </div>
</div>
</div> */
}
