import {
    Container,
    Row,
    Navbar,
    Nav,
    Button,
    NavDropdown,
    Form,
    Dropdown,
    SplitButton,
    DropdownButton,
    ButtonGroup,
    Col,
    Offcanvas,
    Carousel,
    Image,
    Card,
    FormControl,
    Badge,
    ListGroup,
    Tab
} from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

export default function Home(){
    const scrollToTop = () => {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      };
      const [listCate, setListCate] = useState([]);
      const [listCourse, setListCourse] = useState([]);
      const [listUser, setListUser] = useState([]);
    
      useEffect(() => {
    
        fetch("http://localhost:9999/category")
          .then((res) => res.json())
          .then((listCate) => setListCate(listCate))
          .catch((err) => console.error("error: ", err));
    
        fetch("http://localhost:9999/course")
          .then((res) => res.json())
          .then((listCoure) => setListCourse(listCoure))
          .catch((err) => console.error("error: ", err));
    
        fetch("http://localhost:9999/user")
          .then((res) => res.json())
          .then((listUser) => setListUser(listUser))
          .catch((err) => console.error("error: ", err));
      }, []);
    
      return (
          <Container fluid>
            {/* Header */}
            <Row style={{ padding: "0px 50px", backgroundColor: "#f8f9fa" }}>
              <Navbar key="lg" expand="lg" style={{ alignContent: "center" }}>
                <Container fluid>
                  <Navbar.Brand
                        href="/"
                        style={{ fontWeight: "bold", color: "#87CEFA" }}
                    >
                        <Link to={"/homeViewer"} style={{ textDecoration: "none" }}><i className="bi bi-book"></i> Edu-Learn</Link>
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
    
            {/* Carousel */}
            <Row>
              <Col style={{ padding: "0px 0px" }}>
                <Carousel>
                  <Carousel.Item className="custom-carousel-item">
                    <Image
                      src="/image/Homepage/banner.jpg"
                      className="customSizeImage"
                    />
                    <Carousel.Caption>
                      <h3>Edu-Learn</h3>
                      <p>Describe Course</p>
                    </Carousel.Caption>
                  </Carousel.Item>
                  <Carousel.Item className="custom-carousel-item">
                    <Image
                      src="/image/Homepage/banner.jpg"
                      className="customSizeImage"
                    />
                    <Carousel.Caption>
                      <h3>Course </h3>
                      <p>Describe Course</p>
                    </Carousel.Caption>
                  </Carousel.Item>
                </Carousel>
              </Col>
            </Row>
    
            {/* Featured */}
            <Row>
              <Container style={{ marginTop: "50px", width: "60%" }}>
                <Row>
                  <Col>
                    <h4 style={{ fontWeight: "bold" }}>Featured Categories</h4>
                    <p>Discovery popular courses</p>
                  </Col>
                </Row>
                <Row>
                  {listCate?.map((category) => (
                    <Col sm={6} md={4} lg={3} style={{ marginBottom: "20px" }}>
                      <Link
                        to={`/viewCourseByCate/${category.id}`}
                        className="no-underline"
                      >
                        <Card className="category-box">
                          <Card.Body className="d-flex flex-column align-items-center justify-content-center">
                            <i
                              className={category.icon}
                              style={{ fontSize: "2rem" }}
                            ></i>
                            <h6 className="mt-3">{category.cateName}</h6>
                          </Card.Body>
                        </Card>
                      </Link>
                    </Col>
                  ))}
                </Row>
    
                {/* Featured Courses */}
                <Row style={{ marginTop: "50px" }}>
                  <Row>
                    <Col>
                      <h4 style={{ fontWeight: "bold" }}>Featured Courses</h4>
                      <p>Expore our finest courses</p>
                    </Col>
                    <Col className="d-flex justify-content-end align-items-center">
                      <Link to={"/allCourseViewer"}>
                        <Button
                          variant="outline-dark"
                          style={{ borderRadius: "20px" }}
                        >
                          All Courses
                        </Button>
                      </Link>
                    </Col>
                  </Row>
                  <Row>
                    {listCourse?.map((course) => (
                      <Col sm={12} md={6} lg={4}>
                        <Link
                          to={`/viewCourseSingle/${course.id}`}
                          className="no-underline"
                        >
                          <Card className="course-card">
                            <Card.Img
                              variant="top"
                              src={course.cImage}
                              style={{ maxWidth: "100%", maxHeight: "180px" }}
                            />
                            <Card.Body>
                              <Badge pill className="badge-category">
                                {
                                  listCate?.find((l) => l.id == course.cateId)
                                    ?.cateName
                                }
                              </Badge>
                              <p>
                                <span className="text-by">by: </span>
                                <span style={{ fontWeight: "bold" }}>
                                  {
                                    listUser?.find(
                                      (l) => l.id == course.instructorId
                                    )?.uFullName
                                  }
                                </span>
                              </p>
                              <h5 className="course-name">{course.cName}</h5>
                              <div className="course-info">
                                <span>
                                  <i className="bi bi-mortarboard"></i>{" "}
                                  {course.cEnrolledStudent} enrolled
                                </span>
                              </div>
                              <div className="d-flex justify-content-between">
                                <div className="course-price">
                                  <span>{course.cPrice} $</span>
                                </div>
                                <div className="view-more">
                                  <a
                                    href="#"
                                    style={{ fontWeight: "bold" }}
                                    className="no-style"
                                  >
                                    View more
                                  </a>
                                </div>
                              </div>
                            </Card.Body>
                          </Card>
                        </Link>
                      </Col>
                    ))}
                  </Row>
                </Row>
              </Container>
            </Row>
    
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