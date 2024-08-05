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
  FormControl,
  Table,
} from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Footer from "../HomepageUser/Footer";
import HeaderUser from "../HomepageUser/HeaderUser";

export default function Purchase_screen(){
  const { uId } = useParams();
  const [listCart, setListCart] = useState([]);
  const [listCourse, setListCourse] = useState([]);
  const [selectedUser, setSelectedUser] = useState();

  useEffect(() => {
    fetch(`http://localhost:9999/user/${uId}`)
      .then((res) => res.json())
      .then((result) => 
        setSelectedUser(result))
      .catch((err) => console.error("error: ", err));

    // Fetch cart data
    fetch("http://localhost:9999/addToCart")
      .then((res) => res.json())
      .then((result) => setListCart(result))
      .catch((err) => console.error("error: ", err));
  
    // Fetch course data
    fetch("http://localhost:9999/course")
      .then((res) => res.json())
      .then((listCourse) => setListCourse(listCourse))
      .catch((err) => console.error("error: ", err));
  }, [uId, listCart, listCourse]); // Ensure useEffect runs when uId changes

  return(
    <Container fluid>
      <HeaderUser/>
      <Row>
        <Col md={8}>
          <Row>
            <h1>List of Courses</h1>
          </Row>
          <Row>
            <Table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Course</th>
                  <th>Description</th>
                  <th>Price</th>
                  <th>Selected</th>
                </tr>
              </thead>
              <tbody>
                {
                  listCart?.map(c => (
                    <tr key={c.id}>
                      <td>{c.id}</td>
                      <td>
                        {
                          listCourse?.find(lc => lc.id == c.courseId)?.cName
                        }
                      </td>
                      <td>
                        {
                          listCourse?.find(lc => lc.id == c.courseId)?.cDescription
                        }
                      </td>
                      <td>
                        {
                          listCourse?.find(lc => lc.id == c.courseId)?.cPrice 
                        }$
                      </td>
                      <td>
                        <Form.Check
                          type="checkbox"
                          id={c.id}
                          style={{display:'flex', justifyContent:'center'}}
                        />
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </Table>
          </Row>
        </Col>
        <Col>
          <Row>
            <Col style={{display:'flex', justifyContent:'center'}}><h1>Bill</h1></Col>
          </Row>
          <Row>
            <Col>
                <Row>
                  Your Name: {selectedUser?.uFullName}
                </Row>
                <Row>
                  Your Email: {selectedUser?.uMail}
                </Row>
            </Col>
          </Row>
        </Col>
      </Row>
      <Footer/>
    </Container>
  )
}