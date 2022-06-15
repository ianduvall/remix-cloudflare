import { useId } from "react";
import { Details } from "ui";

export default function DisclosureRoute() {
  const id = useId();
  const [open, setOpen] = Details.useOpenState({
    getElement: () => document.getElementById(id) as HTMLDetailsElement | null,
  });

  return (
    <Details.Root
      id={id}
      open={open}
      onToggle={(ev) => {
        setOpen(ev.currentTarget.open);
      }}
    >
      <Details.Summary>Summary</Details.Summary>
      <div>content</div>
    </Details.Root>
  );
}
