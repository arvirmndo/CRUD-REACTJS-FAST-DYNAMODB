import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Form, Row, Col, Container} from 'react-bootstrap';
import { nanoid } from 'nanoid' ;
import { useNavigate, Link } from "react-router-dom";


export default function AddUser(){
    const navigate = useNavigate();
    const[id, setID] = useState(nanoid());
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [age, setAge] = useState("");
    const [address, setAddress] = useState("");

    const addUserHandler = () => {
        axios.post('http://localhost:8000/api/user', {
            'id': id,
            'firstName': firstName,
            'lastName': lastName,
            'phoneNumber': phoneNumber,
            'age': age,
            'address': address
        }).then(res => navigate('/'))
    };

    return (
        <main className='d-flex w-100'>
            <div className='container d-flex flex-column'>
                <div className='row vh-100'>
                    <div className='col-sm-10 col-md-8 col-lg-6 mx-auto d-table h-100'>
                        <div className='d-table-cell align-middle'>
                            <Link to="/"> Return to Home</Link>
                            <h1 className="text-center mb-5">Add User</h1>
                            <Form className="mt-2 mx-auto">
                                <Row className = "mb-3">
                                <Form.Group as = {Col} controlId="formGridFirsName">
                                    <Form.Label>First Name</Form.Label>
                                    <Form.Control 
                                        placeholder = "Enter your First Name" 
                                        type = "text"
                                        onChange = {(event) => {
                                            setFirstName(event.target.value);
                                        }}
                                        required/>
                                </Form.Group>
                            
                                <Form.Group as={Col} controlId="formGridLastName">
                                    <Form.Label>LastName</Form.Label>
                                    <Form.Control 
                                        placeholder = "Enter your Last Name"
                                        type = "text"
                                        onChange = {(event) => {
                                            setLastName(event.target.value);
                                        }}
                                        required />
                                </Form.Group>
                                </Row>

                                <Row className="mb-3">
                                    <Form.Group as={Col}  controlId="formGridPhone">
                                        <Form.Label>Phone Number</Form.Label>
                                        <Form.Control 
                                            placeholder="+639"
                                            type = "text"
                                            onChange = {(event) => {
                                                setPhoneNumber(event.target.value);
                                            }}
                                            required/>
                                    </Form.Group>      
                                    <Form.Group as={Col} controlId="formGridPassword">
                                    <Form.Label>Age</Form.Label>
                                    <Form.Control 
                                        type="number" 
                                        onChange = {(event) => {
                                            setAge(event.target.value);
                                        }}
                                        required/>
                                </Form.Group>
                                </Row>
                                <Form.Group className="mb-3" controlId="formGridAddress">
                                    <Form.Label>Address</Form.Label>
                                    <Form.Control 
                                        placeholder="Apartment, studio, or floor" 
                                        type = "text"
                                        onChange = {(event) => {
                                            setAddress(event.target.value);
                                        }}
                                        required/>
                                </Form.Group>
                                <Button variant="primary" onClick={addUserHandler}>
                                Submit
                                </Button>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </main>
            
  );
}
