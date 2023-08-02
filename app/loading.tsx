export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div className="hero min-h-screen lg:min-h-[60vh]">
      <div className="hero-content rounded-xl bg-base-100 text-center shadow-xl shadow-base-100">
        <div className="max-w-md ">
          <div className="flex h-32 w-32 animate-pulse flex-col justify-center rounded-full bg-base-200">
            <span className="w-git loading loading-lg mx-auto"></span>
          </div>
        </div>
      </div>
    </div>
  );
}
