import React, { useState } from "react";
import {
  Col,
  Container,
  Row,
  Form,
  Button,
  Card,
  CardBody,
  ProgressBar,
} from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";

export default function Systems() {
  const [activeSection, setActiveSection] = useState("account");

  const renderContent = () => {
    switch (activeSection) {
      case "account":
        return (
          <Card className={"p-2"}>
            <CardBody className="p-4">
              <div>
                <h1 style={{ fontSize: "24px", fontWeight: "normal" }}>
                  Account
                </h1>
                <Form>
                  <Row className="mb-4">
                    <Col>
                      <Form.Group controlId="formBasicName">
                        <Form.Label style={{ fontWeight: "bold" }}>
                          Full Name
                        </Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter your full name"
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group controlId="formBasicEmail">
                        <Form.Label style={{ fontWeight: "bold" }}>
                          Email Address
                        </Form.Label>
                        <Form.Control
                          type="email"
                          placeholder="Enter your email"
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row className="mb-4">
                    <Col>
                      <Form.Group controlId="formBasicTimezone">
                        <Form.Label style={{ fontWeight: "bold" }}>
                          Timezone
                        </Form.Label>
                        <Form.Select>
                          <option value="">Select a timezone</option>
                          <option value="1">Việt Nam</option>
                          <option value="2">Nhật Bản</option>
                          <option value="3">Mỹ</option>
                          <option value="4">Anh</option>
                          <option value="5">Nga</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group controlId="formBasicLanguage">
                        <Form.Label style={{ fontWeight: "bold" }}>
                          Language
                        </Form.Label>
                        <Form.Select>
                          <option value="">Select a language</option>
                          <option value="1">Việt Nam</option>
                          <option value="2">Nhật Bản</option>
                          <option value="3">Mỹ</option>
                          <option value="4">Anh</option>
                          <option value="5">Nga</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Button
                    variant="outline-primary"
                    style={{ padding: "12px 32px", marginBottom: "32px" }}
                  >
                    Save
                  </Button>
                  <hr />
                  <Row className="mb-4">
                    <Col>
                      <h2 style={{ fontSize: "16px", fontWeight: "bold" }}>
                        Delete Account
                      </h2>
                      <p>
                        If you delete your account, your personal information
                        will be wiped from Coursera's servers, all of your
                        course activity will be anonymized and any certificates
                        earned will be deleted. This action cannot be undone!
                        Cancel any active subscriptions before you delete your
                        account.
                      </p>
                      <Button
                        variant="outline-primary"
                        style={{ padding: "12px 32px" }}
                      >
                        Delete Account
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </div>
            </CardBody>
          </Card>
        );
      case "communication":
        return (
          <Card className={"p-2"}>
            <CardBody>
              <div>
                <h1
                  style={{
                    fontSize: "24px",
                    fontWeight: "normal",
                    padding: "0px 0px 32px",
                  }}
                >
                  Communication Preferences
                </h1>
                <Row>
                  <Col>
                    <Form>
                      {["checkbox"].map((type) => (
                        <div key={`inline-${type}`} className="mb-3">
                          <Form.Check
                            inline
                            label="Opt-out of all Coursera emails (Optional)"
                            name="group1"
                            type={type}
                            id={`inline-${type}-1`}
                          />
                        </div>
                      ))}
                    </Form>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <h2
                      style={{
                        fontWeight: "bold",
                        fontSize: "12px",
                        margin: "0px 0px 12px",
                      }}
                    >
                      Communication from Coursera
                    </h2>
                    <p
                      style={{
                        fontWeight: "bold",
                        fontSize: "16px",
                        margin: "0px 0px 4px",
                      }}
                    >
                      {" "}
                      I want to receive the following:
                    </p>
                    <Form>
                      {["checkbox"].map((type) => (
                        <div key={`inline-${type}`} className="mb-3">
                          <Form.Check
                            label="Weekly personalized course recommendations"
                            name="group1"
                            type={type}
                            id={`inline-${type}-1`}
                            style={{ margin: "4px 0" }}
                          />

                          <Form.Check
                            label="Weekly notifications about promotions, new courses and programs, and special events"
                            name="group1"
                            type={type}
                            id={`inline-${type}-2`}
                            style={{ margin: "4px 0" }}
                          />

                          <Form.Check
                            label="Information on online Master’s and Bachelor’s Degree programs"
                            name="group1"
                            type={type}
                            id={`inline-${type}-3`}
                            style={{ margin: "4px 0" }}
                          />

                          <Form.Check
                            label="Surveys and invitations to help us improve Coursera content and your experience"
                            name="group1"
                            type={type}
                            id={`inline-${type}-4`}
                            style={{ margin: "4px 0" }}
                          />
                        </div>
                      ))}
                    </Form>
                  </Col>
                </Row>
                <Row>
                  <Col style={{ margin: "20px 0px 0px", padding: "16px 30px" }}>
                    <Button variant="outline-primary">Save</Button>
                  </Col>
                </Row>
              </div>
            </CardBody>
          </Card>
        );

      case "notes":
        return (
          <Card className={"p-2"}>
            <CardBody>
              <div>
                <h1
                  style={{
                    fontSize: "24px",
                    fontWeight: "normal",
                    padding: "0px 0px 32px",
                  }}
                >
                  Notes & Highlights
                </h1>
                <Row
                  style={{
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <h3
                    style={{ fontWeight: "bold", fontSize: "12.6px", flex: 1 }}
                  >
                    Notes & Highlights
                  </h3>
                  <Form
                    style={{
                      display: "flex",
                      alignItems: "center",
                      flex: 1,
                      justifyContent: "flex-end",
                    }}
                  >
                    <Form.Group
                      controlId="custom-switch"
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <label style={{ marginRight: "10px" }}>
                        Do not allow
                      </label>
                      <Form.Check type="switch" style={{ margin: "0 10px" }} />
                      <label>Allow</label>
                    </Form.Group>
                  </Form>
                </Row>
                <Row
                  style={{
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingTop: "16px",
                  }}
                >
                  <p>
                    Your highlighting and note-taking activity can be used in
                    combination with that of other learners in the course to
                    determine the most highlighted phrases. No personal
                    information is displayed to other learners.
                  </p>
                </Row>
                <Button
                  variant="outline-primary"
                  style={{ padding: "12px 32px", marginBottom: "32px" }}
                >
                  Save
                </Button>
              </div>
            </CardBody>
          </Card>
        );

      case "calendar":
        return (
          <Card className={"p-2"}>
            <CardBody>
              <div>
                <h1
                  style={{
                    fontSize: "24px",
                    fontWeight: "normal",
                    padding: "0px 0px 32px",
                  }}
                >
                  Calendar Sync
                </h1>
                <p style={{ margin: "0px 0px 20px" }}>
                  Automatically sync all the deadlines and other related items
                  from all active courses to your calendar.
                </p>
                <h2 style={{ fontSize: "16px" }}>Add to my calendar</h2>
                <Button variant="outline-primary" style={{ margin: "10px" }}>
                  Google Calendar
                </Button>
              </div>
            </CardBody>
          </Card>
        );
      default:
        return (
          <h1 style={{ fontSize: "24px", fontWeight: "normal" }}>Account</h1>
        );
    }
  };

  return (
    <Container>
      <Row>
        <Col xs={12} md={3} style={{ padding: "32px" }}>
          <p
            style={{ cursor: "pointer" }}
            onClick={() => setActiveSection("account")}
          >
            <i className="bi bi-person"></i> Account
          </p>
          <p
            style={{ cursor: "pointer" }}
            onClick={() => setActiveSection("communication")}
          >
            <i className="bi bi-envelope"></i> Communication Preferences
          </p>
          <p
            style={{ cursor: "pointer" }}
            onClick={() => setActiveSection("notes")}
          >
            <i className="bi bi-journal-text"></i> Notes & Highlights
          </p>
          <p
            style={{ cursor: "pointer" }}
            onClick={() => setActiveSection("calendar")}
          >
            <i className="bi bi-calendar"></i> Calendar Sync
          </p>
        </Col>

        <Col
          xs={12}
          md={9}
          style={{ backgroundColor: "white", padding: "32px" }}
        >
          {renderContent()}
        </Col>
      </Row>
    </Container>
  );
}
