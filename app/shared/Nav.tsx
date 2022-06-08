import React from "react";
import { Details, Dialog } from "~/ui";
import { useA11yDialog } from "react-a11y-dialog";
import { NavLinks } from "./NavLinks";

const title = "Navigation";
const nav = (
  <nav className="flex flex-col">
    <NavLinks />
  </nav>
);

const useIsClient = (): boolean => {
  const [isClient, setIsClient] = React.useState(false);

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient;
};

export const Nav = React.memo(function Nav() {
  const isClient = useIsClient();

  // to support navigation without js, show details when ssr or after hydration
  if (!isClient) {
    return <NavDetails />;
  }

  return <NavDialog />;
});

const NavDetails = React.memo<{}>(function NavDetails() {
  return (
    <Details.Root>
      <Details.Summary className="list-none">{title}</Details.Summary>
      {nav}
    </Details.Root>
  );
});
const NavDialog = React.memo<{}>(function Nav() {
  // `instance` is the `a11y-dialog` instance.
  // `attr` is an object with the following keys:
  // - `container`: the dialog container
  // - `overlay`: the dialog overlay (sometimes called backdrop)
  // - `dialog`: the actual dialog box
  // - `title`: the dialog mandatory title
  // - `closeButton`:  the dialog close button
  const [instance, attr] = useA11yDialog({
    // The required HTML `id` attribute of the dialog element, internally used
    // a11y-dialog to manipulate the dialog.
    id: "nav-dialog",
    // The optional `role` attribute of the dialog element, either `dialog`
    // (default) or `alertdialog` to make it a modal (preventing closing on
    // click outside of ESC key).
    role: "dialog",
    // The required dialog title, mandatory in the document
    // to provide context to assistive technology.
    title: "Navigation",
  });

  return (
    <>
      <button type="button" onClick={() => instance.show()}>
        {title}
      </button>

      <Dialog.Root {...attr.container}>
        <Dialog.Overlay {...attr.overlay} />

        <Dialog.Content {...attr.dialog}>
          <div className="flex items-center justify-between">
            <Dialog.Title {...attr.title}>{title}</Dialog.Title>

            <Dialog.CloseButton {...attr.closeButton}>Close</Dialog.CloseButton>
          </div>

          {nav}
        </Dialog.Content>
      </Dialog.Root>
    </>
  );
});
