import { memo } from "react";
import { Details, useOpenAttributeState } from "ui";
import { NavLinks } from "./NavLinks";

export const Nav = memo<{}>(function Nav() {
  const id = "navigation";
  const [open, setOpen] = useOpenAttributeState({
    getElement: () => document.getElementById(id) as HTMLDetailsElement | null,
  });
  const close = () => {
    setOpen(false);
  };

  return (
    <Details.Root
      id={id}
      open={open}
      onToggle={(ev) => {
        setOpen(ev.currentTarget.open);
      }}
      className="relative"
    >
      <Details.Summary className="list-none">Navigation</Details.Summary>
      <div className="absolute w-full">
        <nav className="flex flex-col items-end" onClick={close}>
          <NavLinks />
        </nav>
      </div>
    </Details.Root>
  );
});
