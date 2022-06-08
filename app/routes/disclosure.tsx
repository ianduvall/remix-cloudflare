import React from "react";

export default function DisclosureRoute() {
  console.log("rendering");

  const [open, setOpen] = React.useState<boolean>(false);

  return (
    <details
      open={open}
      onToggle={() => {
        console.log("toggling");
        setOpen((prev) => !prev);
      }}
    >
      <summary>Summary</summary>
      {open ? <div>Client content</div> : <div>Server content</div>}
    </details>
  );
}
