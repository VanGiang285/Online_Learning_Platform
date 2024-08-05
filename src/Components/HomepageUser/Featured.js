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
import { Link } from "react-router-dom";

export default function Featured() {

    const [listCate, setListCate] = useState([]);
    const [listCourse, setListCourse] = useState([]);
    const [listUser, setListUser] = useState([]);

    useEffect(() => {
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
    }, [listCate, listCourse, listUser]);

    return (
        <Row>
            <Container style={{ marginTop: "50px", width: "60%" }}>
                <Row>
                    <Col>
                        <h4 style={{ fontWeight: "bold" }}>Featured Categories</h4>
                        <p>Discovery popular courses</p>
                    </Col>
                </Row>
                <Row>
                    {
                        listCate?.map((category) => (
                            <Col sm={6} md={4} lg={3} style={{ marginBottom: "20px" }}>
                                <Link to={`/home/category/${category.id}`} className="no-underline">
                                    <Card className="category-box">
                                        <Card.Body className="d-flex flex-column align-items-center justify-content-center">
                                            <i className={category.icon} style={{ fontSize: "2rem" }}></i>
                                            <h6 className="mt-3">{category.cateName}</h6>
                                        </Card.Body>
                                    </Card>
                                </Link>
                            </Col>
                        ))
                    }
                </Row>

                {/* Featured Courses */}
                <Row style={{ marginTop: "50px" }}>
                    <Row>
                        <Col>
                            <h4 style={{ fontWeight: "bold" }}>Featured Courses</h4>
                            <p>Expore our finest courses</p>
                        </Col>
                        <Col className="d-flex justify-content-end align-items-center">
                            <Link to={`/home/allCourse`}>
                                <Button variant="outline-dark" style={{ borderRadius: "20px" }}>
                                    All Courses
                                </Button>
                            </Link>
                        </Col>
                    </Row>
                    <Row>
                        {
                            listCourse?.map((course) => (
                                <Col sm={12} md={6} lg={4}>
                                    <Link to={`/home/course/${course.id}`} className="no-underline">
                                        <Card className="course-card">
                                            <Card.Img
                                                variant="top"
                                                src={course.cImage}
                                                style={{ maxWidth: "286px", maxHeight: "180px" }}
                                            />
                                            <Card.Body>
                                                <Badge pill className="badge-category">
                                                    {
                                                        listCate?.find(l => l.id == course.cateId)?.cateName
                                                    }
                                                </Badge>
                                                <p>
                                                    <span className="text-by">by: </span>
                                                    <span style={{ fontWeight: "bold" }}>
                                                        {
                                                            listUser?.find(l => l.id == course.instructorId)?.uFullName
                                                        }
                                                    </span>
                                                </p>
                                                <h5 className="course-name">
                                                    {course.cName}
                                                </h5>
                                                <div className="course-info">
                                                    <span>
                                                        <i className="bi bi-mortarboard"></i> {course.cEnrolledStudent} enrolled
                                                    </span>
                                                </div>
                                                <div className="d-flex justify-content-between">
                                                    <div className="course-price">
                                                        <span>
                                                            {course.cPrice} $
                                                        </span>
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
                            ))
                        }
                    </Row>
                </Row>
            </Container>
        </Row>

    );
}