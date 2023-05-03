import React from "react";
import { Button, Form, InputGroup, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faEnvelope,
    faUnlockAlt,
    faUser,
    faLocation,
    faSpinner,
    faPhone
} from "@fortawesome/free-solid-svg-icons";
import { useContext, useEffect, useState } from "react";
import authContext from "../../hooks/AuthContext/authContext";

const initData = {
    name: "",
    email: "",
    password: "",
    mobile: "",
};

function Register() {
    const { register } = useContext(authContext);
    const [formData, setFormData] = useState(initData);
    const [loading, setLoading] = useState(false);
    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };
    const canSubmit =
        formData.email.length > 0 &&
        formData.password.length > 0 &&
        formData.name.length > 0 &&
        formData.mobile.length > 0 &&
        !loading;

    const handleSubmit = async (e) => {
        try {
            setLoading(true);
            e.preventDefault();
            await register(formData);
            e.target.reset();
            setFormData(initData);
        } finally {
            setLoading(false);
        }
    };
    return (
        <div>
            <Form className="mt-4" onSubmit={handleSubmit}>
                <Form.Group id="name" className="mb-4">
                    <Form.Label>Your Name</Form.Label>
                    <InputGroup>
                        <InputGroup.Text className="px-2">
                            <FontAwesomeIcon icon={faUser} style={{ width: "15px" }} />
                        </InputGroup.Text>
                        <Form.Control
                            autoFocus
                            required
                            name="name"
                            type="text"
                            placeholder="John Doe"
                            onChange={handleChange}
                        />
                    </InputGroup>
                </Form.Group>
                <Form.Group id="email" className="mb-4">
                    <Form.Label>Your Email</Form.Label>
                    <InputGroup>
                        <InputGroup.Text className="px-2">
                            <FontAwesomeIcon icon={faEnvelope} style={{ width: "15px" }} />
                        </InputGroup.Text>
                        <Form.Control
                            autoFocus
                            required
                            name="email"
                            type="email"
                            placeholder="example@company.com"
                            onChange={handleChange}
                        />
                    </InputGroup>
                </Form.Group>

                <Form.Group id="password" className="mb-4">
                    <Form.Label>Your Password</Form.Label>

                    <InputGroup>
                        <InputGroup.Text className="px-2">
                            <FontAwesomeIcon icon={faUnlockAlt} style={{ width: "15px" }} />
                        </InputGroup.Text>
                        <Form.Control
                            required
                            name="password"
                            type="password"
                            placeholder="Password"
                            onChange={handleChange}
                        />
                    </InputGroup>
                </Form.Group>

                <Form.Group id="mobile" className="mb-4">
                    <Form.Label>Mobile</Form.Label>
                    <InputGroup>
                        <InputGroup.Text className="px-2">
                            <FontAwesomeIcon icon={faPhone} style={{ width: "15px" }} />
                        </InputGroup.Text>
                        <Form.Control
                            autoFocus
                            required
                            name="mobile"
                            type="text"
                            placeholder="Mobile Number"
                            onChange={handleChange}
                        />
                    </InputGroup>
                </Form.Group>
                <Row>
                    <Col>
                        <Button
                            variant="primary"
                            type="submit"
                            className="w-100"
                            disabled={!canSubmit}
                        >
                            Register
                        </Button>
                    </Col>
                    {loading && (
                        <Col xs={1}>
                            <FontAwesomeIcon icon={faSpinner} className="fa-spin" />
                        </Col>
                    )}
                </Row>
            </Form>
        </div>
    );
}

export default Register;