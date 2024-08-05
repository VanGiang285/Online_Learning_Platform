import React, { useState } from "react";
import { Container, Row, Col, Nav, Card, Button, Image } from "react-bootstrap";

export default function Purchases() {
  const [showAllFreeCourses, setShowAllFreeCourses] = useState(false);
  const [showAllDegreeCourses, setShowAllDegreeCourses] = useState(false);

  const toggleShowAllFreeCourses = () => {
    setShowAllFreeCourses(!showAllFreeCourses);
  };

  const toggleShowAllDegreeCourses = () => {
    setShowAllDegreeCourses(!showAllDegreeCourses);
  };

  return (
    <div style={{ backgroundColor: "#F5F7F8" }}>
      <Container>
        <Row className="mb-4">
          <Col>
            <h1 style={{ fontSize: "28px" }}>Purchases</h1>
            <p>
              Need more help? Check out our <a href="#">help center</a> and
              <a href="#">refund policies</a>.
            </p>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <Nav variant="tabs" defaultActiveKey="/my-purchases/transactions">
              <Nav.Item>
                <Nav.Link
                  href="/my-purchases/transactions"
                  active
                  style={{ color: "blue", backgroundColor: "#F5F7F8" }}
                >
                  Payment history
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
        </Row>
        <Row style={{ height: "400px" }}>
          <Col>
            <p>
              No purchases found in your history.
              <a href="#">Browse courses offering</a> and{" "}
              <a href="#">Certificates now.</a>
            </p>
          </Col>
        </Row>
        <Row>
          <Col>
            <h2 style={{ fontSize: "28px", fontWeight: "normal" }}>
              Get Started with These Free Courses
            </h2>
          </Col>
        </Row>
        <Row>
          {[1, 2, 3, 4, 5, 6, 7, 8].map((index) => (
            <Col md={3} className="mb-4" key={index}>
              {showAllFreeCourses || index <= 4 ? (
                <Card style={{ position: "relative" }}>
                  <div
                    style={{
                      position: "absolute",
                      top: "10px",
                      left: "10px",
                      backgroundColor: "white",
                      color: "black",
                      padding: "2px 5px",
                      borderRadius: "3px",
                      fontWeight: "bold",
                    }}
                  >
                    Free
                  </div>
                  <Card.Img
                    variant="top"
                    src="../image/puchases/meo.png"
                    style={{
                      width: "100%",
                      height: "150px",
                      objectFit: "cover",
                    }}
                  />
                  <Card.Body>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: "10px",
                      }}
                    >
                      <Card.Img
                        variant="top"
                        src="../image/puchases/meo.png"
                        style={{
                          width: "30px",
                          height: "30px",
                          marginRight: "10px",
                        }}
                      />
                      <p style={{ margin: 0 }}>Mèo cute</p>
                    </div>
                    <Card.Text
                      style={{ fontWeight: "bold", marginBottom: "5px" }}
                    >
                      Mèo anh Lông ngắn
                    </Card.Text>
                    <p style={{ margin: 0 }}>Courses</p>
                  </Card.Body>
                </Card>
              ) : null}
            </Col>
          ))}
        </Row>
        <Row>
          <Col>
            <Button
              variant="outline-primary"
              onClick={toggleShowAllFreeCourses}
            >
              {showAllFreeCourses ? "Show Fewer" : "Show More"}
            </Button>
          </Col>
        </Row>

        <Row>
          <Col>
            <h2 style={{ fontSize: "28px", fontWeight: "normal" }}>
              Earn Your Degree
            </h2>
          </Col>
        </Row>
        <Row>
          {[1, 2, 3, 4, 5, 6, 7, 8].map((index) => (
            <Col md={3} className="mb-4" key={index}>
              {index <= (showAllDegreeCourses ? 8 : 4) && (
                <Card style={{ position: "relative" }}>
                  <div
                    style={{
                      position: "absolute",
                      top: "10px",
                      left: "10px",
                      backgroundColor: "white",
                      color: "black",
                      padding: "2px 5px",
                      borderRadius: "3px",
                      fontWeight: "bold",
                    }}
                  >
                    Free
                  </div>
                  <Card.Img
                    variant="top"
                    src="../image/puchases/meo.png"
                    style={{
                      width: "100%",
                      height: "150px",
                      objectFit: "cover",
                    }}
                  />
                  <Card.Body>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: "10px",
                      }}
                    >
                      <Card.Img
                        variant="top"
                        src="../image/puchases/meo.png"
                        style={{
                          width: "30px",
                          height: "30px",
                          marginRight: "10px",
                        }}
                      />
                      <p style={{ margin: 0 }}>Mèo cute</p>
                    </div>
                    <Card.Text
                      style={{ fontWeight: "bold", marginBottom: "5px" }}
                    >
                      Mèo anh Lông ngắn
                    </Card.Text>
                    <p style={{ margin: 0 }}>Courses</p>
                  </Card.Body>
                </Card>
              )}
            </Col>
          ))}
        </Row>

        <Row>
          <Col>
            <Button
              variant="outline-primary"
              onClick={toggleShowAllDegreeCourses}
            >
              {showAllDegreeCourses ? "Show Fewer" : "Show More"}
            </Button>
          </Col>
        </Row>

        <Row
          className="align-items-center p-5 mt-5"
          style={{ backgroundColor: "rgb(220, 237, 245)" }}
        >
          <Col md={8}>
            <Image
              src="./image/puchases/edu.png"
              alt="Coursera Plus"
              className="mb-3"
              style={{ width: "240px" }}
            />
            <h3>Try out different courses to see which one fits your needs</h3>
            <p>
              Get a 7-day free trial that includes courses, Specializations,
              Projects, and Professional Certificates.
            </p>
            <Button variant="primary" className="mt-3">
              Learn More
            </Button>
          </Col>
          <Col md={4}>
            <div className="promo-image">
              <img
                src={
                  "https://coursera_assets.s3.amazonaws.com/coursera_plus/landing_page/header-image.png"
                }
                alt="Promo"
                className="rounded-circle img-fluid"
              />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
