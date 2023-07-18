import { LightningBoltIcon } from "@radix-ui/react-icons";

const SettingsPage = () => {
  return (
    <>
      <div className="card w-11/12 mx-auto mt-4 bg-base-100 shadow-xl">
        <div className="card-body">
          <h1 className="text-xl">Settings</h1>
          <form className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Username</span>
            </label>
            <input
              type="text"
              placeholder="Greg, Starlord, etc."
              className="input input-bordered w-full max-w-xs"
            />
            <br></br>
            <label className="label">
              <span className="label-text">Interests</span>
            </label>
            <input
              type="text"
              placeholder="Music, Movies, etc."
              className="input input-bordered w-full max-w-xs"
            />
            <br></br>
            <label className="label">
              <span className="label-text">Location</span>
            </label>
            <input
              type="text"
              placeholder="Camden, London, etc."
              className="input input-bordered w-full max-w-xs"
            />
            <br></br>
            <label className="label">
              <span className="label-text">
                What time are you generally available?
              </span>
            </label>
            <input
              type="text"
              placeholder="Week nights, weekends, etc."
              className="input input-bordered w-full max-w-xs"
            />
            <br></br>
            <label className="label">
              <span className="label-text">Allow Friends of Friends?</span>
            </label>
            <input
              type="text"
              placeholder="Yes"
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
    </>
  );
};

export default SettingsPage;
