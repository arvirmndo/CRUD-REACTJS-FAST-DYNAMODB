import React from 'react';
import { render } from 'react-dom';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import './index.css';
import App from './App';
import AddUser from './Components/AddUser';
import EditUser from './Components/EditUser';
import reportWebVitals from './reportWebVitals';

const rootElement = document.getElementById("root");
render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="addUser" element={<AddUser/>} />
      <Route path="editUser/:id" element={<EditUser/>} />
    </Routes>
  </BrowserRouter>,
  rootElement
);
reportWebVitals();
