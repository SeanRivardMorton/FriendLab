import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";

type Option = {
  text: string;
};

type defaults = {
  question: string;
  options: Option[];
};

const postDecisionPoll = async (id, data) => {
  const res = await fetch(`/api/events/${id}`, {
    method: "POST",
    body: JSON.stringify({ poll: data }),
  });
  const { event } = await res.json();
  return event;
};

const useNewDecisionPoll = (initialData) => {
  const { id } = useParams();
  const eventQuery = useQuery({
    queryKey: ["event", id],
    queryFn: () => fetch(`/api/events/${id}`).then((res) => res.json()),
    onSuccess: (res) => console.log("success", res),
    initialData: initialData.poll?.[0],
  });

  const form = useForm({
    defaultValues: eventQuery.data,
  });
  const mutate = useMutation({
    mutationFn: (data: defaults) => postDecisionPoll(id, data),
    onSuccess: (res) => console.log("success", res),
  });

  const submitForm = form.handleSubmit((data) => {
    if (data.poll[0].question.length > 0 && !data.poll[0].options) {
      form.setValue(`poll.${0}.options`, [{ text: "" }]);
    }
    if (data.poll[0].options?.length > 0) {
      const optionsLength = data.poll[0].options.length - 1;
      if (data.poll[0].options[optionsLength].text !== "") {
        form.setValue(`poll.${0}.options.${optionsLength + 1}`, { text: "" });
      }
    }
  });

  return {
    form,
    submitForm,
    data: eventQuery.data.event,
    isLoading: eventQuery.isLoading,
  };
};

const NewDecisionPoll = ({ event }) => {
  const { form, submitForm, isLoading } = useNewDecisionPoll(event);

  const poll =
    form.watch("poll").length === 0
      ? [{ question: "" }, ...form.watch("poll")]
      : form.watch("poll");

  return (
    <>
      {isLoading && <div>Loading...</div>}
      <div className="flex flex-row">
        <div className="card card-compact w-screen px-0">
          <div className="card-body">
            <div className="card-title">New Poll</div>
            <form onBlur={submitForm}>
              <div className="form-control prose">
                {poll.map((poll, idx) => {
                  return (
                    <div key={idx}>
                      <label className="label">
                        <span className="label-text">Question</span>
                      </label>
                      <input
                        defaultValue={poll.question}
                        type="text"
                        placeholder="Title"
                        className="input-bordered input"
                        {...form.register(`poll.${idx}.question`)}
                      />
                      {poll.options?.map((option, idx) => {
                        return (
                          <div key={idx} className="form-control">
                            <label className="label">
                              <span className="label-text">
                                Option {idx + 1}
                              </span>
                            </label>
                            <input
                              key={idx}
                              defaultValue={option.text}
                              type="text"
                              placeholder="Option"
                              className="input-bordered input"
                              {...form.register(
                                `poll.${idx}.options.${idx}.text`,
                              )}
                            />
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewDecisionPoll;

{
  /* <label className="label">
                  <span className="label-text">Question</span>
                </label>
                <input
                  defaultValue={form.watch("poll[0].question")}
                  type="text"
                  placeholder="Title"
                  className="input-bordered input"
                  {...form.register("question")}
                />
                {poll.map((option, idx) => {
                  return (
                    <div key={idx} className="form-control">
                      <label className="label">
                        <span className="label-text">Option {idx + 1}</span>
                      </label>
                      <input
                        key={idx}
                        defaultValue={option.text}
                        type="text"
                        placeholder="Option"
                        className="input-bordered input"
                        {...form.register(`poll[0].options.${idx}.text`)}
                      />
                    </div>
                  );
                })} */
}
