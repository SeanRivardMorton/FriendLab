import Vial from "../../assets/vial.svg";
import Image from "next/image";

const NoEvents = () => {
  return (
    <div className="hero">
      <div className="hero-content text-center">
        <div className="max-w-md flex flex-col">
          <h1 className="text-5xl font-bold">No Events</h1>
          <button className="btn mx-auto w-fill border-white border-dashed border-2 rounded-full h-32 w-32 my-6">
            <Image
              src={Vial}
              height={44}
              width={44}
              alt="logo"
              className="rotate-12 mx-auto"
            />
          </button>
          <button className="btn btn-primary">Create New Event</button>
        </div>
      </div>
    </div>
  );
};

export default NoEvents;
