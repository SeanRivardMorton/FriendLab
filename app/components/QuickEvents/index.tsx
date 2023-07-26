import Image from "next/image";
import Vial from "../../assets/vial.svg";
import theme from "daisyui/src/theming/themes";
import Link from "next/link";

// surely there is a better way than this?
const { primary } = theme["[data-theme=luxury]"];

const QuickEvents = ({ event }) => {
  const date = new Date(event.date).toLocaleString();
  return (
    <div className="hero">
      <div className="hero-content text-center">
        <div className="max-w-md flex flex-col">
          <h1 className="text-5xl font-bold">Next Event</h1>
          <h2 className="text-primary">{event.name}</h2>
          <Link
            href={`/events/${event.id}`}
            style={{ boxShadow: `${primary} 0px 0px 10px` }}
            className="btn mx-auto w-fill border-white border-dashed border-2 rounded-full h-32 w-32 my-6 shadow-primary"
          >
            <Image
              src={Vial}
              height={44}
              width={44}
              alt="logo"
              className="rotate-12 mx-auto"
            />
          </Link>
          <span className="mb-2">{date}</span>
          <Link href={`/events/${event.id}`} className="btn btn-primary">
            View
          </Link>
        </div>
      </div>
    </div>
  );
};

export default QuickEvents;