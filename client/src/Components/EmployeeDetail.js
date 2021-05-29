import React from "react";
import { Col, FormGroup, Input, Label, Row } from "reactstrap";

const EmployeeDetail = ({
  name,
  email,
  dob,
  age,
  reporting_manager,
  salary,
  department,
}) => {
  return (
    <React.Fragment>
      <Row className="emp_detail_row">
        <Col sm={6}>
          <FormGroup>
            <Label>Name</Label>
            <Input type="text" value={name} disabled />
          </FormGroup>
        </Col>
        <Col sm={6}>
          <FormGroup>
            <Label>Email</Label>
            <Input type="text" value={email} disabled />
          </FormGroup>
        </Col>
      </Row>
      <Row className="emp_detail_row">
        <Col sm={6}>
          <FormGroup>
            <Label>Age</Label>
            <Input type="text" value={age} disabled />
          </FormGroup>
        </Col>
        <Col sm={6}>
          <FormGroup>
            <Label>Date of Birth</Label>
            <Input type="text" value={dob} disabled />
          </FormGroup>
        </Col>
      </Row>
      <Row className="emp_detail_row">
        <Col sm={6}>
          <FormGroup>
            <Label>Reporting Manager</Label>
            <Input type="text" value={reporting_manager} disabled />
          </FormGroup>
        </Col>
        <Col sm={6}>
          <FormGroup>
            <Label>Salary</Label>
            <Input type="text" value={salary} disabled />
          </FormGroup>
        </Col>
      </Row>
      <Row className="emp_detail_row">
        <Col sm={6}>
          <FormGroup>
            <Label>Department</Label>
            <Input type="text" value={department} disabled />
          </FormGroup>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default EmployeeDetail;
