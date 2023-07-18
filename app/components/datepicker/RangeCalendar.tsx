import { useRef } from "react";
import { useRangeCalendarState } from "react-stately";
import { useRangeCalendar, useLocale } from "react-aria";
import { createCalendar } from "@internationalized/date";
import { CalendarButton } from "./Button";
import { CalendarGrid } from "./CalendarGrid";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";

export function RangeCalendar(props) {
  let { locale, direction } = useLocale();

  let state = useRangeCalendarState({
    ...props,
    locale,
    createCalendar,
  });

  let ref: any = useRef();
  let { calendarProps, prevButtonProps, nextButtonProps, title } =
    useRangeCalendar(props, state, ref);

  return (
    <div
      lang={locale}
      dir={direction}
      {...calendarProps}
      ref={ref}
      className="inline-block"
    >
      <div className="flex items-center pb-4">
        <h2 className="flex-1 font-bold text-xl ml-2">{title}</h2>
        <CalendarButton {...prevButtonProps}>
          <ChevronLeftIcon className="h-6 w-6" />
        </CalendarButton>
        <CalendarButton {...nextButtonProps}>
          <ChevronRightIcon className="h-6 w-6" />
        </CalendarButton>
      </div>
      <CalendarGrid state={state} />
    </div>
  );
}
