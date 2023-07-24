export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <span className="loading loading-bars loading-lg"></span>
        </div>
      </div>
    </div>
  );
}
