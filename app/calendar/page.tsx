import { DateRangePicker } from "../components/datepicker/DateRange";

const CalendarPage = () => {
  return (
    <div className="card w-11/12 mx-auto mt-4 bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">When are you free?</h2>
        <DateRangePicker />
      </div>
    </div>
  );
};

export default CalendarPage;
