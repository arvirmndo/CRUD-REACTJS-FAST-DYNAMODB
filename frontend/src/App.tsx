import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'
import { useNavigate, Link } from "react-router-dom";
import { Button, Table} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPlus, faPen } from '@fortawesome/free-solid-svg-icons'


type IUser = {
  id: string,
  firstName: string,
  lastName: string,
  phoneNumber: string,
  age: number,
  address: string
}

function App() {    
  const navigate = useNavigate();
  const [userList, setUserList] = useState<Array<IUser>>([{
    id: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    age: 0,
    address: ""
  }]);

  //Read all users
  useEffect(() => {
    axios.get('http://localhost:8000/api/user')
      .then(res =>{
        setUserList(res.data)
      })
  },[]);
  
  //delete user event handler
  const deleteUserHandler = async(id: string) => {
    await axios.delete(`http://localhost:8000/api/user/${id}`)
    .then(res => window.location.reload())
  }

  return (  
    <div className="container">
        <h1 className="text-center my-5">React-TypeScript User CRUD Demo</h1>
        <Button className="mb-3 btn-success" onClick={() => navigate("/addUser")}><FontAwesomeIcon icon={faPlus}/><span className='px-1'>Add User</span></Button>
        <Table responsive striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Phone Number</th>
              <th>Age</th>
              <th>Address</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {userList?.map((user) => {
              return (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.phoneNumber}</td>
                  <td>{user.age}</td>
                  <td>{user.address}</td>
                  <td>
                    <div className='d-flex justify-content-evenly'> 
                      <Link className='btn btn-success' to={`/editUser/${user.id}/${user.firstName}/${user.lastName}/${user.phoneNumber}/${user.age}/${user.address}/`}><FontAwesomeIcon icon={faPen}/></Link>
                      <Button className='btn-danger' onClick={() => deleteUserHandler(user.id)}> <FontAwesomeIcon icon={faTrash}/></Button>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </Table>
     </div>
  );
}

export default App;
