import prisma from "../../../../../lib/prisma";
import ClientUpdatePollPage from "./client";

const getPoll = async (eventId, pollId) => {
  const event = await prisma.poll.findUnique({
    where: {
      id: pollId,
    },
    include: {
      options: true,
    },
  });

  return event;
};

const PollUpdatePage = async ({ params }) => {
  const { id, pollId } = params;
  const poll = await getPoll(id, pollId);

  return (
    <>
      <ClientUpdatePollPage poll={poll} eventId={id} pollId={pollId} />
    </>
  );
};

export default PollUpdatePage;
