import { Outlet } from "react-router";
import { NavBar } from "~/components/NavBar";
import Sidebar from "~/components/SideBar";
import { Container, Row, Col } from "react-bootstrap";

export default function CodeBuddy() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <NavBar />
      <Container fluid className="flex-grow-1">
        <Row className="h-100">
          <Col lg={3} className="d-none d-lg-block p-0">
            <Sidebar />
          </Col>
          <Col xs={12} lg={7} className="mb-4 col-top">
            <Outlet />
          </Col>
          <Col lg={2} className="d-none d-lg-block mb-4 col-top">
            <div className="p-3  h-100 col-right">
              <h2>Column 3</h2>
              <p>
                This is the content for the third column. It will be hidden on
                smaller screens.
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
