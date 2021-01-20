import React from "react";
import { Container, Row, Col } from "react-bootstrap";

export default function Footer() {
  return (
    <div>
      <Container fluid>
        <Row className="justify-content-center footer-common">
          <Col>
            <p className="display-5 mt-3">
              &copy; Copyright 2020. All Rights Reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
