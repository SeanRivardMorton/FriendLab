const FriendsPage = () => {
  return (
    <>
      <div className="card w-11/12 mx-auto mt-4 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Recently Active</h2>
          <p>Nobody&apos;s here...</p>
        </div>
      </div>
      <div className="card w-11/12 mx-auto mt-4 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Groups</h2>
          <p>You have not yet configured any groups</p>
        </div>
      </div>
      <div className="card w-11/12 mx-auto mt-4 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Friends</h2>
          <p>You have no friends</p>
        </div>
      </div>
    </>
  );
};

export default FriendsPage;
