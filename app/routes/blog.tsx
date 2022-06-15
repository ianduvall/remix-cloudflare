import { Outlet } from "@remix-run/react";
import { Nav } from "~/shared";
import { A } from "ui";

export default function BlogPostLayout() {
  return (
    <>
      <header className="mb-4 flex items-center">
        <A to="/" className="text-3xl">
          Ian Duvall
        </A>

        <span className="flex-grow" aria-hidden />

        <Nav />
      </header>
      <main className="scroll-mt-9">
        <Outlet />
      </main>
      <footer>
        <p className="text-center">C Ian Duvall 2022</p>
      </footer>
    </>
  );
}
