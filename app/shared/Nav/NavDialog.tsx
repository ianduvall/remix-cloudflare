import React from "react";
import { Dialog } from "ui";
import { useA11yDialog } from "react-a11y-dialog";

export default function NavDialog({
  title,
  nav,
  open,
}: {
  title: React.ReactNode;
  nav: React.ReactNode;
  open?: boolean;
}) {
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

  React.useEffect(() => {
    if (instance) {
      if (open) {
        instance.show();
      }
    }
  }, [instance, open]);

  return (
    <>
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
}
