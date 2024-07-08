import { Links, Meta, Scripts, ScrollRestoration } from "@remix-run/react";
import { LinksFunction } from "@remix-run/server-runtime";
import styles from "./style.css?url";

export const links: LinksFunction = () => [
  {
    rel: "stylesheet",
    href: "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css",
  },
  { rel: "stylesheet", href: styles },
];

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
