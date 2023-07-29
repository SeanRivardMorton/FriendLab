"use client";

const SettingsForm = () => {
  return (
    <form>
      <div className="form-control mt-6">
        <label className="label">
          <span className="label-text">Display Name</span>
        </label>
        <input
          type="text"
          placeholder="Name"
          className="input input-bordered"
        />
      </div>
    </form>
  );
};

export default SettingsForm;
