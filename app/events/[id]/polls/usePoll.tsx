import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
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
  const router = useRouter();
  const { mutate: createPoll, isLoading } = useMutation({
    mutationFn: (data: NewPollPayload) => postPoll(eventId, data),
    onSuccess: (res) => router.push(`/events/${eventId}/edit`),
  });

  const newPollForm = useForm({
    defaultValues,
  });

  const onSubmit = newPollForm.handleSubmit((data) => {
    createPoll(data);
  });

  return { form: newPollForm, createPoll, submit: onSubmit, isLoading };
};

export const getPoll = async (eventId, pollId) => {
  const res = await fetch(`/api/events/${eventId}/polls/${pollId}`);
  const poll = await res.json();
  return poll;
};

const putPoll = async (eventId, pollId, data) => {
  const res = await fetch(`/api/events/${eventId}/polls/${pollId}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
  const poll = await res.json();

  return poll;
};

export const usePoll = (eventId, pollId, initialData) => {
  const pollQuery = useQuery({
    queryKey: ["poll", pollId],
    queryFn: () => getPoll(eventId, pollId),
    initialData,
  });

  const form = useForm({
    defaultValues: initialData || pollQuery.data,
  });

  const { mutate: updatePoll } = useMutation({
    mutationFn: (data: NewPollPayload) => putPoll(eventId, pollId, data),
    onSuccess: (res) => console.log("API SUCCESS:", res),
  });

  const onSubmit = form.handleSubmit((data) => {
    updatePoll(data);
  });

  return { data: pollQuery.data, form, onSubmit };
};
