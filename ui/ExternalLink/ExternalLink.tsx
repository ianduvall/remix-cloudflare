import { forwardRef, type ComponentPropsWithRef } from "react";
import { twMerge } from "tailwind-merge";

interface ExternalLinkProps extends ComponentPropsWithRef<"a"> {}

export const ExternalLink = forwardRef<HTMLAnchorElement, ExternalLinkProps>(
  function ExternalLink({ className, children, ...props }, ref) {
    return (
      <>
        {/* eslint-disable-next-line jsx-a11y/anchor-has-content */}
        <a
          target="_blank"
          rel="noopener noreferrer"
          {...props}
          ref={ref}
          className={twMerge(
            // .link defined in styles/base.css
            "link before:mr-1 before:content-['↗']",
            className
          )}
        >
          {children}
        </a>
      </>
    );
  }
);
