"use client";
import { useForm } from "react-hook-form";
import { useParams, useRouter } from "next/navigation";
import { useMutation, useQuery } from "@tanstack/react-query";
import { EventWithAttendees } from "../../api/events/getEventById";
import { FrienshipWithFriends } from "../../api/friends/getUserFriends";
// import { Friendship } from "@prisma/client";

const getEventById = async (id: string): Promise<EventWithAttendees> => {
  const event = fetch(`/api/events/${id}`).then((res) => res.json());
  return event;
};

const updateEventById = async (
  data: EventWithAttendees
): Promise<EventWithAttendees> => {
  const event = fetch(`/api/events/${data.id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  }).then((res) => res.json());
  return event;
};

interface UpdateEventFormProps {
  event: EventWithAttendees;
  friends: FrienshipWithFriends[];
}

const UpdateEventForm: React.FC<UpdateEventFormProps> = ({
  event,
  friends,
}) => {
  const params = useParams();
  const router = useRouter();
  const { data } = useQuery({
    queryFn: () => getEventById(event.id),
    queryKey: ["event", params?.id],
    initialData: event,
  });

  const mutate = useMutation({
    mutationFn: updateEventById,
    mutationKey: ["event", params?.id],
    onSuccess: () => {
      router.push("/events");
    },
  });

  const form = useForm({
    defaultValues: {
      ...data,
    },
  });

  const onSubmit = form.handleSubmit((data) => {
    mutate.mutate(data);
    // console.log(data);
  });

  return (
    <form onSubmit={onSubmit}>
      <div className="form-control">
        <label className="label">
          <span className="label-text">Name</span>
        </label>
        <input
          {...form.register("name")}
          className="input input-bordered"
          placeholder="Name"
        />
        <label className="label">
          <span className="label-text">Description</span>
        </label>
        <input
          {...form.register("description")}
          className="input input-bordered"
          placeholder="description"
        />
        <label className="label">
          <span className="label-text">Location</span>
        </label>
        <input
          {...form.register("location")}
          className="input input-bordered"
          placeholder="location"
        />
        <>
          {event.attendees &&
            event.attendees.map((attendee) => {
              return <div key={attendee.id}>{attendee.name}</div>;
            })}
        </>
        <label className="label">
          <span className="label-text">Attendee</span>
        </label>
        <select
          className="select select-bordered"
          {...form.register(`attendees.${0}.id`)}
          defaultValue={event?.attendees[0]?.id}
        >
          <option disabled>Pick one</option>
          {friends.map((friend) => {
            return (
              <option key={friend.friend.id} value={friend.friend.id}>
                {friend.friend.name}
              </option>
            );
          })}
        </select>
      </div>

      <div className="w-full mt-8">
        <div className="h-4">
          {mutate.isLoading && (
            <progress className="progress my-2 mx-auto"></progress>
          )}
        </div>
        <button className="mt-2 btn btn-primary w-full">Update</button>
      </div>
    </form>
  );
};

export default UpdateEventForm;
