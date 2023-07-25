import Vial from "../../assets/vial.svg";
import Image from "next/image";

const NoEvents = () => {
  return (
    <div className="hero">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">No Events</h1>
          <Image
            src={Vial}
            height={44}
            width={44}
            alt="logo"
            className="mx-auto my-8 border-2 rotate-12 border-white bg-base-200 rounded-full h-32 w-32 p-4 border-dashed"
          />
          <button className="btn btn-primary">Create New Event</button>
        </div>
      </div>
    </div>
  );
};

export default NoEvents;
