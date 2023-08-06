"use client";

import { ResponseStatus } from "@prisma/client";
import {
  ChatBubbleIcon,
  CheckIcon,
  CircleIcon,
  Cross1Icon,
  PlusIcon,
} from "@radix-ui/react-icons";
import daisyuiColors from "daisyui/src/theming/themes";
import React from "react";
import colors from "tailwindcss/colors";

import Avatar from "../../components/Avatar";
import BottomTray from "../../components/BottomTray";
import ButtonTray from "../../components/ButtonTray";
import DeleteButton from "../../components/DeleteButton.tsx";
import {
  CircleButtonInset,
  CircleButtonLinkInset,
} from "../../components/Form/button";
import GroupUserAvatarsRow from "../../groups/GroupUserAvatarRow";
import BasicPoll from "./BasicPoll";
import { EventType } from "./page";

interface ClientEventPageProps {
  event: EventType;
}

export const responseIconMap = {
  [ResponseStatus.ACCEPTED]: <CheckIcon className="h-8 w-8 text-success" />,
  [ResponseStatus.DECLINED]: <Cross1Icon className="h-8 w-8 text-error" />,
  [ResponseStatus.MAYBE]: <ChatBubbleIcon className="h-8 w-8 text-warning" />,
  [ResponseStatus.PENDING]: <CircleIcon className="h-8 w-8" />,
};

const primary = daisyuiColors["[data-theme=dracula]"].primary;
const secondary = daisyuiColors["[data-theme=dracula]"].secondary;

const ClientEventPage: React.FC<ClientEventPageProps> = ({ event }) => {
  return (
    <main>
      <ButtonTray
        href="/events"
        actionSlot={
          <div className="ml-8">
            {event?.creator?.image && <Avatar src={event?.creator.image} />}
          </div>
        }
        secondarySlot={<div className="prose flex flex-col justify-end"></div>}
      >
        <div className="prose flex flex-col justify-center">
          <h2 className="mb-0">Event</h2>
          <p className="">{event?.date.toDateString()}</p>
        </div>
      </ButtonTray>
      <section className="prose">
        <h4>What Date Works for you?</h4>
        <BasicPoll
          name="Thursday"
          value={90}
          color={primary}
          IconProp={({ ...props }) => <CheckIcon {...props} />}
        />
        <BasicPoll
          name="Friday"
          value={31}
          color={secondary}
          IconProp={({ ...props }) => <Cross1Icon {...props} />}
        />

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
