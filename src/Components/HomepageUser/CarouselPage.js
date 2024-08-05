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
import React, { useState } from "react";

export default function CarouselPage() {
  return (
    <Row>
      <Col style={{ padding: "0px 0px" }}>
        <Carousel>
          <Carousel.Item className="custom-carousel-item">
            <Image src="/image/Homepage/banner.jpg" className="customSizeImage" />
            <Carousel.Caption>
              <h3>Name Course 1</h3>
              <p>Describe Course</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item className="custom-carousel-item">
            <Image src="/image/Homepage/banner.jpg" className="customSizeImage" />
            <Carousel.Caption>
              <h3>Name Course 2</h3>
              <p>Describe Course</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item className="custom-carousel-item">
            <Image src="/image/Homepage/banner.jpg" className="customSizeImage" />
            <Carousel.Caption>
              <h3>Name Course 3</h3>
              <p>Describe Course</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item className="custom-carousel-item">
            <Image src="/image/Homepage/banner.jpg" className="customSizeImage" />
            <Carousel.Caption>
              <h3>Name Course 4</h3>
              <p>Describe Course</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </Col>
    </Row>
  );
}