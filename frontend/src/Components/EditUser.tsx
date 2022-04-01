import React, { useState} from 'react';
import axios from 'axios';
import { Button, Form, Row, Col} from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons'

function EditUser(){
    const navigate = useNavigate();
    let user = useParams();
    const [firstName, setFirstName] = useState(user.fName);
    const [lastName, setLastName] = useState(user.lName);
    const [phoneNumber, setPhoneNumber] = useState(user.phone);
    const [age, setAge] = useState(user.age);
    const [address, setAddress] = useState(user.address);

    //Update user event handler
    const updateUserHandler = async() => {
        await axios.put(`http://localhost:8000/api/user/${user.id}`, {
            'id': user.id,
            'firstName': firstName,
            'lastName': lastName,
            'phoneNumber': phoneNumber,
            'age': age,
            'address': address
        }).then(res =>  navigate('/'))
    }

    return (
        <main className='d-flex w-100'>
            <div className='container d-flex flex-column'>
                <div className='row vh-100'>
                    <div className='col-sm-10 col-md-8 col-lg-6 mx-auto d-table h-100'>
                        <div className='d-table-cell align-middle'>
                        <Button className="mb-3 btn-lg btn-success" onClick={() => navigate("/")}><FontAwesomeIcon icon={faAngleLeft} className="w-100"/></Button>
                            <h1 className="text-center mb-5">Edit User </h1>
                            <Form className="mt-2 mx-auto">
                                <Row className = "mb-3">
                                <Form.Group as = {Col} controlId="formGridFirsName">
                                    <Form.Label>First Name</Form.Label>
                                    <Form.Control 
                                        placeholder = "Enter your First Name" 
                                        type = "text"
                                        value = {firstName}
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
                                        value = {lastName}
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
                                            value = {phoneNumber}
                                            type = "text"
                                            onChange = {(event) => {
                                                setPhoneNumber(event.target.value);
                                            }}
                                            required/>
                                    </Form.Group>      
                                    <Form.Group as={Col} controlId="formGridPassword">
                                    <Form.Label>Age</Form.Label>
                                    <Form.Control 
                                        type="text" 
                                        value = {age}
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
                                        value = {address}
                                        onChange = {(event) => {
                                            setAddress(event.target.value);
                                        }}
                                        required/>
                                </Form.Group>
                            
                                <Button variant="primary" className="btn-lg d-flex align-middle mx-auto" onClick={updateUserHandler}>
                                Update
                                </Button>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </main>
  );
}

export default EditUser;