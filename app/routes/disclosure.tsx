import React from "react";

const id = "disclosure";
const isClient = () => typeof document !== "undefined";

const openStateInit = () => {
  if (isClient()) {
    const disclosureElement = document.getElementById(
      id
    ) as HTMLDetailsElement | null;

    return Boolean(disclosureElement?.open);
  }

  return false;
};

export default function DisclosureRoute() {
  console.log("rendering");

  const [open, setOpen] = React.useState<boolean>(openStateInit);

  return (
    <details
      id={id}
      open={open}
      onToggle={(ev) => {
        console.log("toggling");
        setOpen(ev.currentTarget.open);
      }}
    >
      <summary>Summary</summary>
      {open ? <div>Client content</div> : <div>Server content</div>}
    </details>
  );
}
