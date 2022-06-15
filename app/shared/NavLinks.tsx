import React from "react";
import { InternalLink } from "ui";

export const NavLinks = React.memo<{}>(function NavLinks() {
  return (
    <>
      <InternalLink to="/">Home</InternalLink>
      <InternalLink to="/about">About</InternalLink>
      <InternalLink to="/blog">Blog</InternalLink>
    </>
  );
});
