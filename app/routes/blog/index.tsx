import { A } from "~/ui";

export default function BlogRoute() {
  return (
    <main className="prose mx-auto">
      <h1>Posts</h1>

      <A to="first-post">First post</A>
    </main>
  );
}
