import {
    Row,
    Col,
    Container,
    Nav,
    Navbar,
    Form,
    Button,
    Card,
    NavDropdown,
    Alert,
    Carousel,
    Image,
    Badge,
    FormControl,
    Pagination,
} from "react-bootstrap";
import "./style.css";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import HeaderUser from "../HomepageUser/HeaderUser";
import Footer from "../HomepageUser/Footer";

export default function NavPath() {
    return (
        <Navbar bg="light" variant="light">
            <Container>
                <Nav className="">
                    <Nav.Link href="#">Home</Nav.Link>
                    <span className="mx-3" style={{ fontSize: "1.5em" }}>
                        ›
                    </span>
                    <Nav.Link href="#">Course</Nav.Link>
                    <span className="mx-3" style={{ fontSize: "1.5em" }}>
                        ›
                    </span>
                    <Nav.Link href="#">All Courses</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    );
}

export { CoursesBody, CoursesBody2 };

function CoursesBody() {
    const { cateId, uId } = useParams();

    const [listCate, setListCate] = useState([]);
    const [listCourse, setListCourse] = useState([]);
    const [listUser, setListUser] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedInstructors, setSelectedInstructors] = useState([]);
    const [selectedPrice, setSelectedPrice] = useState("all");
    const [searchTerm, setSearchTerm] = useState(""); // State for search term

    useEffect(() => {
        fetch(`http://localhost:9999/category/${cateId}`)
            .then((res) => res.json())
            .then((category) => setSelectedCategories([category.id]))
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

                if (selectedCategories.length > 0) {
                    filteredCourses = filteredCourses.filter((course) =>
                        selectedCategories.includes(course.cateId)
                    );
                }

                // Filter based on search term
                if (searchTerm.length > 0) {
                    filteredCourses = filteredCourses.filter((course) =>
                        course.cName.toLowerCase().includes(searchTerm.toLowerCase())
                    );
                }

                setListCourse(filteredCourses);
            })
            .catch((err) => console.error("error: ", err));
    }, [selectedInstructors, selectedPrice, searchTerm, selectedCategories]);

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
        setSelectedCategories((prevSelected) =>
            prevSelected.includes(id)
                ? prevSelected.filter((categoryId) => categoryId !== id)
                : [...prevSelected, id]
        );
    };

    return (
        <Container fluid>
            <HeaderUser />
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
                            ?.map((course) => (
                                <Link to={`/homepageUser/${uId}/course/${course.id}`} className="no-underline" key={course.id}>
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
                                                        {listCate?.find((l) => l.id == course.cateId)?.cateName}
                                                    </Badge>
                                                    <Card.Title className="mt-2 mb-3">
                                                        {course.cName}
                                                    </Card.Title>
                                                    <Card.Text>
                                                        <p>
                                                            <span className="text-by">by: </span>
                                                            <span style={{ fontWeight: "bold" }}>
                                                                {listUser?.find((l) => l.id == course.instructorId)?.uFullName}
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
                                                                    to={`/home/course/${course.id}`}
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
                                            checked={selectedCategories.includes(category.id)}
                                            onChange={() => handleCategoryChange(category.id)}
                                        />
                                    ))}
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label>
                                        <strong>Instructor</strong>
                                    </Form.Label>
                                    {listUser
                                        ?.filter((user) => user.rId == 2)
                                        ?.map((u) => (
                                            <Form.Check
                                                key={u.id}
                                                type="checkbox"
                                                label={u.uFullName}
                                                id={u.id}
                                                onChange={() => handleInstructorChange(u.id)}
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
            <Footer />
        </Container>
    );
}


function CoursesBody2() {
    const [listCate, setListCate] = useState([]);
    const [listCourse, setListCourse] = useState([]);
    const [listUser, setListUser] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState([]);
    const [selectedInstructors, setSelectedInstructors] = useState([]);
    const [selectedPrice, setSelectedPrice] = useState("all");
    const [searchTerm, setSearchTerm] = useState(""); // State for search term

    const { uId } = useParams();

    useEffect(() => {
        fetch(`http://localhost:9999/category`)
            .then((res) => res.json())
            .then((categories) => setListCate(categories))
            .catch((err) => console.error("error: ", err));

        fetch("http://localhost:9999/user")
            .then((res) => res.json())
            .then((users) => setListUser(users))
            .catch((err) => console.error("error: ", err));
    }, []);

    useEffect(() => {
        fetch("http://localhost:9999/course")
            .then((res) => res.json())
            .then((courses) => {
                let filteredCourses = courses;
                if (selectedCategory.length > 0) {
                    filteredCourses = filteredCourses.filter((course) =>
                        selectedCategory.includes(course.cateId)
                    );
                }
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

                // Filter based on search term
                if (searchTerm.trim() !== "") {
                    filteredCourses = filteredCourses.filter((course) =>
                        course.cName.toLowerCase().includes(searchTerm.toLowerCase())
                    );
                }

                setListCourse(filteredCourses);
            })
            .catch((err) => console.error("error: ", err));
    }, [selectedInstructors, selectedCategory, selectedPrice, searchTerm]);

    const handleCategoryChange = (id) => {
        setSelectedCategory((prevSelected) =>
            prevSelected.includes(id)
                ? prevSelected.filter((categoryId) => categoryId !== id)
                : [...prevSelected, id]
        );
    };

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

    return (
        <Container fluid>
            <HeaderUser />
            <Container style={{ marginTop: "20px" }}>
                <Row>
                    <Col xs={8}>
                        <Row style={{ marginTop: "20px" }}>
                            <Col xs={6}>
                                <h5>All Courses</h5>
                            </Col>
                            <Col xs={6} className="d-flex justify-content-end align-items-center">
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
                                    <div className="input-group-append">
                                        <button className="btn btn-outline-secondary" type="button" id="button-addon2">
                                            <i className="bi bi-search"></i>
                                        </button>
                                    </div>
                                    <div className="btn-group mr-2" role="group" style={{ margin: "0px 5px" }}>
                                        <Button variant="light" className="border" title="List View">
                                            <i className="bi bi-list-task"></i>
                                        </Button>
                                        <Button variant="light" className="border" title="Grid View">
                                            <i className="bi bi-grid"></i>
                                        </Button>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                        <Row style={{ marginTop: "20px" }}>
                            {
                                listCourse?.map(l => (
                                    <Col sm={6} key={l.id}>
                                        <Link to={`/homepageUser/${uId}/course/${l.id}`} className="no-underline">
                                            <Card className="course-card">
                                                <Card.Img variant="top" src={l.cImage} style={{ width: "100%", maxHeight: "220px" }} />
                                                <Card.Body>
                                                    <Badge pill className="badge-category">
                                                        {
                                                            listCate?.find((cate) => cate.id === l.cateId)?.cateName
                                                        }
                                                    </Badge>
                                                    <p><span className="text-by">by: </span><span style={{ fontWeight: "bold" }}>
                                                        {
                                                            listUser?.find(
                                                                (user) => user.id === l.instructorId
                                                            )?.uFullName
                                                        }
                                                    </span></p>
                                                    <h5 className="course-name">{l.cName}</h5>
                                                    <div className="course-info">
                                                        <span><i className="bi bi-clock-fill"></i> 4 weeks</span>
                                                        <span><i className="bi bi-mortarboard"></i> {l.cEnrolledStudent} enrolled</span>
                                                    </div>
                                                    <div className="d-flex justify-content-between">
                                                        <div className="course-price">
                                                            <span>{l.cPrice}$</span>
                                                        </div>
                                                        <div className="view-more">
                                                            <a href="#" style={{ fontWeight: "bold" }} className="no-style">View more</a>
                                                        </div>
                                                    </div>
                                                </Card.Body>
                                            </Card>
                                        </Link>
                                    </Col>
                                ))
                            }
                        </Row>
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
                                            onChange={() => handleCategoryChange(category.id)}
                                        />
                                    ))}
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>
                                        <strong>Instructor</strong>
                                    </Form.Label>
                                    {listUser
                                        ?.filter((user) => user.rId == 2)
                                        ?.map((u) => (
                                            <Form.Check
                                                key={u.id}
                                                type="checkbox"
                                                label={u.uFullName}
                                                id={u.id}
                                                onChange={() => handleInstructorChange(u.id)}
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
            <Footer />
        </Container>
    );
}