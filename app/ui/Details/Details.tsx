import React from "react";
import { twMerge } from "tailwind-merge";

interface DetailsRootProps extends React.ComponentPropsWithRef<"details"> {}

const DetailsRoot = React.forwardRef<HTMLDetailsElement, DetailsRootProps>(
  function DetailsRoot(props, ref) {
    return (
      <details {...props} ref={ref} className={twMerge(props.className)} />
    );
  }
);

interface DetailsSummaryProps extends React.ComponentPropsWithRef<"summary"> {}

const DetailsSummary = React.forwardRef<HTMLElement, DetailsSummaryProps>(
  function DetailsSummary(props, ref) {
    return (
      <summary
        {...props}
        ref={ref}
        className={twMerge("cursor-pointer", props.className)}
      />
    );
  }
);

export const Details = {
  Root: DetailsRoot,
  Summary: DetailsSummary,
} as const;
