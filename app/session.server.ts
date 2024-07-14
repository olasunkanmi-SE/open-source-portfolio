import { createCookieSessionStorage, redirect, Session, SessionData, SessionStorage } from "@remix-run/node";
import invariant from "tiny-invariant";

export class SessionManager {
  private readonly sessionStorage: SessionStorage<SessionData, SessionData>;
  private readonly USER_SESSION_KEY = "userId";

  constructor() {
    invariant(process.env.SESSION_SECRET, "SESSION_SECRET must be set");
    this.sessionStorage = createCookieSessionStorage({
      cookie: {
        name: "",
        httpOnly: true,
        path: "/",
        sameSite: "lax",
        secrets: [process.env.SESSION_SECRET],
        secure: process.env.NODE_ENV === "production",
      },
    });
  }

  async getSession(request: Request): Promise<Session<SessionData, SessionData>> {
    return await this.sessionStorage.getSession(request.headers.get("Cookie"));
  }

  async getUserId(request: Request): Promise<string> {
    const session = await this.getSession(request);
    const userId = session.get("userId");
    return userId;
  }

  async requireUserId(request: Request, redirectTo: string = new URL(request.url).pathname): Promise<string> {
    const userId = await this.getUserId(request);
    if (!userId) {
      const searchParams = new URLSearchParams([["redirectTo", redirectTo]]);
      throw redirect(`/login?${searchParams}`);
    }
    return userId;
  }

  async createUserSession({
    request,
    userId,
    remember,
    redirectTo,
  }: {
    request: Request;
    userId: string;
    remember: boolean;
    redirectTo: string;
  }) {
    const session = await this.getSession(request);
    session.set(this.USER_SESSION_KEY, userId);
    return redirect(redirectTo, {
      headers: {
        "Set-Cookie": await this.sessionStorage.commitSession(session, {
          maxAge: remember ? 3600 * 24 * 7 : undefined,
        }),
      },
    });
  }

  async logOut(request: Request) {
    const session = await this.getSession(request);
    return redirect("/", {
      headers: {
        "Set-Cookie": await this.sessionStorage.destroySession(session),
      },
    });
  }
}
