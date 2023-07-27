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
    <div className="card">
      <div className="card-body">
        <div className="card-title mb-4">You&apos;re not logged in!</div>
        <Link href="/api/auth/signin" className="btn btn-primary">
          Register
        </Link>
        <div className="divider"></div>
        <Link href="/api/auth/signin" className="btn btn-primary btn-link">
          Login
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
