"use client";
import { BarChartIcon } from "@radix-ui/react-icons";
import React from "react";

import BottomTray from "../../../components/BottomTray";
import ButtonTray from "../../../components/ButtonTray";
import { CircleButtonInset } from "../../../components/Form/button";
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
        <p>{form.getValues("description")}</p>
      </div>
      <div className="divider"></div>
      <form onBlur={handleSubmit} className="form-control">
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
      </form>
      <BottomTray>
        <CircleButtonInset>
          <BarChartIcon
            onClick={addPoll}
            className="h-8 w-8 rotate-90 text-primary"
          />
        </CircleButtonInset>
        {/* <CircleButtonInset>
          <PlusIcon className="h-8 w-8 text-success" />
        </CircleButtonInset> */}
      </BottomTray>
    </>
  );
};

export default ClientEventSettingsPage;

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
