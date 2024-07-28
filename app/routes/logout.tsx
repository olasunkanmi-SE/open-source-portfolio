import { ActionFunctionArgs, redirect } from "@remix-run/node";
import { SessionManager } from "~/session.server";

const sessionManager: SessionManager = new SessionManager();
export const action = async ({ request }: ActionFunctionArgs) => sessionManager.logOut(request);

export const loader = async () => redirect("/login");
