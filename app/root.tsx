import type { LinksFunction, MetaFunction } from "@remix-run/cloudflare";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { ExternalLink, InternalLink } from "ui";
import { Nav } from "./shared";

import rootStylesUrl from "./styles/root-generated.css";

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Ian Duvall | Software Engineer",
  viewport: "width=device-width,initial-scale=1",
});

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: rootStylesUrl }];
};

export default function App() {
  return (
    <html dir="ltr" lang="en" style={{ colorScheme: "light dark" }}>
      <head>
        <Meta />
        <Links />
      </head>
      <body className="mx-auto max-w-screen-lg bg-slate-50 px-3 dark:bg-slate-900 lg:px-4">
        <Header />
        <Outlet />
        <Footer />

        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

const Header = () => {
  return (
    <header className="my-3 flex items-center lg:my-4">
      <InternalLink to="/" className="current text-xl !no-underline">
        Ian Duvall
      </InternalLink>
      <span className="flex-grow" />
      <Nav />
    </header>
  );
};

const Footer = () => {
  return (
    <footer className="flex flex-col items-center">
      <p className="">&copy; Ian Duvall {new Date().getFullYear()}</p>
      <ul className="flex">
        <li>
          <ExternalLink href="https://github.com/ianduvall">
            github
          </ExternalLink>
        </li>
      </ul>
    </footer>
  );
};
