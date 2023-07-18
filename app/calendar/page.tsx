import { DateRangePicker } from "../components/datepicker/DateRange";

const CalendarPage = () => {
  return (
    <div className="card">
      <div className="card-body">
        <h1>Calendar</h1>
        <DateRangePicker />
      </div>
    </div>
  );
};

export default CalendarPage;
