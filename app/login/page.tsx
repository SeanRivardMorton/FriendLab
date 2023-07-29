import Image from "next/image";
import Link from "next/link";
import { getSession } from "../api/getSession";

const LoginPage = async () => {
  const session = await getSession();

  if (session) {
    return (
      <div className="card">
        <div className="card-body">
          <div className="card-title mb-4">You&apos;re already logged in!</div>
        </div>
      </div>
    );
  }

  return (
    <div className="hero min-h-screen">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <div className="card">
            <div className="card-body">
              <div className="flex flex-row">
                <h1 className="text-4xl">Friend Lab</h1>
                <Image
                  className=" ml-4 mb-8"
                  src={"/vial.svg"}
                  height={20}
                  width={20}
                  alt=""
                />
              </div>
              <div className="card-title mb-4">You&apos;re not logged in!</div>
              <Link href="/api/auth/signin" className="btn btn-primary">   {/* Please can you make this non-uppercase? Inheriting from btn class */}
                Register
              </Link>
              <div className="divider"></div>
              <Link
                href="/api/auth/signin"
                className="btn btn-primary btn-link" 
              >  {/* Please can you make this non-uppercase? Inheriting from btn class */}
                Login
              </Link> 
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
