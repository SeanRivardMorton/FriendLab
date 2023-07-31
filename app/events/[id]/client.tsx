"use client";

import { CheckIcon, Cross1Icon } from "@radix-ui/react-icons";
import { Event } from "../../api/events/getEventById";
import React from "react";

interface ClientEventPageProps {
  event: Event;
}

const ClientEventPage: React.FC<ClientEventPageProps> = ({ event }) => {
  const date = event?.date && new Date(event.date).toDateString();
  return (
    <>
      <div className="flex flex-row justify-between">
        <div className="card card-compact">
          <div className="card-body">
            <div className="card-title">{event.description}</div>
            <p>Date: {date}</p>
            <div className="divider"></div>
            <div className="card-title">Can you make it?</div>
            <div className="">
              <button className="btn btn-circle text-error">
                <Cross1Icon className="h-8 w-8" />
              </button>
              <button className="btn btn-circle text-success">
                <CheckIcon className="h-8 w-8" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ClientEventPage;
