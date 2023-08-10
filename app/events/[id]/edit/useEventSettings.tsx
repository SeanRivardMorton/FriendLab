"use client";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

import { EventType } from "../../../api/events/getEventById";

const POLL_DEFAULTS = [
  {
    question: "This is a test",
    options: [
      {
        text: "Option 1",
      },
      {
        text: "Option 2",
      },
      {
        text: "Option 3",
      },
    ],
  },
];

const updateEvent = async (data) => {
  const res = await fetch(`/api/events/${data.id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
  const { event } = await res.json();
  return event;
};

const getEvent = async (id): Promise<EventType> => {
  const res = await fetch(`/api/events/${id}`);
  const { event } = await res.json();

  return event;
};

export type EventFormType = {
  name: string;
  description: string | null;
  location: string | null;
  poll: {
    id?: string;
    question?: string;
    options?: {
      text?: string;
      id?: string;
    }[];
  }[];
};

const useEventSettings = (event: EventType) => {
  const eventQuery = useQuery({
    queryKey: ["event", event?.id],
    queryFn: () => getEvent(event?.id),
    onSuccess: (res) => console.log("API SUCCESS:", res),
    initialData: event,
  });

  const { mutate: updateForm } = useMutation({
    mutationFn: (data: EventFormType) => updateEvent(data),
    onSuccess: (res) => console.log("API SUCCESS:", res),
  });

  const form = useForm<EventFormType>({
    defaultValues: event || {
      name: "",
      description: "",
      poll: [],
    },
  });

  const addPoll = () => {
    form.setValue("poll", POLL_DEFAULTS);
  };

  const handleSubmit = form.handleSubmit((data) => {
    updateForm(data);
  });

  return { event: eventQuery.data, form, addPoll, handleSubmit };
};

export default useEventSettings;
