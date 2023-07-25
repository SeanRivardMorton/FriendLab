import Link from "next/link";
import { useRouter } from "next/navigation";

const LoginPage = () => {
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
