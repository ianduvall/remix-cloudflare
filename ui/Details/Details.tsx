import { forwardRef } from "react";
import type { ComponentPropsWithRef } from "react";
import { twMerge } from "tailwind-merge";
import { useOpenAttributeState } from "ui/useOpenAttribute";

interface DetailsRootProps extends ComponentPropsWithRef<"details"> {}

const DetailsRoot = forwardRef<HTMLDetailsElement, DetailsRootProps>(
  function DetailsRoot(props, ref) {
    return (
      <details
        {...props}
        ref={ref}
        open={props.open || undefined}
        className={twMerge(props.className)}
      />
    );
  }
);

interface DetailsSummaryProps extends ComponentPropsWithRef<"summary"> {}

const DetailsSummary = forwardRef<HTMLElement, DetailsSummaryProps>(
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

  useOpenState: useOpenAttributeState,
} as const;
