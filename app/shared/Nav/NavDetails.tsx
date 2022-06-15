import React from "react";
import { Details } from "ui";

export default React.forwardRef<
  React.ElementRef<typeof Details.Root>,
  {
    title: React.ReactNode;
    nav: React.ReactNode;
  }
>(function NavDetails({ title, nav }, ref) {
  return (
    <Details.Root ref={ref}>
      <Details.Summary className="list-none">{title}</Details.Summary>
      {nav}
    </Details.Root>
  );
});
