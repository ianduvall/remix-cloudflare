import React from "react";
import { A } from "ui";

export const NavLinks = React.memo<{}>(function NavLinks() {
  return (
    <>
      <A to="/">Home</A>
      <A to="/about">About</A>
      <A to="/blog">Blog</A>
    </>
  );
});
