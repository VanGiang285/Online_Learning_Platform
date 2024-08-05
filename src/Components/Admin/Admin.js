import React from 'react';
import { Tab, Nav, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './admin.css';
import CourseManagementList from './CourseManagement';
import InstructorAccountList from './InstructorAccount';
import StudentAccountList from './StudentAccount';
import { useParams, Link } from 'react-router-dom'; 
import Revenue from './Revenue';

export default function Admin() {
  return (
    <Tab.Container id="left-tabs-example" defaultActiveKey="first">
      <Row noGutters>
        <Col sm={3} className="sidebar">
          <Nav variant="pills" className="flex-column">
            <Nav.Item>
              <Nav.Link eventKey="first">Course List</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="second">Instructor List</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="third">Student List</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="fourth">Revenue</Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
        <Col sm={9}>
          <Tab.Content>
            <Tab.Pane eventKey="first">
              <CourseManagementList />
            </Tab.Pane>
            <Tab.Pane eventKey="second">
              <InstructorAccountList />
            </Tab.Pane>
            <Tab.Pane eventKey="third">
              <StudentAccountList />
            </Tab.Pane>
            <Tab.Pane eventKey="fourth">
              <Revenue />
            </Tab.Pane>
          </Tab.Content>
        </Col>
      </Row>
    </Tab.Container>
  );
}

export {SidebarNavigation}
function SidebarNavigation() {
  return (
    <Col sm={3} className="sidebar">
      <Nav variant="pills" className="flex-column">
        <Nav.Item>
          <Nav.Link as={Link} to="/courses">Course List</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to="/instructors">Instructor List</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to="/students">Student List</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to="/revenue">Revenue</Nav.Link>
        </Nav.Item>
      </Nav>
    </Col>
  );
};