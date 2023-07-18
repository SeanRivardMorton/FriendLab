import { useRef } from "react";
import { useDateFieldState } from "react-stately";
import { useDateField, useDateSegment, useLocale } from "react-aria";
import { createCalendar } from "@internationalized/date";

export function DateField(props) {
  let { locale } = useLocale();
  let state = useDateFieldState({
    ...props,
    locale,
    createCalendar,
  });

  let ref: any = useRef();
  let { fieldProps } = useDateField(props, state, ref);

  return (
    <div {...fieldProps} ref={ref} className="flex">
      {state.segments.map((segment, i) => (
        <DateSegment key={i} segment={segment} state={state} />
      ))}
    </div>
  );
}

function DateSegment({ segment, state }) {
  // TOOD: Refactor all these react-aria
  let ref: any = useRef();
  let { segmentProps } = useDateSegment(segment, state, ref);

  return (
    <div
      {...segmentProps}
      ref={ref}
      style={{
        ...segmentProps.style,
        minWidth:
          (segment.maxValue != null &&
            String(segment.maxValue).length + "ch") ||
          "",
      }}
      className={`px-0.5 box-content tabular-nums text-right outline-none rounded-sm text-primary focus:bg-primary focus:text-base-100 group ${
        !segment.isEditable ? "text-gray-500" : "text-primary"
      }`}
    >
      {/* Always reserve space for the placeholder, to prevent layout shift when editing. */}
      <span
        aria-hidden="true"
        className="block w-full text-center italic text-primary group-focus:text-white"
        style={{
          visibility: segment.isPlaceholder ? undefined : "hidden",
          height: segment.isPlaceholder ? "" : 0,
          pointerEvents: "none",
        }}
      >
        {segment.placeholder}
      </span>
      {segment.isPlaceholder ? "" : segment.text}
    </div>
  );
}
