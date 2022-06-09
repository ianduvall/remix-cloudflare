import type { EntryContext } from "@remix-run/cloudflare";
import { RemixServer } from "@remix-run/react";
import { renderToReadableStream } from "react-dom/server";
import isbot from "isbot";

export default async function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext
) {
  let controller = new AbortController();
  let didError = false;

  try {
    let stream = await renderToReadableStream(
      <RemixServer context={remixContext} url={request.url} />,
      {
        signal: controller.signal,
        onError(error) {
          didError = true;
          console.error(error);
        },
      }
    );

    const isBot = isbot(request.headers.get("user-agent"));

    // buffer entire html for crawlers
    if (isBot) {
      await stream.allReady;
    }

    if (didError) {
      responseStatusCode = 500;
    }

    responseHeaders.set("Content-Type", "text/html");
    return new Response(stream, {
      status: responseStatusCode,
      headers: responseHeaders,
    });
  } catch (error) {
    if (didError) {
      responseStatusCode = 500;
    }

    responseHeaders.set("Content-Type", "text/html");
    return new Response(
      '<!doctype html><p>Loading...</p><script src="clientrender.js"></script>',
      {
        status: responseStatusCode,
        headers: responseHeaders,
      }
    );
  }
}
