import { Container, Row, Breadcrumb, Button, Col, Card, Tab, Tabs, Form, FloatingLabel, Accordion, Image, ProgressBar, ListGroup, Pagination } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./CourseSingle.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function ViewCourseTab() {
    const { cId } = useParams();
    const [listCate, setListCate] = useState([]);
    const [listCourse, setListCourse] = useState([]);
    const [listUser, setListUser] = useState([]);
    const [listModule, setListModule] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState([]);
    const [listEnroll, setListEnroll] = useState([]);

    useEffect(() => {
        fetch("http://localhost:9999/enroll")
        .then((res) => res.json())
        .then((listEnroll) => setListEnroll(listEnroll))
        .catch((err) => console.error("error: ", err));

        fetch(`http://localhost:9999/course/${cId}`)
            .then((res) => res.json())
            .then((course) => setSelectedCourse(course))
            .catch((err) => console.error("error: ", err))

        fetch("http://localhost:9999/category")
            .then((res) => res.json())
            .then((listCate) => setListCate(listCate))
            .catch((err) => console.error("error: ", err))

        fetch("http://localhost:9999/course")
            .then((res) => res.json())
            .then((listCoure) => setListCourse(listCoure))
            .catch((err) => console.error("error: ", err))

        fetch("http://localhost:9999/user")
            .then((res) => res.json())
            .then((listUser) => setListUser(listUser))
            .catch((err) => console.error("error: ", err))
    }, []);

    const instructor = listUser?.find(l => selectedCourse.instructorId == l.id);
    const getTotalCourse = (instructorId) => {
        return listCourse?.filter(course => course.instructorId == instructorId.id).length
    }
    const totalCourses = instructor ? getTotalCourse(instructor) : 0;

    return (
        <Container>
            <Row>
                <Col className="course-detail-content">
                    <Tabs
                        defaultActiveKey="overview"
                        id="uncontrolled-tab-example"
                        className="course-tab-nav"
                        justify
                    >
                        <Tab.Content eventKey="overview" title="Overview" className="course-tab-content">
                            <Tab.Content style={{ paddingTop: "15px" }} >
                                <Row style={{ width: "95%", margin: "auto" }}>
                                    {selectedCourse.cDescription}
                                </Row>
                            </Tab.Content>
                        </Tab.Content>
                        
                        {/* Curriculum */}
                        <Tab.Content eventKey="curriculum" title="Curriculum" className="course-tab-content">
                            <Tab.Content style={{ paddingTop: "15px" }} >
                                <Row style={{ width: "95%", margin: "auto" }}>
                                    {
                                        selectedCourse.courseModule?.map(moduleCourse => (
                                            <Accordion style={{ marginBottom: "10px" }}>
                                                <Accordion.Item eventKey="0" style={{ marginBottom: "10px" }}>
                                                    <Accordion.Header >
                                                        <Col sm={8}>
                                                            <h6 style={{ marginBottom: "0px" }}>{moduleCourse.name}</h6>
                                                        </Col>

                                                        <Col sm={4}>
                                                            <Row>
                                                                <Col md={6}><span className="lesson-header-right">{moduleCourse?.cVideo.length} Lessons</span></Col>
                                                                <Col md={6}><span className="lesson-header-right">1 Quizz</span></Col>
                                                            </Row>
                                                        </Col>
                                                    </Accordion.Header>
                                                    <Accordion.Body >
                                                        {
                                                            moduleCourse.cVideo?.map(video => (
                                                                <Row className="lesson-items-container">
                                                                    <Col>
                                                                        <a href="#" className="lesson-items-left" ><h6 style={{ marginBottom: "0px" }}>{video.videoTitle}</h6></a>
                                                                    </Col>
                                                                </Row>
                                                            ))
                                                        }
                                                        <Row className="lesson-items-container">
                                                            <Col>
                                                                <a href="#" className="lesson-items-left" ><h6 style={{ marginBottom: "0px" }}>Quiz</h6></a>
                                                            </Col>
                                                        </Row>
                                                    </Accordion.Body>
                                                </Accordion.Item>
                                            </Accordion>
                                        ))
                                    }
                                </Row >
                            </Tab.Content>
                        </Tab.Content>

                        {/* Instructor */}
                        <Tab.Content eventKey="instructor" title="Instructor" className="course-tab-content">
                            <Tab.Content style={{ paddingTop: "15px" }} >
                                <Row style={{ width: "95%", margin: "auto" }}>
                                    <Row style={{ padding: "0px", margin: "0px" }}>
                                        <Col md={2} style={{ paddingLeft: "0px" }}>
                                            <Image src={listUser?.find(u => selectedCourse.instructorId == u.id)?.uImage} width={"100%"} style={{ border: "1px solid", borderRadius: "5px" }}></Image>
                                        </Col>
                                        <Col md={10} style={{ padding: "0px" }}>
                                            <h5>{listUser?.find(u => selectedCourse.instructorId == u.id)?.uFullName}</h5>
                                            <p style={{ marginBottom: "4px" }}>Major: {listUser?.find(u => selectedCourse.instructorId == u.id)?.uMajor}</p>
                                            <p><i class="bi bi-file-earmark-text"></i>{totalCourses} Lessons</p>
                                        </Col>
                                    </Row>
                                    <Row style={{ padding: "0px", margin: "0px" }}>
                                        <span>
                                            <ul style={{ listStyle: 'none', display: "flex", paddingLeft: "0px" }} >
                                                <li style={{ paddingRight: "20px" }}>Follow:</li>
                                                <li style={{ paddingRight: "10px" }}><i class="bi bi-facebook"></i></li>
                                                <li style={{ paddingRight: "10px" }}><i class="bi bi-instagram"></i></li>
                                                <li style={{ paddingRight: "10px" }}><i class="bi bi-whatsapp"></i></li>
                                                <li style={{ paddingRight: "10px" }}><i class="bi bi-youtube"></i></li>
                                            </ul>
                                        </span>

                                    </Row>
                                </Row>
                            </Tab.Content>
                        </Tab.Content>
                        <Tab.Content eventKey="contact" title="Review" className="course-tab-content">
                            <Tab.Content style={{ paddingTop: "15px" }} >
                                <Row style={{ width: "95%", margin: "auto", padding: "0px" }}>
                                    <h5>Comments</h5>
                                    <Container fluid style={{ paddingRight: "0px" }}>
                                        <Col md={2} style={{ paddingRight: "0px" }}><h2>4.0</h2></Col>
                                        <Col md={10} style={{ padding: "0px" }}>
                                            <span>
                                                <i class="bi bi-star-fill"></i>
                                                <i class="bi bi-star-fill"></i>
                                                <i class="bi bi-star-fill"></i>
                                                <i class="bi bi-star-fill"></i>
                                                <i class="bi bi-star"></i>
                                            </span>
                                            <p style={{ fontSize: "12px" }}>based on 164,951 ratings</p>
                                        </Col>
                                    </Container>
                                    <Container fluid style={{ paddingRight: "0px" }}>
                                        <Row style={{ marginRight: "0px", paddingRight: "0px", marginBottom: "10px" }}>
                                            <Col md={3}>
                                                <span>
                                                    <i class="bi bi-star-fill"></i>
                                                    <i class="bi bi-star-fill"></i>
                                                    <i class="bi bi-star-fill"></i>
                                                    <i class="bi bi-star-fill"></i>
                                                    <i style={{ paddingRight: "10px" }} class="bi bi-star-fill"></i>
                                                    90%
                                                </span>
                                            </Col>
                                            <Col md={9} style={{ padding: "0px", paddingTop: "5px" }}>
                                                <ProgressBar now={90} style={{ backgroundColor: "white" }} />
                                            </Col>
                                        </Row>
                                    </Container>
                                    <Container fluid style={{ paddingRight: "0px" }}>
                                        <ListGroup variant="flush">
                                            <ListGroup.Item>
                                                <Row >
                                                    <Col md={2}>
                                                        <Image src="./image/CourseSingle/logo192.png" width={"100%"} roundedCircle style={{ border: "1px solid" }} />
                                                    </Col>
                                                    <Col md={10} style={{ padding: "0px" }}>
                                                        <Row style={{ display: "flex" }}>
                                                            <h6 style={{ flex: "2" }}>Laura Hipster</h6>
                                                            <span style={{ flex: "1", fontSize: "14px" }}>October 03, 2022</span>
                                                        </Row>
                                                        <p style={{ marginBottom: "0px" }}> Lorem
                                                        </p>
                                                        <span><i class="bi bi-reply"></i><a href="#" style={{ textDecoration: "none", color: "black" }}>Reply</a></span>
                                                    </Col>
                                                </Row>

                                            </ListGroup.Item>
                                            <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
                                        </ListGroup>
                                    </Container>
                                    <Row>
                                        <Container fluid style={{ paddingRight: "0px" }}>
                                            <Row >
                                                <Col style={{ display: "flex", justifyContent: "center" }}>
                                                    <Pagination style={{ margin: "10px 0px 10px 0px" }}>
                                                        <Pagination.Prev />
                                                        <Pagination.Item>{1}</Pagination.Item>
                                                        <Pagination.Item>{2}</Pagination.Item>
                                                        <Pagination.Item>{3}</Pagination.Item>
                                                        <Pagination.Next />
                                                    </Pagination>
                                                </Col>
                                            </Row>
                                        </Container>
                                    </Row>
                                </Row>
                            </Tab.Content>
                        </Tab.Content>
                    </Tabs>
                </Col>
            </Row>
        </Container>
    );
}