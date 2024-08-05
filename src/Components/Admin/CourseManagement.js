import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Badge, Button, Form, Navbar, Nav } from 'react-bootstrap';
import { useLocation, Link } from 'react-router-dom'; // Assuming you are using React Router for navigation

import './style.css';

export default function CourseManagementList() {
    const [categories, setCategories] = useState([]);
    const [courses, setCourses] = useState([]);
    const [instructors, setInstructors] = useState([]);
    const [filteredCourses, setFilteredCourses] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedInstructors, setSelectedInstructors] = useState([]);
    const [selectedPrice, setSelectedPrice] = useState('');
    const [selectedReview, setSelectedReview] = useState('');

    const location = useLocation();

    useEffect(() => {
        fetch("http://localhost:9999/category")
            .then(res => res.json())
            .then(result => setCategories(result))
            .catch(error => console.log(error));

        fetch("http://localhost:9999/course")
            .then(res => res.json())
            .then(result => {
                setCourses(result);
                setFilteredCourses(result);
            })
            .catch(error => console.log(error));

        fetch("http://localhost:9999/user")
            .then(res => res.json())
            .then(result => {
                const filteredInstructors = result.filter(user => user.rId === "2");
                setInstructors(filteredInstructors);
            })
            .catch(error => console.log(error));

        const params = new URLSearchParams(location.search);
        const cateIdParam = params.get('id');
        if (cateIdParam) {
            setSelectedCategories([cateIdParam]);
        }
    }, [location.search]);

    useEffect(() => {
        filterCourses();
    }, [searchTerm, selectedCategories, selectedInstructors, selectedPrice, selectedReview]);

    const getCategoryName = (id) => {
        const category = categories.find(cat => cat.id === id);
        return category ? category.cateName : "Unknown";
    };

    const getInstructorName = (id) => {
        const instructor = instructors.find(inst => inst.id === id);
        return instructor ? instructor.uFullName : 'Unknown';
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleCheckboxChange = (e, type) => {
        const value = e.target.id;
        if (type === 'category') {
            setSelectedCategories(
                e.target.checked
                    ? [...selectedCategories, value]
                    : selectedCategories.filter(item => item !== value)
            );
        } else if (type === 'instructor') {
            setSelectedInstructors(
                e.target.checked
                    ? [...selectedInstructors, value]
                    : selectedInstructors.filter(item => item !== value)
            );
        } else if (type === 'price') {
            setSelectedPrice(value);
        } else if (type === 'review') {
            setSelectedReview(value);
        }
    };

    const filterCourses = () => {
        let filtered = courses.filter(course => {
            const matchesSearchTerm = course.cName.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory = selectedCategories.length ? selectedCategories.includes(course.id.toString()) : true;
            const matchesReview = selectedReview ? course.cRate >= parseInt(selectedReview) : true;
            let matchesPrice = true;
            
            if (selectedPrice) {
                if (selectedPrice === 'free') {
                    matchesPrice = course.cPrice === 0;
                } else if (selectedPrice === 'paid') {
                    matchesPrice = course.cPrice > 0;
                }
            }
    
         
            const matchesInstructor = selectedInstructors.length === 0 || selectedInstructors.includes(course.instructorId.toString());
    
            return matchesSearchTerm && matchesCategory && matchesInstructor && matchesPrice && matchesReview;
        });
        setFilteredCourses(filtered);
    };

    return (
        <Container style={{ marginTop: "20px" }}>
            <Row>
                <Col xs={8}>
                    <Row>
                        <Col xs={6} md={12}>
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
                    {filteredCourses.map(course => (
                        <Row key={course.id} style={{ marginTop: "10px" }}>
                            <Col>
                                <Card className="d-flex flex-row">
                                    <div>
                                        <Card.Img variant="top" src={course.cImage} style={{ maxWidth: "286px", maxHeight: "180px" }} />
                                    </div>
                                    <Card.Body className="flex-grow-1">
                                        <Badge pill className="badge-category">{getCategoryName(course.id)}</Badge>
                                        <Card.Title className="mt-2 mb-3">{course.cName}</Card.Title>
                                        <Card.Text>
                                            <p><span className="text-by">by: </span><span style={{ fontWeight: "bold" }}>{getInstructorName(course.instructorId)}</span></p>
                                            <div className="course-info">
                                                <span><i className="bi bi-clock-fill"></i> {course.cDuration} weeks </span>
                                                <span><i className="bi bi-mortarboard"></i> {course.cEnrolledStudent} enrolled</span>
                                                <span><i className="bi bi-bar-chart-line"></i></span>
                                                <span><i className="bi bi-mortarboard"></i> 4 lessons</span>
                                            </div>
                                            <div className="d-flex justify-content-between mt-3">
                                                <div className="course-price">
                                                    <span>{course.cPrice}</span>
                                                </div>
                                                <div className="view-more">
                                                    <a href={`/homepageUser/${course.instructorId}/course/${course.id}`}  style={{ fontWeight: "bold" }} className="no-style">View more</a>
                                                </div>
                                            </div>
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    ))}
                </Col>
                <Col xs={4}>
                    <Form>
                        <Col>
                            <Form.Group>
                                <Form.Label><strong>Categories</strong></Form.Label>
                                {categories.map(category => (
                                    <Form.Check
                                        key={category.id}
                                        type="checkbox"
                                        label={category.cateName}
                                        id={category.id.toString()}
                                        checked={selectedCategories.includes(category.id.toString())}
                                        onChange={(e) => handleCheckboxChange(e, 'category')}
                                    />
                                ))}
                            </Form.Group>

                            <Form.Group>
                                <Form.Label><strong>Instructor</strong></Form.Label>
                                {instructors.map(instructor => (
                                    <Form.Check
                                        key={instructor.id}
                                        type="checkbox"
                                        label={instructor.uFullName}
                                        id={instructor.id.toString()}
                                        checked={selectedInstructors.includes(instructor.id.toString())}
                                        onChange={(e) => handleCheckboxChange(e, 'instructor')}
                                    />
                                ))}
                            </Form.Group>

                            <Form.Group>
                                <Form.Label><strong>Price</strong></Form.Label>
                                <Form.Check type="radio" label="All" id="all" name="price" onChange={(e) => handleCheckboxChange(e, 'price')} />
                                <Form.Check type="radio" label="Free" id="free" name="price" onChange={(e) => handleCheckboxChange(e, 'price')} />
                                <Form.Check type="radio" label="Paid" id="paid" name="price" onChange={(e) => handleCheckboxChange(e, 'price')} />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label><strong>Review</strong></Form.Label>
                                <Form.Check type="radio" label="1 star & above" id="1" name="review" onChange={(e) => handleCheckboxChange(e, 'review')} />
                                <Form.Check type="radio" label="2 stars & above" id="2" name="review" onChange={(e) => handleCheckboxChange(e, 'review')} />
                                <Form.Check type="radio" label="3 stars & above" id="3" name="review" onChange={(e) => handleCheckboxChange(e, 'review')} />
                                <Form.Check type="radio" label="4 stars & above" id="4" name="review" onChange={(e) => handleCheckboxChange(e, 'review')} />
                                <Form.Check type="radio" label="5 stars only" id="5" name="review" onChange={(e) => handleCheckboxChange(e, 'review')} />
                            </Form.Group>
                        </Col>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}
