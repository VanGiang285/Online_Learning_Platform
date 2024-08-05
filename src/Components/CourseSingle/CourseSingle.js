import { Container, Row, Breadcrumb, Button, Col, Card, Tab, Tabs, Form, FloatingLabel, Accordion, Image, ProgressBar, ListGroup, Pagination } from "react-bootstrap";
import 'bootstrap-icons/font/bootstrap-icons.css';
import "./CourseSingle.css";
import HeadlineCourseSingle from "./HeadlineCourseSingle";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import CourseTab from "./CourseTab";
import HeaderUser from "../HomepageUser/HeaderUser";
import Footer from "../HomepageUser/Footer";

export default function CourseSingle() {
    return (
        <Container fluid>
            <HeaderUser/>
            <Row>
                <HeadlineCourseSingle/>
            </Row>
            <Container className="course-detail-container">
                <Row >
                    <Col md={8} style={{ padding: "0px" }}>
                        <CourseTab/>
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
            <Footer/>
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