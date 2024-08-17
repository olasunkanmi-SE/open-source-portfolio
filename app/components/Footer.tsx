/* eslint-disable jsx-a11y/anchor-is-valid */
import { Github, Linkedin, Twitter } from "lucide-react";
import { Container, Row, Col, Stack } from "react-bootstrap";

const Footer = () => {
  return (
    <footer className="bg-light text-light">
      <Container className="mt-1">
        <Row>
          <Col md={5}></Col>
          <Col md={4}>
            <Stack direction="horizontal" gap={3}>
              <div className="p-2 bg-dark">
                <p>
                  <Linkedin />
                </p>
              </div>
              <div className="p-2 bg-dark">
                <p>
                  <Github />
                </p>
              </div>
              <div className="p-2">
                <p>
                  <Twitter />
                </p>
              </div>
            </Stack>
          </Col>
          <Col md={3}></Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
