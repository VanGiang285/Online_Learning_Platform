import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  ListGroup,
  Tab,
  Accordion,
  Offcanvas,
  Button,
  Form,
  Card,
  Table,
  Image,
} from "react-bootstrap";
import './CoursePage.css';
import { useParams } from "react-router-dom";
import YouTube from "react-youtube";
import Header from "../HomepageUser/HeaderUser";
import Footer from "../HomepageUser/Footer";

export default function CoursePage() {
  const [activeItem, setActiveItem] = useState("Module 1");
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const { uId, cId } = useParams();
  const [listEnroll, setListEnroll] = useState([]);
  const [listUser, setListUser] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState({});
  const [selectedEnroll, setSelectedEnroll] = useState();
  const [selectedVideoUrl, setSelectedVideoUrl] = useState("");
  const [selectedAnswers, setSelectedAnswers] = useState({});

  useEffect(() => {
    // Fetch course data
    fetch(`http://localhost:9999/course/${cId}`)
      .then((res) => res.json())
      .then((result) => setSelectedCourse(result))
      .catch((err) => console.error("Error fetching course: ", err));

    // Fetch user data
    fetch("http://localhost:9999/user")
      .then((res) => res.json())
      .then((result) => setListUser(result))
      .catch((err) => console.error("Error fetching users: ", err));

    // Fetch enrollment data
    fetch("http://localhost:9999/enroll")
      .then((res) => res.json())
      .then((result) => {
        setListEnroll(result);
        const foundEnroll = result?.find(
          (enroll) => enroll.userId === uId && enroll.courseId === cId
        );

        if (foundEnroll) {
          setSelectedEnroll(foundEnroll);
        } else {
          setSelectedEnroll(null);
        }
      })
      .catch((err) => console.error("Error fetching enrollments: ", err));
  }, [cId, uId]);

  // Handle module selection
  const handleClick = (moduleName) => {
    setActiveItem(moduleName);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Handle video selection
  const handleClickVideo = (videoUrl) => {
    setSelectedVideoUrl(videoUrl);
  };

  // Handle selecting an answer for quiz
  const handleSelectAnswer = (quizId, choiceId) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [quizId]: choiceId,
    });
  };

  // Handle quiz submission
  const handleSubmitQuiz = () => {
    let moduleScore = 0;

    // Find current module based on activeItem
    const currentModule = selectedCourse.courseModule.find(
      (module) => module.name === activeItem
    );

    // Calculate score for current module's quiz
    currentModule.cQuiz.forEach((quiz) => {
      const selectedChoiceId = selectedAnswers[quiz.id];

      if (selectedChoiceId !== undefined) {
        const selectedChoice = quiz.choice.find(
          (choice) => choice.choiceId === selectedChoiceId
        );

        if (selectedChoice && selectedChoice.choiceName === quiz.answer) {
          moduleScore++;
        }
      }
    });

    // Update progress on server
    fetch(`http://localhost:9999/enroll/${selectedEnroll.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...selectedEnroll,
        progress: selectedEnroll.progress.map((module) => {
          if (module.id === currentModule.id) {
            return {
              ...module,
              moduleGrade: moduleScore,
              moduleStatus: true,
            };
          }
          return module;
        }),
      }),
    })
      .then((res) => {
        if (res.ok) {
          alert(`Your score for ${activeItem} is: ${moduleScore}`);
        } else {
          throw new Error('Failed to update progress');
        }
      })
      .catch((err) => console.error('Error updating progress:', err));
  };

  // Render the component
  return (
    <Container fluid>
      <Header />

      {/* Tab navigation */}
      <Tab.Container id="list-group-tabs-example" defaultActiveKey="#module1">
        <Row>
          {/* Button to show offcanvas on small screens */}
          <Button
            onClick={() => setShowOffcanvas(true)}
            className="d-lg-none mb-3"
            style={{
              position: "fixed",
              top: "60px",
              right: "10px",
              width: "3rem",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "10px",
              backgroundColor: "grey",
              zIndex: "9999",
            }}
          >
            <i className="bi bi-list"></i>
          </Button>

          {/* Offcanvas for course navigation */}
          <Col lg={2}>
            <Card
              style={{
                width: "auto",
                border: "none",
                padding: "20px",
                textAlign: "center",
              }}
              className="d-none d-lg-block"
            >
              <Card.Img
                variant="top"
                src={selectedCourse.cImage}
                style={{ borderRadius: "20px" }}
              />
              <Card.Body>
                <Card.Title>{selectedCourse.cName}</Card.Title>
              </Card.Body>
            </Card>

            <Offcanvas show={showOffcanvas} onHide={() => setShowOffcanvas(false)} responsive="lg">
              <Offcanvas.Header closeButton>
                <Offcanvas.Title>Course Navigation</Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body className="d-flex justify-content-center">
                <ListGroup>
                  <Accordion defaultActiveKey="0">
                    <Accordion.Item eventKey="0" style={{ border: "none" }}>
                      <Accordion.Header className="centered-header">
                        <div
                          className="w-100 text-center"
                          style={{ textAlign: "center", padding: "10px 0px" }}
                        >
                          <b style={{ paddingRight: "10px" }}>Course Material</b>
                        </div>
                      </Accordion.Header>
                      <Accordion.Body style={{ textAlign: "center", padding: "10px 0px" }}>
                        {selectedCourse.courseModule?.map((module) => (
                          <ListGroup.Item
                            key={module.id}
                            action
                            href={`#${module.name}`}
                            className={`list-item ${activeItem === module.name ? "list-item-active" : ""}`}
                            style={{
                              backgroundColor: "white",
                              color: "black",
                              border: "none",
                            }}
                            onClick={() => handleClick(module.name)}
                          >
                            {module.name}
                          </ListGroup.Item>
                        ))}
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                  <ListGroup.Item
                    action
                    href="#grades"
                    className={`list-item ${activeItem === "grades" ? "list-item-active" : ""}`}
                    style={{
                      backgroundColor: "white",
                      color: "black",
                      border: "none",
                      textAlign: "center",
                    }}
                    onClick={() => handleClick("grades")}
                  >
                    <b>Grades</b>
                  </ListGroup.Item>
                  <ListGroup.Item
                    action
                    href="#courseInfo"
                    className={`list-item ${activeItem === "courseInfo" ? "list-item-active" : ""}`}
                    style={{
                      backgroundColor: "white",
                      color: "black",
                      border: "none",
                      textAlign: "center",
                    }}
                    onClick={() => handleClick("courseInfo")}
                  >
                    <b>Course Info</b>
                  </ListGroup.Item>
                </ListGroup>
              </Offcanvas.Body>
            </Offcanvas>
          </Col>

          {/* Main content area */}
          <Col style={{ borderLeft: "2px solid black" }}>
            <Tab.Content>
              {/* Render each module's content */}
              {selectedCourse.courseModule?.map((module) => (
                <Tab.Pane eventKey={`#${module.name}`} key={module.id}>
                  <Row style={{ padding: "50px 50px" }}>
                    {/* Accordion for module details */}
                    <Accordion defaultActiveKey="0">
                      <Accordion.Item eventKey="0">
                        <Accordion.Header>
                          <b>{module.name}</b>
                        </Accordion.Header>
                        <Accordion.Body>
                          {/* Accordion for video section */}
                          <Accordion defaultActiveKey="0" style={{ padding: "20px 0px" }}>
                            <Accordion.Item eventKey="0">
                              <Accordion.Header>
                                <b>Video</b>
                              </Accordion.Header>
                              <Accordion.Body>
                                {/* Render video buttons */}
                                {module.cVideo?.map((video) => (
                                  <Row key={video.id}>
                                    <Button
                                      href="#"
                                      id={video.id}
                                      className="customButton"
                                      onClick={() =>
                                        handleClickVideo(video.videoUrl)
                                      }
                                    >
                                      <i
                                        className="bi bi-play-circle"
                                        style={{ fontStyle: "normal" }}
                                      >
                                        {video.videoTitle}
                                      </i>
                                    </Button>
                                  </Row>
                                ))}
                                {/* Render selected video */}
                                {selectedVideoUrl && (
                                  <Row style={{ marginTop: "20px" }}>
                                    <YouTube
                                      videoId={selectedVideoUrl.split("v=")[1]}
                                      opts={{ width: "100%", height: "500" }}
                                    />
                                  </Row>
                                )}
                              </Accordion.Body>
                            </Accordion.Item>
                          </Accordion>

                          {/* Accordion for quiz section */}
                          <Accordion defaultActiveKey="0" style={{ padding: "20px 0px" }}>
                            <Accordion.Item eventKey="0">
                              <Accordion.Header>
                                <b>Quiz</b>
                              </Accordion.Header>
                              <Accordion.Body>
                                {/* Render each quiz question */}
                                {module.cQuiz?.map((quiz) => (
                                  <Form key={quiz.id} style={{ margin: '10px 0px' }}>
                                    <Form.Group>
                                      <Form.Label><b>Question {quiz.id}: {quiz.question}</b></Form.Label>
                                      {/* Render each choice for the quiz question */}
                                      {quiz.choice?.map((choice) => (
                                        <Form.Check
                                          key={choice.choiceId}
                                          name={quiz.id}
                                          type="radio"
                                          id={choice.choiceId}
                                          label={choice.choiceName}
                                          onChange={() => handleSelectAnswer(quiz.id, choice.choiceId)}
                                        />
                                      ))}
                                    </Form.Group>
                                  </Form>
                                ))}
                                {/* Button to submit quiz */}
                                <Button style={{ margin: '20px 0px' }} onClick={handleSubmitQuiz}>Submit</Button>
                              </Accordion.Body>
                            </Accordion.Item>
                          </Accordion>
                        </Accordion.Body>
                      </Accordion.Item>
                    </Accordion>
                  </Row>
                </Tab.Pane>
              ))}

              {/* Grades tab */}
              <Tab.Pane eventKey="#grades">
                <Row style={{ padding: "50px 50px" }}>
                  <Card style={{ width: "100%", border: "1px solid black" }}>
                    <Card.Body>
                      <Card.Title style={{ marginBottom: "20px", fontWeight: "bold" }}>Grades</Card.Title>
                      <Card.Text>
                        {/* Placeholder for grades information */}
                        <Row style={{ border: "1px solid lightgrey", padding: "20px 10px", marginBottom: "20px" }}>
                          <Col style={{ fontStyle: "normal" }}>
                            {selectedEnroll?.score > 4 ?
                              <b style={{ color: 'green' }}>You passed this course</b> :
                              <b style={{ color: 'red' }}>You failed this course</b>
                            }
                          </Col>
                        </Row>
                        <Row style={{ border: "1px solid lightgrey", padding: "20px 10px", marginBottom: "20px" }}>
                          <b>Your score: {selectedEnroll?.score}</b>
                        </Row>
                        <Row style={{ border: "1px solid lightgrey", padding: "20px 10px" }}>
                          <Table>
                            <thead>
                              <tr>
                                <th>ID</th>
                                <th>Module Name</th>
                                <th>Score</th>
                                <th>Status</th>
                              </tr>
                            </thead>
                            <tbody>
                              {selectedEnroll?.progress.map((p, index) => (
                                <tr key={index}>
                                  <td>{p.id}</td>
                                  <td>{p.moduleName}</td>
                                  <td>{p.moduleGrade}</td>
                                  <td>
                                    {p.moduleStatus ? <span style={{ color: 'green' }}>Completed</span> : <span style={{ color: 'red' }}>Not yet</span>}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </Table>
                        </Row>
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Row>
              </Tab.Pane>

              {/* Course information tab */}
              <Tab.Pane eventKey="#courseInfo">
                <Row style={{ padding: "10px 50px" }}>
                  <Row
                    style={{
                      borderBottom: "1px solid lightgrey",
                      paddingBottom: "10px",
                    }}
                  >
                    <Card style={{ width: "100%", border: "none" }}>
                      <Card.Body>
                        <Card.Title
                          style={{ paddingBottom: "20px", textAlign: "center" }}
                        >
                          <p style={{ fontWeight: "bold", fontSize: "1cm" }}>
                            {selectedCourse.cName}
                          </p>
                          <a>by {listUser?.find(user => user.id === selectedCourse.instructorId)?.uFullName}</a>
                        </Card.Title>
                        <Card.Text>
                          <Row>
                            <Card.Body>
                              <Card.Title>About this Course</Card.Title>
                              <Card.Text>
                                {selectedCourse.cDescription}
                              </Card.Text>
                            </Card.Body>
                          </Row>
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </Row>
                  <Row
                    style={{
                      padding: "20px 30px",
                      alignContent: "center",
                      borderBottom: "1px solid lightgrey",
                    }}
                    className="d-flex"
                  >
                    <Col xs={2}>
                      <Image
                        src={listUser?.find(user => user.id === selectedCourse.instructorId)?.uImage}
                        roundedCircle
                        style={{
                          border: "1px solid black",
                          backgroundColor: "black",
                          width: "100%",
                        }}
                      />
                    </Col>
                    <Col>
                      <Card style={{ border: "none" }}>
                        <Card.Body>
                          <Card.Title>Taught by: <a href="#">{listUser?.find(user => user.id === selectedCourse.instructorId)?.uFullName}</a></Card.Title>
                        </Card.Body>
                      </Card>
                    </Col>
                  </Row>
                </Row>
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
      <Footer />
    </Container>
  );
}
