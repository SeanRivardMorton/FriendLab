import ClientProtectedPage from "../protected/client/page";

const EventsPage = () => {
  return (
    <ClientProtectedPage>
      <div className="card w-11/12 mx-auto mt-4 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Upcoming Events</h2>
          <p>You have no upcoming events</p>
        </div>
      </div>
    </ClientProtectedPage>
  );
};

export default EventsPage;
