import { forwardRef, type ComponentPropsWithRef } from "react";
import { NavLink } from "@remix-run/react";
import { twMerge } from "tailwind-merge";

interface AnchorProps extends ComponentPropsWithRef<typeof NavLink> {
  children: React.ReactNode;
  className?: string;
}

export const InternalLink = forwardRef<HTMLAnchorElement, AnchorProps>(
  function InternalLink({ className, ...props }, ref) {
    return (
      // eslint-disable-next-line jsx-a11y/anchor-has-content
      <NavLink
        {...props}
        ref={ref}
        className={twMerge(
          // .link defined in styles/base.css
          "link",
          className
        )}
      />
    );
  }
);
