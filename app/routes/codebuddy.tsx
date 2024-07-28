import { Outlet } from "react-router";
import { NavBar } from "~/components/NavBar";
import Sidebar from "~/components/SideBar";
import { Container, Row, Col } from "react-bootstrap";
import { json, LoaderFunctionArgs } from "@remix-run/node";
import { sessionManager } from "./login";
import { IPostDraft } from "~/models/models";
import { useLoaderData } from "@remix-run/react";
import { PostService } from "~/repository/post.repository";

const postService = new PostService();

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const userId = await sessionManager.requireUserId(request);
  const data: IPostDraft[] = await postService.getDrafts(Number(userId));
  return json({ data });
};

export default function CodeBuddy() {
  const data = useLoaderData<typeof loader>();
  return (
    <div className="d-flex flex-column min-vh-100">
      <NavBar />
      <Container fluid className="flex-grow-1">
        <Row className="h-100">
          <Col lg={3} className="d-none d-lg-block p-0">
            <Sidebar drafts={data.data} />
          </Col>
          <Col xs={12} lg={7} className="mb-4 col-top">
            <Outlet />
          </Col>
          <Col lg={2} className="d-none d-lg-block mb-4 col-top">
            <div className="p-3  h-100 col-right far-right">
              <h2>Column 3</h2>
              <p>This is the content for the third column. It will be hidden on smaller screens.</p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
