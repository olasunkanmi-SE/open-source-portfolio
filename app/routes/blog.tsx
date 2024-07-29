import { json } from "@remix-run/node";
import { useLoaderData, Link } from "@remix-run/react";
import { format } from "date-fns";
import { Container, Row, Col, Card, Badge } from "react-bootstrap";

export const loader = async () => {
  const posts = [
    {
      id: 1,
      title: "Introduction to React Hooks",
      date: "2024-07-15",
      tags: ["react", "hooks"],
      excerpt: "Learn the basics of React Hooks and how they can simplify your code.",
    },
    {
      id: 2,
      title: "Building RESTful APIs with Node.js",
      date: "2024-07-20",
      tags: ["nodejs", "api"],
      excerpt: "Explore the process of creating robust RESTful APIs using Node.js and Express.",
    },
  ];

  return json({ posts });
};

export default function Index() {
  const { posts } = useLoaderData<typeof loader>();

  return (
    <Container className="my-4">
      <h1 className="display-4 mb-4">Software Engineering Blog</h1>
      <Row xs={1} md={2} lg={3} className="g-4">
        {posts.map((post) => (
          <Col key={post.id}>
            <Card as={Link} to={`/post/${post.id}`} className="h-100 text-decoration-none">
              <Card.Img
                variant="top"
                src={`data:image/png;base64,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`}
                alt="Post thumbnail"
              />
              <Card.Body>
                <Card.Title>{post.title}</Card.Title>
                <Card.Text>{post.excerpt}</Card.Text>
              </Card.Body>
              <Card.Footer className="d-flex justify-content-between align-items-center">
                <small className="text-muted">{format(new Date(post.date), "MMMM d, yyyy")}</small>
                <div>
                  {post.tags.map((tag) => (
                    <Badge key={tag} bg="secondary" className="me-1">
                      #{tag}
                    </Badge>
                  ))}
                </div>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
