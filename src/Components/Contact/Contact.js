
import {  Button, Col, Container, Form, Image, Row } from "react-bootstrap";


export default function Contact() {
  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md={6}>
          <h2>Need A Direct Line?</h2>
          <p>Cras massa et odio donec faucibus in vitae pretium massa dolor ullamcorper lectus aliquam.</p>
          <p><Image src="image/Contact/iconP.png"></Image><strong>Phone:</strong> (123) 456 7890</p>
          <p><Image src="image/Contact/iconM.png"></Image><strong>Email:</strong> contact@thimpress.com</p>
        </Col>
      
        <Col md={6}>
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14898.025368237528!2d105.51662731763389!3d21.012416675952743!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135abc60e7d3f19%3A0x2be9d7d0b5abcbf4!2sFPT%20University!5e0!3m2!1sen!2s!4v1718077345610!5m2!1sen!2s" width="800" height="450"  allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        </Col>
      </Row>
      <Row className="justify-content-md-center">
        <Col md={8}>
          <h3>Contact Us</h3>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>
            <Form.Group controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Name" />
            </Form.Group>
            <Form.Group controlId="formBasicComment">
              <Form.Label>Comment</Form.Label>
              <Form.Control as="textarea" rows={3} />
            </Form.Group>
            <Form.Group controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Save my name, email, and website in this browser for the next time I comment" />
            </Form.Group>
            <Button variant="primary" type="submit" style={{backgroundColor:"#FF782D", borderRadius: '20px' }} >
              Post Comment
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
    
  );
}