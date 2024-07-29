// app/routes/index.jsx
import { Github, Linkedin, LocateIcon, Mail, Phone } from "lucide-react";
import { Container, Row, Col, Image, Card, ListGroup } from "react-bootstrap";
import Footer from "~/components/Footer";

const CV = () => {
  return (
    <>
      <Container className="my-5">
        <Row>
          <Col md={8}>
            <h1 className="display-4">OYINLOLA OLASUNKANMI RAYMOND</h1>
            <h2 className="text-muted mb-4">SENIOR SOFTWARE ENGINEER</h2>

            <Card className="mb-4">
              <Card.Header as="h3">SUMMARY</Card.Header>
              <Card.Body>
                <Card.Text>
                  Experienced and result driven Software Engineer with over 6 years of professional experience in web
                  development. Proven track record of developing microservices and scalable distributed systems.
                  Full-stack capabilities with emphasis on robust, scalable backend.
                </Card.Text>
              </Card.Body>
            </Card>

            <Card className="mb-4">
              <Card.Header as="h3">EXPERIENCE</Card.Header>
              <Card.Body>
                <h4>Senior Software Engineer</h4>
                <h5>Regov Technologies - Petaling Jaya Malaysia</h5>
                <p className="text-muted">Oct 2023 - Present</p>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    Lead the development of MBID token dashboard for stakeholders, providing real-time analytics and
                    comprehensive insights into token metrics, market performance, and holder behavior Lead technical
                    architecture discussi
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Lead technical architecture discussions with the team and frontend developers, and developed
                    performant, scalable backend services using AWS serverless
                  </ListGroup.Item>
                  <ListGroup.Item>Currently developing an SDK for the MBID token </ListGroup.Item>
                  <ListGroup.Item>
                    Mentor junior developers, fostering their growth in Node.js best practices, code quality, and
                    software development principles
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Founded CodeBuddy, a Vscode generative AI coding assistant, to enhance developer productivity and
                    code quality across the team.
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Developed IntelliSearch, an AI-powered PDF knowledge assistant that transforms document collections
                    into interactive knowledgebases.{" "}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Implement search functionality and document processing pipelines for AI powered applications.{" "}
                  </ListGroup.Item>
                </ListGroup>

                <h4 className="mt-4">Backend Developer</h4>
                <h5>Pickles Asia - Kuala Lumpur, Malaysia</h5>
                <p className="text-muted">Feb 2021 - OCT 2023</p>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    Designed and implemented a scalable microservice architecture to handle high volumes of concurrent
                    bids and auctions with scalability and performance in mind
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Developed event-driven microservices to manage auction creation, bidding, and real-time updates
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Implemented a message queue (Apache Kafka) to handle high volumes of user requests and ensure
                    reliable communication between microservices, enabling real-time bidding and auction management for
                    a seamless user experience
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Ideated and developed SDKs for Pickles Auctions Microservice application
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Worked with technologies such as Docker and Kubernetes for the smooth deployment of microservices.
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Contributed to CI/CD pipelines to ensure the reliability, security, and continuous delivery of the
                    platform
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Collaborated effectively with cross-functional teams, including front-end developers, UI/UX
                    designers, and product managers, fostering effective communication and alignment throughout the
                    project lifecycle
                  </ListGroup.Item>
                </ListGroup>

                <h4 className="mt-4">Software Engineer</h4>
                <h5>ViewQwest - Kuala Lumpur, Malaysia</h5>
                <p className="text-muted">Jan 2020 - Jan 2021</p>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    designed and implementing robust, secure REST API-based backend services with Laravel.
                  </ListGroup.Item>
                  <ListGroup.Item>Integrate third-party APIs with ViewQwest backend applications</ListGroup.Item>
                  <ListGroup.Item>Frontend development with angular.</ListGroup.Item>
                  <ListGroup.Item>
                    Database design and development, including data modeling and schema creation
                  </ListGroup.Item>
                </ListGroup>

                <h4 className="mt-4">Web Developer</h4>
                <h5>Myevents International - Kuala Lumpur, Malaysia</h5>
                <p className="text-muted">Feb 2019 - Nov 2019</p>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    Lead developer for web projects in three countries in design, development, testing, debugging, and
                    maintenance of dynamic, secure web applications.
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Participated in client meetings to understand requests related to features to be added in new /
                    existing web pages and devising plan to complete tasks before deadline
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Built ticketing system alongside web development team to facilitate easy collection of event
                    revenues and ensure company realizes maximum profits in its numerous events.
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Built fully functional online news portal with SEO best practices and techniques.
                  </ListGroup.Item>
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4}>
            <Card className="mb-4">
              <Card.Body>
                <Image
                  src="https://pbs.twimg.com/profile_images/1778312452796743680/C3WNjdvq_400x400.jpg"
                  className="mx-auto d-block mb-3"
                />
                <h3>CONTACT</h3>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Mail /> oyinolasunkanmi@gmail.com
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Phone /> +60166032670
                  </ListGroup.Item>
                  <ListGroup.Item>
                    {" "}
                    <LocateIcon /> Kuala Lumpur, Malaysia
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Linkedin /> shorturl.at/vBZBQ
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Github /> github.com/olasunkanmi-SE
                  </ListGroup.Item>
                </ListGroup>
              </Card.Body>
            </Card>

            <Card className="mb-4">
              <Card.Header as="h3">SKILLS</Card.Header>
              <ListGroup variant="flush">
                <ListGroup.Item>Typescript, Javascript, NodeJs, Express, NestJs</ListGroup.Item>
                <ListGroup.Item>React, Angular, HTML, Bootstrap</ListGroup.Item>
                <ListGroup.Item>
                  Event driven Development, Microservices, Generative AI, Vector Databases, MongoDB, Postgres
                </ListGroup.Item>
                <ListGroup.Item>AWS, Github, Bitbucket</ListGroup.Item>
                <ListGroup.Item>Data Structure and Algorithm</ListGroup.Item>
                <ListGroup.Item>Leadership, Mentor</ListGroup.Item>
              </ListGroup>
            </Card>

            <Card className="mb-4">
              <Card.Header as="h3">CERTIFICATIONS</Card.Header>
              <ListGroup variant="flush">
                <ListGroup.Item>English</ListGroup.Item>
                <ListGroup.Item>French</ListGroup.Item>
                <ListGroup.Item>Arabic</ListGroup.Item>
                <ListGroup.Item>German</ListGroup.Item>
              </ListGroup>
            </Card>

            <Card>
              <Card.Header as="h3">EDUCATION</Card.Header>
              <Card.Body>
                <h4>Bachelor of Science: Electrical Electronics Engineering</h4>
                <p>Feb 2007 - Jan 2013</p>
                <p>Olabisi Onabanjo University</p>
                <p>3.90 CGPA</p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default CV;
