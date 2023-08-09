import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";

export type NewPollPayload = typeof defaultValues;

const defaultValues = {
  question: "",
  options: [
    {
      text: "",
    },
    {
      text: "",
    },
    {
      text: "",
    },
  ],
};

const postPoll = async (id: string, data: NewPollPayload) => {
  const res = await fetch(`/api/events/${id}/polls`, {
    method: "POST",
    body: JSON.stringify(data),
  });
  const { poll } = await res.json();

  return poll;
};

export const useNewPoll = (eventId) => {
  const { mutate: createPoll } = useMutation({
    mutationFn: (data: NewPollPayload) => postPoll(eventId, data),
    onSuccess: (res) => console.log("API SUCCESS:", res),
  });

  const newPollForm = useForm({
    defaultValues,
  });

  const onSubmit = newPollForm.handleSubmit((data) => {
    console.log("SUBMIT:", data);
    createPoll(data);
  });

  return { form: newPollForm, createPoll, submit: onSubmit };
};

const getPoll = async (eventId, pollId) => {
  const res = await fetch(`/api/events/${eventId}/polls/${pollId}`);
  const poll = await res.json();
  return poll;
};

export const usePoll = (eventId, pollId, initialData = undefined) => {
  const pollQuery = useQuery({
    queryKey: ["poll", pollId],
    queryFn: () => getPoll(eventId, pollId),
  });
  return { data: pollQuery.data };
};
