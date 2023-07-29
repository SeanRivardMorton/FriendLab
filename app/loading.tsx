export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div className="hero min-h-screen lg:min-h-[60vh]">
      <div className="hero-content text-center bg-base-100 rounded-xl shadow-xl shadow-base-100">
        <div className="max-w-md ">
          <div className="w-32 h-32 bg-base-200 rounded-full flex flex-col justify-center animate-pulse">
            <span className="loading mx-auto w-git loading-lg"></span>
          </div>
        </div>
      </div>
    </div>
  );
}
