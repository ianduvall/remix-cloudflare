import { NavLink } from "@remix-run/react";
import React from "react";

interface AnchorProps extends React.ComponentPropsWithRef<typeof NavLink> {
  children: React.ReactNode;
}

export const A = React.forwardRef<HTMLAnchorElement, AnchorProps>(function A(
  props,
  ref
) {
  return (
    // eslint-disable-next-line jsx-a11y/anchor-has-content
    <NavLink
      {...props}
      ref={ref}
      className={[
        // .link defined in styles/base.css
        "link",
        props.className,
      ]
        .filter(Boolean)
        .join(" ")}
    />
  );
});
