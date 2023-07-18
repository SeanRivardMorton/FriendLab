import { useDialog } from "react-aria";
import React from "react";

export function Dialog({ title, children, ...props }) {
  // these components suck
  let ref: any = React.useRef();
  let { dialogProps } = useDialog(props, ref);

  return (
    <div {...dialogProps} ref={ref}>
      {children}
    </div>
  );
}
