import React from "react";
import { ForwardedRef, MutableRefObject, useRef } from "react";
import { useButton, useFocusRing, mergeProps } from "react-aria";

export function CalendarButton(props) {
  // annoying typing
  const ref: any = useRef();
  const { buttonProps } = useButton(props, ref);
  const { focusProps, isFocusVisible } = useFocusRing();
  return (
    <button
      {...mergeProps(buttonProps, focusProps)}
      ref={ref}
      className={`p-2 rounded-full ${props.isDisabled ? "text-gray-400" : ""} ${
        !props.isDisabled ? "hover:bg-violet-100 active:bg-violet-200" : ""
      } outline-none ${
        isFocusVisible ? "ring-2 ring-offset-2 ring-purple-600" : ""
      }`}
    >
      {props.children}
    </button>
  );
}

export function FieldButton(props) {
  // again.. headache
  let ref: any = useRef();
  let { buttonProps, isPressed } = useButton(props, ref);
  return (
    <button
      {...buttonProps}
      ref={ref}
      className={`px-2 -ml-px border transition-colors rounded-r-md outline-none ${
        isPressed || props.isPressed
          ? "bg-primary border-base-100"
          : "bg-primary border-base-100 group-hover:border-gray-400"
      }`}
    >
      {props.children}
    </button>
  );
}
