import React from "react";
import ReactDOM from "react-dom";

interface DialogRootProps extends React.ComponentPropsWithRef<"div"> {
  container?: Element | DocumentFragment;
}

const Root = React.forwardRef<HTMLDivElement, DialogRootProps>(
  function DialogRoot({ container, ...props }, ref) {
    const node = (
      <div
        {...props}
        ref={ref}
        className="fixed inset-0 z-10 flex aria-hidden:hidden"
      />
    );
    // ssr
    if (typeof document === "undefined") {
      return node;
    }

    return ReactDOM.createPortal(node, container || document.body);
  }
);

interface DialogOverlayProps extends React.ComponentPropsWithRef<"div"> {}

const Overlay = React.forwardRef<HTMLDivElement, DialogOverlayProps>(
  function DialogOverlay(props, ref) {
    return (
      <div
        {...props}
        ref={ref}
        className="fixed inset-0 bg-black/25 backdrop-blur-md"
      />
    );
  }
);

interface DialogContentProps extends React.ComponentPropsWithRef<"div"> {}

const Content = React.forwardRef<HTMLDivElement, DialogContentProps>(
  function DialogContent(props, ref) {
    return (
      <div
        {...props}
        ref={ref}
        className={
          "not-prose relative z-10 m-auto -mb-4 w-11/12 max-w-screen-md rounded border border-gray-500 bg-white p-4 pb-8 md:mb-auto md:pb-4"
        }
      />
    );
  }
);

export const Dialog = {
  Root,
  Overlay,
  Content,
  Title: "p",
  CloseButton: "button",
} as const;
