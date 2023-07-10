import Image from "next/image";
import Beaker from "./assets/vial.svg";

export default function Home() {
  return (
    <main>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">
              Welcome to <br /> Friend lab!
            </h1>
            <Image
              className="m-auto my-4 rotate-12"
              width={80}
              height={80}
              alt="vial"
              src={Beaker}
            />
            <button className="btn btn-primary">Join Waitlist</button>
          </div>
        </div>
      </div>
    </main>
  );
}
