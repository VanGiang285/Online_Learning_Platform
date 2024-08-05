import { Container, Row, Breadcrumb, Button, Col, Card, Tab, Tabs, Form, FloatingLabel, Accordion, Image, ProgressBar, ListGroup, Pagination, Navbar, Offcanvas, Nav, FormControl, NavDropdown } from "react-bootstrap";
import 'bootstrap-icons/font/bootstrap-icons.css';
import "./CourseSingle.css";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import ViewHeadlineCourseSingle from "./ViewHeadlineCourseSingle";
import ViewCourseTab from "./ViewCourseTab";

export default function ViewCourseSingle() {
    const { cId } = useParams();
    const [listEnroll, setListEnroll] = useState([]);
    const [listCate, setListCate] = useState([]);
    const [listCourse, setListCourse] = useState([]);
    const [listUser, setListUser] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState({});

    useEffect(() => {
        fetch("http://localhost:9999/enroll")
            .then((res) => res.json())
            .then((listEnroll) => {
                setListEnroll(listEnroll);
            })
            .catch((err) => console.error("error: ", err));

        fetch(`http://localhost:9999/course/${cId}`)
            .then((res) => res.json())
            .then((course) => setSelectedCourse(course))
            .catch((err) => console.error("error: ", err));

        fetch("http://localhost:9999/category")
            .then((res) => res.json())
            .then((listCate) => setListCate(listCate))
            .catch((err) => console.error("error: ", err));

        fetch("http://localhost:9999/course")
            .then((res) => res.json())
            .then((listCourse) => setListCourse(listCourse))
            .catch((err) => console.error("error: ", err));

        fetch("http://localhost:9999/user")
            .then((res) => res.json())
            .then((listUser) => setListUser(listUser))
            .catch((err) => console.error("error: ", err));
    }, [cId]);
    
    const scrollToTop = () => {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      };
    return (
        <Container fluid>
            <Row style={{ padding: "0px 50px", backgroundColor: "#f8f9fa" }}>
              <Navbar key="lg" expand="lg" style={{ alignContent: "center" }}>
                <Container fluid>
                  <Navbar.Brand
                    href="#home"
                    style={{ fontWeight: "bold", color: "#87CEFA" }}
                  >
                    <i className="bi bi-book"></i> Edu-Learn
                  </Navbar.Brand>
                  <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-lg`} />
                  <Navbar.Offcanvas
                    id={`offcanvasNavbar-expand-lg`}
                    aria-labelledby={`offcanvasNavbarLabel-expand-lg`}
                    placement="start"
                  >
                    <Offcanvas.Header closeButton>
                      <Offcanvas.Title id={`offcanvasNavbarLabel-expand-lg`}>
                        <a
                          href="#home"
                          style={{ fontWeight: "bold", color: "#87CEFA" }}
                        >
                          <i className="bi bi-book"></i> Edu-Learn
                        </a>
                      </Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                      <Nav className="justify-content flex-grow-1 pe-3">
                        <Nav.Link href="#home" style={{ display: "flex" }}>
                          <Link to={"/homeViewer"} style={{ textDecoration: "none", color: "#000" }}>Home</Link>
                        </Nav.Link>
                        <Nav.Link href="#course" style={{ display: "flex" }}>
                          <Link to={"/allCourseViewer"} style={{ textDecoration: "none", color: "#000" }}>Course</Link>
                        </Nav.Link>
                        <NavDropdown
                          title="Discovery"
                          id="basic-nav-dropdown"
                          style={{ display: "flex" }}
                        >
                          {listCate?.map((cate) => (
                            <NavDropdown.Item href="#">
                              {cate.cateName}
                            </NavDropdown.Item>
                          ))}
                        </NavDropdown>
                      </Nav>
                      <Form className="d-flex">
                        <FormControl
                          type="search"
                          placeholder="Search"
                          className="me-2"
                          aria-label="Search"
                          style={{ borderRadius: "20px" }}
                        />
                      </Form>
                      <Nav>
                        <Nav.Link>
                          <Link to={'/login'} style={{color:'black'}}>
                            <i
                              className="bi bi-bell"
                            ></i>
                          </Link>
                        </Nav.Link>
                        <Nav.Link>
                          <Link to={'/login'} style={{color:'black'}}>
                            <i
                                className="bi bi-person-circle"
                              ></i>
                          </Link>
                        </Nav.Link>
                      </Nav>
                    </Offcanvas.Body>
                  </Navbar.Offcanvas>
                </Container>
              </Navbar>
            </Row>
            <Row>
                <ViewHeadlineCourseSingle/>
            </Row>
            <Container className="course-detail-container">
                <Row >
                    <Col md={8} style={{ padding: "0px" }}>
                        <ViewCourseTab/>
                    </Col>
                </Row>
            </Container>
            <Container style={{ width: "82%" }}>
                <Row >
                    <Col md={8} style={{ padding: "0px" }}>
                        <Comment />
                    </Col>
                </Row>
            </Container>
            {/* Footer */}
            <Row>
              <Container
                fluid
                style={{ backgroundColor: "#f8f9fa", marginTop: "100px" }}
              >
                <Row style={{ padding: "20px 100px" }}>
                  <Col sm={12} md={6} lg={3}>
                    <h4 style={{ fontWeight: "Bold" }}>Edu-learn</h4>
                    <p style={{ textAlign: "justify" }}>
                      Edu-Learn is your go-to platform for online learning. Explore
                      a variety of courses to expand your knowledge and skills in
                      diverse fields. Join us and start your learning journey today!
                    </p>
                  </Col>
                  <Col sm={12} md={6} lg={3}>
                    <h4>About Us</h4>
                    <ul className="list-unstyled">
                      <li>
                        <Link to={"/Contact"} className="footer-link">
                          Contact Us
                        </Link>
                      </li>
                      <li>
                        <Link to={"/FAQ"} className="footer-link">
                          FAQ
                        </Link>
                      </li>
                    </ul>
                  </Col>
                  <Col sm={12} md={6} lg={3}>
                    <h4 style={{ fontWeight: "Bold" }}>PROGRAMS</h4>
                    <ul className="list-unstyled">
                      {listCate?.map((cate) => (
                        <li>
                          <a href="#" className="footer-link">
                            {cate.cateName}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </Col>
                  <Col sm={12} md={6} lg={3}>
                    <h4 style={{ fontWeight: "Bold" }}>CONTACT US</h4>
                    <ul className="list-unstyled footer-icons">
                      <li>Adress: Street, Place, Place, Country, Nation</li>
                      <li>Tel: 12345678910</li>
                      <li>Mail: Example1223@gmail.com</li>
                      <li>
                        <a href="#" className="footer-link">
                          <i className="bi bi-facebook"></i>
                        </a>
                        <a href="#" className="footer-link">
                          <i className="bi bi-pinterest"></i>
                        </a>
                        <a href="#" className="footer-link">
                          <i className="bi bi-twitter-x"></i>
                        </a>
                        <a href="#" className="footer-link">
                          <i className="bi bi-instagram"></i>
                        </a>
                        <a href="#" className="footer-link">
                          <i className="bi bi-youtube"></i>
                        </a>
                      </li>
                    </ul>
                  </Col>
                  <Button onClick={scrollToTop} className="scroll-button">
                    <i class="bi bi-arrow-up"></i>
                  </Button>
                </Row>
              </Container>
            </Row>
        </Container>
    );
}

function Comment() {
    return (
        <Container>
            <Row>
                <h6>Leave A Comment</h6>
                <p>Your email address will not be public. Required fill are marked *.</p>
                <Form>
                    <Row className="mb-3">
                        <Form.Group controlId="formGridCity" className="col-sx-12 col-md-6" style={{ marginBottom: "10px" }}>
                            <Form.Control placeholder='Name*' />
                        </Form.Group>
                        
                        <Form.Group controlId="formGridState" className="col-sx-12 col-md-6" style={{ marginBottom: "10px" }}>
                            <Form.Control placeholder='Email*' />
                        </Form.Group>
                    </Row>

                    <FloatingLabel controlId="floatingTextarea2" label="Comment" className="col-sx-12 col-md-12" style={{ marginBottom: "15px" }}>
                        <Form.Control
                            as="textarea"
                            style={{ height: '100px' }}
                        />
                    </FloatingLabel>
                    <Form style={{ marginBottom: '10px' }}>
                        <Form.Check
                            type="checkbox"
                            id="custom-switch"
                            label="Save my name, email in this browser for the next time I comment"
                        />
                    </Form>
                    <Row>
                        <Col >
                            <Button type="submit" className="comment-button">
                                Posts Comment
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </Row>
        </Container>

    );

}