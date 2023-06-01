import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import "react-datepicker/dist/react-datepicker.css";
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/login'
import ProfileList from './pages/people';
import Account from './pages/account';

function App() {
    return (
        <Routes>
            <Route path='/' element={<Login/>} />
            <Route path='/account/:userId' element={<Account/>} />
            <Route path='/people' element={<ProfileList/>} />
        </Routes>
    );
}

export default App;
