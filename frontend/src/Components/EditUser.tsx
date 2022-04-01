import React, { useState, useEffect} from 'react';
import axios from 'axios';
import { Button, Form, Row, Col} from 'react-bootstrap';
import {Link,  useParams } from "react-router-dom";


interface IUser{
    id: string,
    firstName: string,
    lastName: string,
    phoneNumber: string,
    age: string,
    address: string
}

function EditUser(){
    let user = useParams();
    // const userVal = [];

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [age, setAge] = useState("");
    const [address, setAddress] = useState("");
    
    const [userList, setUserList] = useState<Array<IUser>>([{
        id: "",
        firstName: "",
        lastName: "",
        phoneNumber: "",
        age: "",
        address: ""
    }]);

    const userURL = `http://localhost:8000/api/user/${user.id}`

    //Read one user
    useEffect(() => {
        axios.get(userURL)
        .then(res =>{
            setUserList(res.data)
        })
    },[]);
    
    // const map = new Map(Object.entries(userList));

    // const updateUserHandler = async () => {
    //     await fetch(`http://localhost:8000/api/user/${user.id}`, {
    //         method: "PUT",
    //         headers: { "Content-Type": "application/json" },
    //         body: JSON.stringify({ 
    //             firstName: firstName,
    //             lastName: lastName,
    //             phoneNumber: phoneNumber,
    //             age: age,
    //             address: address})
    //     })
    // }

    const updateUserHandler = async() => {
        await axios.put(`http://localhost:8000/api/user/${user.id}`, {
            'firstName': firstName,
            'lastName': lastName,
            'phoneNumber': phoneNumber,
            'age': age,
            'address': address
        }).then(res =>  console.log(res))
        .catch(error => {
            if (error.response) {
              console.log(error.response);
              console.log(phoneNumber);
            }
          });
    }

    return (
        <main className='d-flex w-100'>
            <div className='container d-flex flex-column'>
                <div className='row vh-100'>
                    <div className='col-sm-10 col-md-8 col-lg-6 mx-auto d-table h-100'>
                        <div className='d-table-cell align-middle'>
                        
                         <Link to="/"> Return to Home</Link>
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
                            
                                <Button variant="primary" onClick={updateUserHandler}>
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