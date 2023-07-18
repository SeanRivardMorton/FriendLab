import { LightningBoltIcon } from "@radix-ui/react-icons";

const NewEventsPage = () => {
  return (
    <div className="card w-11/12 mx-auto mt-4 bg-base-100 shadow-xl">
      <div className="card-body">
        <h1 className="text-xl">New Event</h1>
        <form className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Event Title</span>
          </label>
          <input
            type="text"
            placeholder="Pub, Movie, Walk, etc."
            className="input input-bordered w-full max-w-xs"
          />
          <br></br>
          <label className="label">
            <span className="label-text">What&apos;s it about?</span>
          </label>
          <input
            type="text"
            placeholder="Celebrating Summer"
            className="input input-bordered w-full max-w-xs"
          />
          <br></br>
          <label className="label">
            <span className="label-text">Where?</span>
          </label>
          <input
            type="text"
            placeholder="Good Mixer, Camden"
            className="input input-bordered w-full max-w-xs"
          />
          <br></br>
          <label className="label">
            <span className="label-text">Time?</span>
          </label>
          <input
            type="text"
            placeholder="Next Wednesday, 7pm"
            className="input input-bordered w-full max-w-xs"
          />
          <br></br>
          <label className="label">
            <span className="label-text">Who&apos;s coming?</span>
          </label>
          <input
            type="text"
            placeholder="Bob, Alice, etc."
            className="input input-bordered w-full max-w-xs"
          />
          <button type="button" className="btn btn-primary mt-8 mx-auto">
            <LightningBoltIcon />
            Save Event
            <LightningBoltIcon />
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewEventsPage;
