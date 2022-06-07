import { Link } from "@remix-run/react";
import { Nav } from "~/shared";

export default function IndexRoute() {
  return (
    <>
      <header className="mb-4 flex items-center">
        <Link to="/" className="link text-3xl">
          Ian Duvall
        </Link>
        <span className="flex-grow" />
        <Nav />
      </header>
    </>
  );
}
