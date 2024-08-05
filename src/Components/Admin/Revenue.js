import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Table } from 'react-bootstrap';
import { Bar } from 'react-chartjs-2';
import { Chart, ArcElement, CategoryScale, LinearScale, BarElement } from 'chart.js';
Chart.register(ArcElement, CategoryScale, LinearScale, BarElement);

function Revenue() {
  const [courses, setCourses] = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  const [paymentHistory, setPaymentHistory] = useState([]);

  useEffect(() => {
    fetch('http://localhost:9999/course')
      .then(res => res.json())
      .then(data => setCourses(data))
      .catch(error => console.error('Error fetching courses:', error));

    fetch('http://localhost:9999/enroll')
      .then(res => res.json())
      .then(data => setEnrollments(data))
      .catch(error => console.error('Error fetching enrollments:', error));

    fetch('http://localhost:9999/paymentHistory')
      .then(res => res.json())
      .then(data => setPaymentHistory(data))
      .catch(error => console.error('Error fetching payment history:', error));
  }, []);

  const calculateMonthlyRevenue = () => {
    const monthlyRevenue = paymentHistory.reduce((acc, transaction) => {
      const transactionMonth = new Date(transaction.date).getMonth();
      const course = courses.find(c => c.id === transaction.courseId);
      const amount = course ? course.cPrice : 0;
      acc[transactionMonth] += amount;
      return acc;
    }, Array(12).fill(0));

    return monthlyRevenue;
  };

  const determineTopCourses = () => {
    const courseEnrollments = enrollments.reduce((acc, enrollment) => {
      const courseId = enrollment.courseId;
      if (!acc[courseId]) {
        acc[courseId] = { enrolled: 0, passed: 0 };
      }
      acc[courseId].enrolled++;
      if (enrollment.status && enrollment.score >= 4) {
        acc[courseId].passed++;
      }
      return acc;
    }, {});

    const sortedCourses = Object.keys(courseEnrollments).sort((a, b) => courseEnrollments[b].enrolled - courseEnrollments[a].enrolled);

    return sortedCourses.slice(0, 5);
  };

  const determineEnrollments = (courseId) => {
    const courseEnrollment = enrollments.filter(en => en.courseId === courseId);
    const passed = courseEnrollment.filter(en => en.status && en.score >= 4).length;
    const failed = courseEnrollment.length - passed;
    return { passed, failed };
  };

  const calculateRevenueThisMonth = () => {
    const currentMonth = new Date().getMonth();
    const monthlyRevenue = calculateMonthlyRevenue();
    return monthlyRevenue[currentMonth];
  };

  const calculateRevenueAfterInstructorPay = () => {
    const currentMonthRevenue = calculateRevenueThisMonth();
    const revenueAfterPay = currentMonthRevenue * 0.95; // Assuming 5% goes to instructors
    return revenueAfterPay;
  };

  const monthlyRevenueData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Monthly Revenue',
        data: calculateMonthlyRevenue(),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <Container>
      <h1 className="my-4">Admin Revenue Dashboard</h1>
      <Row className="mb-4">
        <Col md={4}>
          <Card className="text-center">
            <Card.Body>
              <Card.Title>Total Revenue</Card.Title>
              <Card.Text>
                <strong>${calculateMonthlyRevenue().reduce((acc, val) => acc + val, 0)}</strong>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="text-center">
            <Card.Body>
              <Card.Title>Revenue This Month</Card.Title>
              <Card.Text>
                <strong>${calculateRevenueThisMonth()}</strong>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="text-center">
            <Card.Body>
              <Card.Title>Revenue After Instructor Pay This Month</Card.Title>
              <Card.Text>
                <strong>${calculateRevenueAfterInstructorPay()}</strong>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={8}>
          <Card>
            <Card.Body>
              <Card.Title>Monthly Revenue</Card.Title>
              <Bar data={monthlyRevenueData} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="mb-4">
        <Col md={12}>
          <Card>
            <Card.Body>
              <Card.Title>Top Enrolled Courses</Card.Title>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Course ID</th>
                    <th>Course Name</th>
                    <th>Enrollments</th>
                    <th>Passed</th>
                    <th>Failed</th>
                  </tr>
                </thead>
                <tbody>
                  {determineTopCourses().map(courseId => {
                    const course = courses.find(c => c.id === courseId);
                    const { passed, failed } = determineEnrollments(courseId);
                    return (
                      <tr key={courseId}>
                        <td>{courseId}</td>
                        <td>{course ? course.cName : '-'}</td>
                        <td>{enrollments.filter(en => en.courseId === courseId).length}</td>
                        <td>{passed}</td>
                        <td>{failed}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Revenue;
