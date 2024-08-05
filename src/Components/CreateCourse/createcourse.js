import { Row, Col, Container, Form, Button, Card, Dropdown, Tabs, Tab, Accordion, ButtonGroup } from "react-bootstrap";
import './style.css';


export default function CreateCourse() {
    return (
        <Container style={{ width: "70%", marginTop: "10px" }}>
            <Row>
                <Col lg={12} md={12} className="d-none d-lg-block">
                    <img src="/image/CourseList/banner-placeholder.jpg" alt="Banner" style={{ width: '100%' }} />
                </Col>
            </Row>

            <Row style={{ marginTop: "10px" }}>
                <Col xs={8} md={12} lg={8}>
                    <Tabs
                        defaultActiveKey="curriculum"
                        id="uncontrolled-tab-example"
                        className="">
                        <Tab eventKey="overview" title="Overview">
                            <Form.Group controlId="exampleForm.ControlTextarea1">
                                <Form.Control as="textarea" rows={10} style={{ border: '2px gray', backgroundColor: "#F2F2F2" }} />
                            </Form.Group>
                            <Row className="justify-content-end">
                                <Col xs="auto">
                                    <Button variant="primary" style={{ marginTop: "10px" }}>
                                        Save Overview
                                    </Button>
                                </Col>
                            </Row>
                        </Tab>
                        <Tab eventKey="curriculum" title="Curriculum">
                            <Container style={{ marginTop: "6px", backgroundColor: '#F2F2F2', padding: '20px' }}>
                                <Form.Group controlId="exampleForm.ControlInput1">
                                    <Form.Control type="text" placeholder="Enter title" />
                                </Form.Group>
                                <Accordion>
                                    <Accordion.Item eventKey="0">
                                        <Accordion.Header>
                                            <Form.Control
                                                type="text"
                                                placeholder="Filled Lesson Name"
                                                value="Filled Lesson Name"
                                                readOnly
                                                style={{ border: "none", boxShadow: "none" }}
                                            />
                                        </Accordion.Header>
                                        <Accordion.Body style={{ padding: 0 }}>
                                            <div style={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                                padding: '5px',
                                                borderRadius: '5px',
                                                border: '1px solid #ced4da',
                                                margin: '10px',
                                                backgroundColor: '#fff'
                                            }}>
                                                Lesson with video
                                                <div>
                                                    <Button variant="outline-primary" size="sm" style={{ marginRight: '5px', margin: "2px 10px" }}>Detail</Button>
                                                    <i class="bi bi-pen" style={{ marginRight: '5px', cursor: 'pointer', margin: "2px 10px" }} />
                                                    <i class="bi bi-trash" style={{ cursor: 'pointer', margin: "2px 10px" }} />
                                                </div>
                                            </div>
                                        </Accordion.Body>
                                        <Accordion.Body style={{ padding: 0 }}>
                                            <div style={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                                padding: '5px',
                                                borderRadius: '5px',
                                                border: '1px solid #ced4da',
                                                margin: '10px',
                                                backgroundColor: '#fff'
                                            }}>
                                                Lesson with video
                                                <div>
                                                    <Button variant="outline-primary" size="sm" style={{ marginRight: '5px', margin: "2px 10px" }}>Detail</Button>
                                                    <i class="bi bi-pen" style={{ marginRight: '5px', cursor: 'pointer', margin: "2px 10px" }} />
                                                    <i class="bi bi-trash" style={{ cursor: 'pointer', margin: "2px 10px" }} />
                                                </div>
                                            </div>
                                        </Accordion.Body>
                                        <Accordion.Body style={{ padding: 0 }}>
                                            <div style={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                                padding: '5px',
                                                borderRadius: '5px',
                                                border: '1px solid #ced4da',
                                                margin: '10px',
                                                backgroundColor: '#fff'
                                            }}>
                                                Lesson with video
                                                <div>
                                                    <Button variant="outline-primary" size="sm" style={{ marginRight: '5px', margin: "2px 10px" }}>Detail</Button>
                                                    <i class="bi bi-pen" style={{ marginRight: '5px', cursor: 'pointer', margin: "2px 10px" }} />
                                                    <i class="bi bi-trash" style={{ cursor: 'pointer', margin: "2px 10px" }} />
                                                </div>
                                            </div>
                                        </Accordion.Body>
                                        <Accordion.Body style={{ padding: 0 }}>
                                            <div style={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                                padding: '5px',
                                                borderRadius: '5px',
                                                border: '1px solid #ced4da',
                                                margin: '10px',
                                                backgroundColor: '#fff'
                                            }}>
                                                Add a lession
                                                <i class="bi bi-plus"></i>
                                            </div>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="1">
                                        <Accordion.Header>
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter Lesson Name"
                                                style={{ border: "none", boxShadow: "none" }}
                                            />
                                        </Accordion.Header>
                                        <Accordion.Body style={{ padding: 0 }}>
                                            <div style={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                                padding: '5px',
                                                borderRadius: '5px',
                                                border: '1px solid #ced4da',
                                                margin: '10px',
                                                backgroundColor: '#fff'
                                            }}>
                                                Add a lession
                                                <i class="bi bi-plus"></i>
                                            </div>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                            </Container>
                        </Tab>
                        <Tab eventKey="instructor" title="Instructor">
                            <Container style={{ marginTop: "6px", backgroundColor: '#F2F2F2', padding: '20px' }}>
                                <Row>
                                    <Col md={4} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                        <i className="bi bi-card-image" style={{ fontSize: '10rem' }}></i>
                                    </Col>
                                    <Col md={8}>
                                        <Form.Group controlId="instructorTitle">
                                            <Form.Label style={{ fontWeight: 'bold' }}>Title</Form.Label>
                                            <Form.Control type="text" placeholder="Enter title" />
                                        </Form.Group>
                                        <Form.Group controlId="instructorDescription">
                                            <Form.Label>Description</Form.Label>
                                            <Form.Control as="textarea" rows={10} placeholder="Enter description" />
                                        </Form.Group>
                                        <Form.Group controlId="socialMediaLink">
                                            <Form.Label style={{ fontWeight: 'bold' }}>Add Social Media Link</Form.Label>
                                            <Form.Control type="text" placeholder="Enter link" />
                                            <ButtonGroup style={{ marginTop: '10px' }}>
                                                <Button variant="outline-dark"><i class="bi bi-facebook"></i></Button>
                                                <Button variant="outline-dark"><i class="bi bi-pinterest"></i></Button>
                                                <Button variant="outline-dark"><i class="bi bi-twitter-x"></i></Button>
                                                <Button variant="outline-dark"><i class="bi bi-instagram"></i></Button>
                                                <Button variant="outline-dark"><i class="bi bi-youtube"></i></Button>
                                            </ButtonGroup>
                                            <Button variant="primary" style={{ float: 'right', marginTop: '10px' }}>Save</Button>
                                        </Form.Group>
                                    </Col>
                                </Row>
                            </Container>
                        </Tab>
                        <Tab eventKey="faq" title="FAQ">
                            <Accordion defaultActiveKey="0">
                                <Accordion.Item eventKey="0">
                                    <Accordion.Header>
                                        <Form.Control type="text" placeholder="Enter question" />
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        <Form.Control type="text" placeholder="Enter Title" style={{ marginBottom: "10px" }} />
                                        <Form.Control as="textarea" rows={3} placeholder="Enter answer" />
                                        <Button variant="primary" style={{ float: 'right', marginTop: '10px' }}>Save</Button>
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="1">
                                    <Accordion.Header>Add more +</Accordion.Header>
                                </Accordion.Item>
                            </Accordion>
                        </Tab>

                    </Tabs>
                </Col>
                <Col xs={4} md={12} lg={4}>
                    <Row>
                        <Col xs={12}>
                            <Form.Group controlId="coursePrice">
                                <Form.Label>Set course price</Form.Label>
                                <Form.Control type="text" placeholder="Enter course price" />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12}>
                            <Form.Group controlId="courseDuration">
                                <Form.Label>Course duration</Form.Label>
                                <Form.Control type="text" placeholder="Enter course duration" />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12}>
                            <Form.Group controlId="courseCategory">
                                <Form.Label>Course category</Form.Label>
                                <Dropdown>
                                    <Dropdown.Toggle variant="outline-dark" id="courseCategoryDropdown">
                                        Select category
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item>Action</Dropdown.Item>
                                        {/* Add more Dropdown.Item components for other categories */}
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12}>
                            <Button variant="primary" style={{ float: 'right' }}>Save</Button>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
}