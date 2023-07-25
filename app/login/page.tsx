import Link from "next/link";

const LoginPage = () => {
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">Welcome to Friend Lab.</h1>
          <div className="flex flex-col w-full border-opacity-50 mt-16">
            <Link href="/api/auth/signin" className="btn btn-primary">
              Login
            </Link>
            <div className="divider">OR</div>
            <Link href="/api/auth/signin" className="btn btn-primary">
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
