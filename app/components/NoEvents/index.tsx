// import Vial from "../../../../../public/vial.svg";
import Image from "next/image";
import Link from "next/link";

const NoEvents = () => {
  return (
    <div className="hero">
      <div className="hero-content text-center">
        <div className="max-w-md flex flex-col">
          <h1 className="text-5xl font-bold">No Events</h1>
          <Link
            href="/events/create"
            className="btn mx-auto w-fill border-white border-dashed border-2 rounded-full h-32 w-32 my-6"
          >
            <Image
              src={"vial.svg"}
              height={44}
              width={44}
              alt="logo"
              className="rotate-12 mx-auto"
            />
          </Link>
          <Link href="/events/create" className="btn btn-primary">
            Create New Event
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NoEvents;
