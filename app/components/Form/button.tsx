import Link from "next/link";

export const CircleButton = ({ children, ...props }) => (
  <button className="btn btn-circle bg-base-200" {...props}>
    {children}
  </button>
);

export const CircleButtonLink = ({ children, href = "/", ...props }) => (
  <Link href={href} className="btn btn-circle bg-base-200">
    {children}
  </Link>
);

export const CircleButtonLinkInset = ({ children, href = "/", ...props }) => (
  <Link href={href} className="btn btn-circle bg-base-100" {...props}>
    {children}
  </Link>
);

export const CircleButtonInset = ({
  children,
  isLoading = false,
  ...props
}) => {
  if (isLoading) {
    return (
      <button
        className={`btn btn-circle bg-base-200 animate-pulse ${{
          ...props?.className,
        }}`}
        {...props}
      >
        <span className="loading loading-spinner loading-md"></span>
      </button>
    );
  }

  return (
    <button
      className={`btn btn-circle bg-base-200 ${props?.small ? "btn-sm" : ""}`}
      {...props}
    >
      {children}
    </button>
  );
};
