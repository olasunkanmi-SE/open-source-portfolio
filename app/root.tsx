import { isRouteErrorResponse, Links, Meta, Outlet, Scripts, ScrollRestoration, useRouteError } from "@remix-run/react";
import { LinksFunction } from "@remix-run/server-runtime";
import styles from "./style.css?url";

export const links: LinksFunction = () => [
  {
    rel: "stylesheet",
    href: "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css",
  },
  {
    rel: "stylesheet",
    href: "https://db.onlinewebfonts.com/c/b5dc5645d8bcfd701cdc1edd93253de2?family=ABC+Diatype+Medium",
  },
  { rel: "stylesheet", href: styles },
];

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta title="Welcome Fiatinnovations" name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <div>
          <Outlet />
        </div>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

// TODO Use this in Prod

// export function ErrorBoundary() {
//   const error = useRouteError();
//   console.error(error);
//   return (
//     <html lang="en">
//       <head>
//         <title>Oh no!</title>
//         <Meta />
//         <Links />
//       </head>
//       <body>
//         <div>
//           <p>An error occured</p>
//         </div>
//         <Scripts />
//       </body>
//     </html>
//   );
// }

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <div>
        <h1>
          {error.status} {error.statusText}
        </h1>
        <p>{error.data}</p>
      </div>
    );
  } else if (error instanceof Error) {
    return (
      <div>
        <h1>Error</h1>
        <p>{error.message}</p>
        <p>The stack trace is:</p>
        <pre>{error.stack}</pre>
      </div>
    );
  } else {
    return <h1>Unknown Error</h1>;
  }
}
