import React from "react";
import { twMerge } from "tailwind-merge";

type DialogRootProps = React.ComponentPropsWithRef<"dialog">;

const Root = React.forwardRef<HTMLDialogElement, DialogRootProps>(
  function DialogRoot(props, ref) {
    return (
      <dialog {...props} ref={ref} className={twMerge("", props.className)} />
    );
  }
);

type DialogCloseButtonProps = React.ComponentPropsWithRef<"button">;

const CloseButton = React.forwardRef<HTMLButtonElement, DialogCloseButtonProps>(
  function DialogCloseButton(props, ref) {
    return (
      <form method="dialog">
        <button {...props} ref={ref} className={twMerge("", props.className)} />
      </form>
    );
  }
);

export const NativeDialog = {
  Root,
  CloseButton,
  Title: "p",
} as const;
