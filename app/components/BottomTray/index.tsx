interface BottomTray {
  children?: React.ReactNode;
}

const BottomTray: React.FC<BottomTray> = ({ children }) => {
  return (
    <div className="flex flex-row justify-end mb-8 mt-4">
      <div className="card card-compact bg-base-200 transition rounded-s-full lg:translate-x-2 shadow-xl shadow-base-100">
        <div className="card-body">
          <div className="card-actions">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default BottomTray;
