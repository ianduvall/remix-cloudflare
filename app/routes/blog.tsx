import { Outlet } from "@remix-run/react";

export default function BlogPostLayout() {
  return (
    <>
      <main className="prose prose-slate scroll-mt-9 dark:prose-invert">
        <Outlet />
      </main>
    </>
  );
}
