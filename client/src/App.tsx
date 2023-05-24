import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import "react-datepicker/dist/react-datepicker.css";
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/login'

function App() {
    return (
        <Routes>
            <Route path='/' element={<Login/>} />
        </Routes>
    );
}

export default App;
