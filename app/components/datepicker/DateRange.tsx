"use client";
import { useRef } from "react";
import { useDateRangePickerState } from "react-stately";
import { useDateRangePicker } from "react-aria";
import { FieldButton } from "./Button";
import { RangeCalendar } from "./RangeCalendar";
import { DateField } from "./DateField";
import { Popover } from "./Popover";
import { Dialog } from "./Dialog";
import { CalendarIcon, ExclamationTriangleIcon } from "@radix-ui/react-icons";

export function DateRangePicker(props) {
  let state = useDateRangePickerState(props);
  let ref: any = useRef();
  let {
    groupProps,
    labelProps,
    startFieldProps,
    endFieldProps,
    buttonProps,
    dialogProps,
    calendarProps,
  } = useDateRangePicker(props, state, ref);

  return (
    <div className="relative inline-flex flex-col text-left">
      <span {...labelProps} className="text-sm text-gray-800">
        {props.label}
      </span>
      <div {...groupProps} ref={ref} className="flex group">
        <div className="flex bg-white border border-base-100 group-hover:border-base-100 transition-colors rounded-l-md pr-10 group-focus-within:border-primary group-focus-within:group-hover:border-primary p-1 relative">
          <DateField {...startFieldProps} />
          <span aria-hidden="true" className="px-2">
            –
          </span>
          <DateField {...endFieldProps} />
          {state.validationState === "invalid" && (
            <ExclamationTriangleIcon className="w-6 h-6 text-red-500 absolute right-1" />
          )}
        </div>
        <FieldButton {...buttonProps} isPressed={state.isOpen}>
          <CalendarIcon className="w-5 h-5 text-gray-700 group-focus-within:text-primary" />
        </FieldButton>
      </div>
      {state.isOpen && (
        <Popover triggerRef={ref} state={state} placement="bottom start">
          <Dialog title="Pick" {...dialogProps}>
            <RangeCalendar {...calendarProps} />
          </Dialog>
        </Popover>
      )}
    </div>
  );
}
