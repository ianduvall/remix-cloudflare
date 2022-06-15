import type { LinksFunction, MetaFunction } from "@remix-run/cloudflare";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import rootStylesUrl from "./styles/root-generated.css";

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "New Remix App",
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
      <body className="prose prose-slate bg-slate-50 p-3 dark:prose-invert dark:bg-slate-900 md:mx-auto md:p-0">
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
