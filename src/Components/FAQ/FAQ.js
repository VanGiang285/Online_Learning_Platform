import { Accordion, Breadcrumb, Button, Card, Carousel, Col, Container, Form, Image, Nav, Navbar, Row, Table } from "react-bootstrap";


export default function FAQ() {
  return (
    <Container fluid >
    <h1>FAQs</h1>
    <Row>
      <Col>
      <Accordion defaultActiveKey="0">
  <Accordion.Item eventKey="0" style={{}}>
  <Accordion.Header style={{ backgroundColor: 'grey' }}>Accordion Item #1</Accordion.Header>
    <Accordion.Body>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </Accordion.Body>
  </Accordion.Item>
  <div style={{ margin: '40px 0' }}></div> {/* This creates spacing */}
  <Accordion.Item eventKey="1" style={{}}>
    <Accordion.Header>Accordion Item #2</Accordion.Header>
    <Accordion.Body>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </Accordion.Body>
  </Accordion.Item>
  <div style={{ margin: '40px 0' }}></div> {/* This creates spacing */}
  <Accordion.Item eventKey="2" style={{}}>
    <Accordion.Header>Accordion Item #3</Accordion.Header>
    <Accordion.Body>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </Accordion.Body>
  </Accordion.Item>
  <div style={{ margin: '40px 0' }}></div> {/* This creates spacing */}
  <Accordion.Item eventKey="3" style={{}}>
    <Accordion.Header>Accordion Item #4</Accordion.Header>
    <Accordion.Body>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </Accordion.Body>
  </Accordion.Item>
  <div style={{ margin: '40px 0' }}></div> {/* This creates spacing */}
</Accordion>
      </Col>

      <Col>
      
      <Accordion defaultActiveKey="0">
  <Accordion.Item eventKey="0" style={{}}>
    <Accordion.Header>Accordion Item #1</Accordion.Header>
    <Accordion.Body>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </Accordion.Body>
  </Accordion.Item>
  <div style={{ margin: '40px 0' }}></div> {/* This creates spacing */}
  <Accordion.Item eventKey="1" style={{}}>
    <Accordion.Header>Accordion Item #2</Accordion.Header>
    <Accordion.Body>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </Accordion.Body>
  </Accordion.Item>
  <div style={{ margin: '40px 0' }}></div> {/* This creates spacing */}
  <Accordion.Item eventKey="2" style={{}}>
    <Accordion.Header>Accordion Item #3</Accordion.Header>
    <Accordion.Body>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </Accordion.Body>
  </Accordion.Item>
  <div style={{ margin: '40px 0' }}></div> {/* This creates spacing */}
  <Accordion.Item eventKey="3" style={{}}>
    <Accordion.Header>Accordion Item #4</Accordion.Header>
    <Accordion.Body>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </Accordion.Body>
  </Accordion.Item>
  <div style={{ margin: '40px 0' }}></div> {/* This creates spacing */}
</Accordion>
  </Col>
    </Row>

<Image src="image/FAQ/Vector.png"></Image>


    </Container>
    
  );
}