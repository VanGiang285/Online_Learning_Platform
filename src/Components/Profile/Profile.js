import { useState } from "react";
import {
  Col,
  Container,
  Row,
  Image,
  Card,
  Button,
  CardBody,
} from "react-bootstrap";

export default function Profile() {
  return (
    <Container className="my-5">
      <Row>
        <Col md={4}>
          <Card className="p-3 mb-3">
            <div
              className="d-flex justify-content-end"
              style={{ color: "blue" }}
            >
              <i className="bi bi-pen"></i>
            </div>
            <h2
              style={{
                fontSize: "20px",
                margin: "0px 0px 16px",
                textAlign: "center",
                padding: "15px",
              }}
            >
              Personal details
            </h2>
            <Col>
              <div className="d-flex justify-content-center">
                <Image
                  variant="top"
                  src="../meo.png"
                  roundedCircle
                  width={"100px"}
                  className="mb-3"
                />
              </div>
            </Col>
            <Card.Body className="d-flex flex-column align-items-center">
              <Card.Title>Your Name</Card.Title>
              <Button
                variant="outline-primary"
                style={{ padding: "12px 36px" }}
              >
                <i className="bi bi-link-45deg"></i> Share Profile link
              </Button>
              <hr />
              <Button
                variant=""
                style={{
                  padding: "12px 16px",
                  fontSize: "16px",
                  color: "blue",
                }}
              >
                Update Profile visibility
              </Button>
            </Card.Body>
          </Card>
          <Card className=" mb-3">
            <CardBody>
              <div style={{ padding: "24px" }}>
                <p>
                  Let recruiters know what role you're looking for to make sure
                  you find opportunities that are right for you.
                </p>
                <Button
                  variant="outline-primary"
                  style={{ padding: "8px 16px" }}
                >
                  + Add work preferences
                </Button>
              </div>
            </CardBody>
          </Card>
          <Card className="mb-3">
            <CardBody>
              <div style={{ padding: "24px" }}>
                <h2 style={{ fontSize: "20px", margin: "0px 0px 16px" }}>
                  Additional info
                </h2>
                <p>
                  Help recruiters get to know you better by describing what
                  makes you a great candidate and sharing other links.
                </p>
                <Button
                  variant="outline-primary"
                  style={{ padding: "8px 16px" }}
                >
                  + Add additional info
                </Button>
              </div>
            </CardBody>
          </Card>
        </Col>
        <Col md={8}>
          <h2>Experience</h2>
          <Card className="mb-3">
            <CardBody>
              <section>
                <h3 style={{ fontSize: "20px" }}>Project</h3>
                <Row>
                  <Col xs={8}>
                    <div>
                      <h4 style={{ fontSize: "16px" }}>
                        Showcase your skills to recruiters with job-relevant
                        projects.
                      </h4>
                      <p style={{ backgroundColor: "#F5F7F8" }}>
                        Add projects here to demonstrate your technical
                        experience and ability to solve real-world problems.
                      </p>
                    </div>
                  </Col>
                  <Col
                    xs={4}
                    className="d-flex align-items-center justify-content-end"
                  >
                    <Button variant="" style={{ color: "blue" }}>
                      Browse projects
                    </Button>
                  </Col>
                </Row>
              </section>
            </CardBody>
          </Card>

          <Card className="mb-3">
            <CardBody>
              <h3 style={{ fontSize: "20px" }}>Work history</h3>
              <section>
                <Row>
                  <Col xs={8}>
                    <div>
                      <p style={{ backgroundColor: "#F5F7F8" }}>
                        Add your past work experience here. If you're just
                        starting out, you can add internship or volunteer
                        experience instead.
                      </p>
                    </div>
                  </Col>
                  <Col
                    xs={4}
                    className="d-flex align-items-center justify-content-end"
                  >
                    <Button
                      variant="outline-primary"
                      style={{ padding: "8px 16px" }}
                    >
                      + Add work experience
                    </Button>
                  </Col>
                </Row>
              </section>
            </CardBody>
          </Card>

          <h2>Education</h2>
          <Card className="mb-3">
            <CardBody>
              <section>
                <h3 style={{ fontSize: "20px" }}>Credentials</h3>
                <Row>
                  <Col xs={8}>
                    <div>
                      <p style={{ backgroundColor: "#F5F7F8" }}>
                        Add your educational background here to let employers
                        know where you studied or are currently studying.
                      </p>
                    </div>
                  </Col>
                  <Col
                    xs={4}
                    className="d-flex align-items-center justify-content-end"
                  >
                    <Button
                      variant="outline-primary"
                      style={{ padding: "8px 16px" }}
                    >
                      + Add education
                    </Button>
                  </Col>
                </Row>
                <Row>
                  <Col xs={8}>
                    <p style={{ backgroundColor: "#F5F7F8" }}>
                      Get job-ready with role-based training from
                      industry-leading companies like Google, Meta, and IBM.
                    </p>
                  </Col>
                  <Col
                    xs={4}
                    className="d-flex align-items-center justify-content-end"
                  >
                    <Button variant="link" style={{ padding: "8px 16px" }}>
                      Browse Professional Certificates
                    </Button>
                  </Col>
                </Row>
              </section>{" "}
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
