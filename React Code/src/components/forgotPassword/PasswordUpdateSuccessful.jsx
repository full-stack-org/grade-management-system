import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

export default function PasswordUpdateSuccessful() {
  return (
    <div>
      <Container>
        <Row className="justify-content-md-center mt-4 mb-4">
          <Col lg={5}>
            <Card className="alert alert-success">
              <Card.Body>
                <p>
                  Your Password Updated Successfully. <a href="/">Click Here</a>{" "}
                  to Login.
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
