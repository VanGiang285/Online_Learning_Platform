import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Row,
  Col,
  Container,
  Form,
  Button,
  Card,
  Badge,
  Pagination,
  Navbar,
  Offcanvas,
  Nav,
  FormControl,
  NavDropdown
} from "react-bootstrap";
import "./style.css";

export default function ViewCourseByCate() {
  const { cateId } = useParams();

  const [listCate, setListCate] = useState([]);
  const [listCourse, setListCourse] = useState([]);
  const [listUser, setListUser] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedInstructors, setSelectedInstructors] = useState([]);
  const [selectedPrice, setSelectedPrice] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    fetch(`http://localhost:9999/category/${cateId}`)
      .then((res) => res.json())
      .then((category) => setSelectedCategory(category))
      .catch((err) => console.error("error: ", err));

    fetch("http://localhost:9999/category")
      .then((res) => res.json())
      .then((listCate) => setListCate(listCate))
      .catch((err) => console.error("error: ", err));

    fetch("http://localhost:9999/user")
      .then((res) => res.json())
      .then((listUser) => setListUser(listUser))
      .catch((err) => console.error("error: ", err));
  }, [cateId]);

  useEffect(() => {
    fetch("http://localhost:9999/course")
      .then((res) => res.json())
      .then((listCourse) => {
        let filteredCourses = listCourse;
        if (selectedInstructors.length > 0) {
          filteredCourses = filteredCourses.filter((course) =>
            selectedInstructors.includes(course.instructorId)
          );
        }
        if (selectedPrice === "free") {
          filteredCourses = filteredCourses.filter((course) => course.cPrice === 0);
        } else if (selectedPrice === "paid") {
          filteredCourses = filteredCourses.filter((course) => course.cPrice > 0);
        }
        if (searchTerm.length > 0) {
          filteredCourses = filteredCourses.filter((course) =>
            course.cName.toLowerCase().includes(searchTerm.toLowerCase())
          );
        }
        setListCourse(filteredCourses);
      })
      .catch((err) => console.error("error: ", err));
  }, [selectedInstructors, selectedPrice, searchTerm]);

  const handleInstructorChange = (id) => {
    setSelectedInstructors((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((instructorId) => instructorId !== id)
        : [...prevSelected, id]
    );
  };

  const handlePriceChange = (price) => {
    setSelectedPrice(price);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleCategoryChange = (id) => {
    setSelectedCategory(id === selectedCategory ? null : id);
  };

  return (
    <Container fluid>
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
                      <NavDropdown.Item key={cate.id} onClick={() => handleCategoryChange(cate.id)}>
                        {cate.cateName}
                      </NavDropdown.Item>
                    ))}
                  </NavDropdown>
                </Nav>
                <Form className="d-flex" onSubmit={(e) => e.preventDefault()}>
                  <FormControl
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                    style={{ borderRadius: "20px" }}
                    value={searchTerm}
                    onChange={handleSearchChange}
                  />
                  <Button variant="outline-secondary" type="submit">
                    <i className="bi bi-search"></i>
                  </Button>
                </Form>
                <Nav>
                  <Nav.Link>
                    <Link to={'/login'} style={{ color: 'black' }}>
                      <i
                        className="bi bi-bell"
                      ></i>
                    </Link>
                  </Nav.Link>
                  <Nav.Link>
                    <Link to={'/login'} style={{ color: 'black' }}>
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
      <Container style={{ marginTop: "20px" }}>
        <Row>
          <Col sm={8}>
            <Row>
              <Col>
                <h5>All Courses</h5>
              </Col>
              <Col className="d-flex justify-content-end align-items-center">
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search"
                    aria-label="Search"
                    aria-describedby="button-addon2"
                    value={searchTerm}
                    onChange={handleSearchChange}
                  />
                  <button
                    className="btn btn-outline-secondary"
                    type="button"
                    id="button-addon2"
                  >
                    <i className="bi bi-search"></i>
                  </button>
                </div>
              </Col>
            </Row>
            {listCourse
              ?.filter((course) => selectedCategory ? course.cateId === selectedCategory : true)
              .map((course) => (
                <Link key={course.id} to={`/viewCourseSingle/${course.id}`} className="no-underline">
                  <Row style={{ marginTop: "10px" }}>
                    <Col>
                      <Card className="d-flex flex-row">
                        <div>
                          <Card.Img
                            variant="top"
                            src={course.cImage}
                            style={{ maxWidth: "286px", maxHeight: "180px" }}
                          />
                        </div>
                        <Card.Body className="flex-grow-1">
                          <Badge pill className="badge-category">
                            {listCate?.find((cate) => cate.id == course.cateId)?.cateName}
                          </Badge>
                          <Card.Title className="mt-2 mb-3">
                            {course.cName}
                          </Card.Title>
                          <Card.Text>
                            <p>
                              <span className="text-by">by: </span>
                              <span style={{ fontWeight: "bold" }}>
                                {listUser?.find((user) => user.id == course.instructorId)?.uFullName}
                              </span>
                            </p>
                            <div className="course-info">
                              <span>
                                <i className="bi bi-clock-fill"></i> 4 weeks
                              </span>
                              <span>
                                <i className="bi bi-mortarboard"></i> {course.cEnrolledStudent} enrolled
                              </span>
                            </div>
                            <div className="d-flex justify-content-between mt-3">
                              <div className="course-price">
                                <span>{course.cPrice} $</span>
                              </div>
                              <div className="view-more">
                                <Link
                                  to={`/viewCourseSingle/${course.id}`}
                                  style={{ fontWeight: "bold" }}
                                  className="no-style"
                                >
                                  View more
                                </Link>
                              </div>
                            </div>
                          </Card.Text>
                        </Card.Body>
                      </Card>
                    </Col>
                  </Row>
                </Link>
              ))}
            <Pagination className="justify-content-center">
              <Pagination.Prev />
              <Pagination.Item>{1}</Pagination.Item>
              <Pagination.Item>{2}</Pagination.Item>
              <Pagination.Item>{3}</Pagination.Item>
              <Pagination.Next />
            </Pagination>
          </Col>
          <Col xs={4}>
            <Form>
              <Col>
                <Form.Group>
                  <Form.Label>
                    <strong>Categories</strong>
                  </Form.Label>
                  {listCate?.map((category) => (
                    <Form.Check
                      key={category.id}
                      type="checkbox"
                      label={category.cateName}
                      id={category.id}
                      checked={selectedCategory === category.id}
                      onChange={() => handleCategoryChange(category.id)}
                    />
                  ))}
                </Form.Group>

                <Form.Group>
                  <Form.Label>
                    <strong>Instructor</strong>
                  </Form.Label>
                  {listUser
                    ?.filter((user) => user.rId === 2)
                    ?.map((user) => (
                      <Form.Check
                        key={user.id}
                        type="checkbox"
                        label={user.uFullName}
                        id={user.id}
                        checked={selectedInstructors.includes(user.id)}
                        onChange={() => handleInstructorChange(user.id)}
                      />
                    ))}
                </Form.Group>
                <Form.Group>
                  <Form.Label>
                    <strong>Price</strong>
                  </Form.Label>
                  <Form.Check
                    type="radio"
                    label="All"
                    id="all"
                    name="price"
                    checked={selectedPrice === "all"}
                    onChange={() => handlePriceChange("all")}
                  />
                  <Form.Check
                    type="radio"
                    label="Free"
                    id="free"
                    name="price"
                    checked={selectedPrice === "free"}
                    onChange={() => handlePriceChange("free")}
                  />
                  <Form.Check
                    type="radio"
                    label="Paid"
                    id="paid"
                    name="price"
                    checked={selectedPrice === "paid"}
                    onChange={() => handlePriceChange("paid")}
                  />
                </Form.Group>
              </Col>
            </Form>
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
                  <li key={cate.id}>
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
              <i className="bi bi-arrow-up"></i>
            </Button>
          </Row>
        </Container>
      </Row>
    </Container>
  );
}
