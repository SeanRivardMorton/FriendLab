"use client";

import { ResponseStatus } from "@prisma/client";
import {
  ChatBubbleIcon,
  CheckIcon,
  CircleIcon,
  Cross1Icon,
  Pencil1Icon,
} from "@radix-ui/react-icons";
import daisyuiColors from "daisyui/src/theming/themes";
import React from "react";

import Avatar from "../../components/Avatar";
import BottomTray from "../../components/BottomTray";
import ButtonTray from "../../components/ButtonTray";
import DeleteButton from "../../components/DeleteButton.tsx";
import { CircleButtonLink } from "../../components/Form/button";
import GroupUserAvatarsRow from "../../groups/GroupUserAvatarRow";
import { EventType } from "./page";
import BasicPoll from "./polls/[pollId]/BasicPoll";

interface ClientEventPageProps {
  event: EventType;
}

export const responseIconMap = {
  [ResponseStatus.ACCEPTED]: <CheckIcon className="h-8 w-8 text-success" />,
  [ResponseStatus.DECLINED]: <Cross1Icon className="h-8 w-8 text-error" />,
  [ResponseStatus.MAYBE]: <ChatBubbleIcon className="h-8 w-8 text-warning" />,
  [ResponseStatus.PENDING]: <CircleIcon className="h-8 w-8" />,
};

const primary = daisyuiColors["[data-theme=night]"].primary;
const secondary = daisyuiColors["[data-theme=night]"].secondary;

const ClientEventPage: React.FC<ClientEventPageProps> = ({ event }) => {
  const firstPoll = event?.poll[0];
  console.log(firstPoll);
  return (
    <main>
      <ButtonTray
        href="/events"
        actionSlot={
          <div className="ml-8">
            {event?.creator?.image && <Avatar src={event?.creator.image} />}
          </div>
        }
        secondarySlot={
          <div className="prose flex flex-col justify-end">
            <CircleButtonLink href={`/events/${event?.id}/edit`}>
              <Pencil1Icon className="h-8 w-8 text-secondary" />
            </CircleButtonLink>
          </div>
        }
      >
        <div className="prose flex flex-col justify-center">
          <h2 className="mb-0">Event</h2>
          <p className="">{event?.date.toDateString()}</p>
        </div>
      </ButtonTray>
      <section className="prose">
        <div>
          <h4>{firstPoll?.question}</h4>
          {firstPoll?.options.map((option) => {
            return (
              <BasicPoll
                // option={option}
                pollId={firstPoll?.id}
                optionId={option.id}
                key={option.id}
                name={option.text}
                value={90}
                color={primary}
                IconProp={({ ...props }) => <CheckIcon {...props} />}
              />
            );
          })}
        </div>

        <div className="mx-2">
          <h3>{event?.name}</h3>
          <p>{event?.description}</p>
          <div className="flex flex-row justify-end">
            <GroupUserAvatarsRow group={event?.group} />
            <p className="my-auto">{event?.location}</p>
          </div>
        </div>
        <div className="divider"></div>
      </section>
      <BottomTray>
        <DeleteButton
          deleteUrl={`/api/events/${event?.id}`}
          returnUrl="/events"
        />
        {/* <CircleButtonLinkInset href={`/events/${event?.id}/edit`}>
          <Cross1Icon className="h-8 w-8 text-error" />
        </CircleButtonLinkInset> */}
      </BottomTray>
    </main>
  );
};

export default ClientEventPage;
