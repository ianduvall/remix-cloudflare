import React from "react";
import { Details } from "~/ui";

export default React.forwardRef<
  React.ElementRef<typeof Details.Root>,
  {
    title: React.ReactNode;
    nav: React.ReactNode;
    initialOpen?: true | undefined;
  }
>(function NavDetails({ title, nav, initialOpen }, ref) {
  return (
    <Details.Root ref={ref}>
      <Details.Summary className="list-none">{title}</Details.Summary>
      {nav}
    </Details.Root>
  );
});
