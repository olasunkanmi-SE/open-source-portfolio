import { json, LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Col, Container, Row } from "react-bootstrap";
import { Outlet } from "react-router";
import { NavBar } from "~/components/NavBar";
import Sidebar from "~/components/SideBar";
import { IPostDraft } from "~/models/models";
import { PostService } from "~/repository/post.repository";
import { sessionManager } from "./login";
import Footer from "~/components/Footer";

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
          <Col xs={12} lg={8} className="mb-4 col-top">
            <Outlet />
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
}
