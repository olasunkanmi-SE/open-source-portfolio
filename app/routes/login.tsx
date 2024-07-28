/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ActionFunctionArgs, LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useActionData, useNavigation, useSearchParams } from "@remix-run/react";
import { useEffect, useRef, useState } from "react";
import { Button, Container, Stack } from "react-bootstrap";
import { ValidationMessage } from "~/components/FormError";
import { NavBar } from "~/components/NavBar";
import { createUser, verifyLogin } from "~/repository/user.repository";
import { SessionManager } from "~/session.server";
import { Index } from "~/utils/memory";
import { safeRedirect, validateEmail } from "~/utils/utils";

export const sessionManager = new SessionManager();

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const userId = await sessionManager.getUserId(request);
  if (userId) return redirect("/codebuddy/create");
  return json({});
};

const memory = new Index();

export const action = async ({ request }: ActionFunctionArgs) => {
  const isSignUp = memory.has("join");
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");
  const redirectTo = safeRedirect(formData.get("redirectTo"), "/");
  const remember = formData.get("remember");

  if (!validateEmail(email)) {
    return json({ errors: { email: "Email is invalid", password: null } }, { status: 400 });
  }

  if (typeof password !== "string" || password.length === 0) {
    return json({ errors: { email: null, password: "Password is required" } }, { status: 400 });
  }

  if (password.length < 8) {
    return json({ errors: { email: null, password: "Password is too short" } }, { status: 400 });
  }

  let user: any;

  memory.delete("join");

  if (isSignUp) {
    user = await createUser(email, password);
    return redirect(`/login`);
  } else {
    user = await verifyLogin(email, password);
    if (!user) {
      return json({ errors: { email: "Invalid email or password", password: null } }, { status: 400 });
    }
    return sessionManager.createUserSession({
      redirectTo,
      remember: remember === "on",
      request,
      userId: user.id,
    });
  }
};

export const meta: MetaFunction = () => [{ title: "Login" }];

export default function LoginPage() {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [searchParams] = useSearchParams();
  const allSearchParameters: string[] = searchParams.getAll("type");
  if (allSearchParameters.includes("join")) {
    memory.allocate("join", true);
  }
  const redirectTo = searchParams.get("redirectTo") ?? "/codebuddy/chat";
  const actionData = useActionData<typeof action>();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (actionData?.errors?.email) {
      emailRef.current?.focus();
    } else if (actionData?.errors?.password) {
      passwordRef.current?.focus();
    }
  }, [actionData]);

  return (
    <div>
      <NavBar />
      <div className="centeredForm">
        <Container fluid className="flex-grow-1">
          <Stack gap={1} className="col-md-4 mx-auto">
            <Form method="post" className="needs-validation" encType="multipart/form-data" noValidate>
              <fieldset disabled={navigation.state === "submitting"}>
                <div className="mb-3">
                  <input
                    name="email"
                    type="text"
                    className="form-control"
                    id="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{
                      borderColor: actionData?.errors?.email ? "red" : "",
                    }}
                  />
                  {actionData?.errors.email ? (
                    <ValidationMessage
                      error={actionData?.errors?.email}
                      isSubmitting={navigation.state === "submitting"}
                    />
                  ) : null}
                </div>
                <div className="mb-3">
                  <input
                    name="password"
                    type="text"
                    className="form-control"
                    id="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{
                      borderColor: actionData?.errors?.password ? "red" : "",
                    }}
                  />
                  {actionData?.errors.password ? (
                    <ValidationMessage
                      error={actionData?.errors?.password}
                      isSubmitting={navigation.state === "submitting"}
                    />
                  ) : null}
                </div>
                <input type="hidden" name="redirectTo" value={redirectTo} />
                <Button type="submit" variant="dark">
                  Submit
                </Button>
              </fieldset>
            </Form>
          </Stack>
        </Container>
      </div>
    </div>
  );
}
