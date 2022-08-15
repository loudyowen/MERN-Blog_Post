import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import {Container} from '@material-ui/core'

import './App.css'
import Auth from "./component/Auth/Auth";
import Home from "./component/Home/Home";
import Navbar from "./component/Navbar/Navbar";

import {GoogleOAuthProvider} from '@react-oauth/google'

const App = () =>{
    

    return(
        
            <BrowserRouter>
                <Container maxWidth='lg'>
                    <Navbar />
                    <Routes>
                        <Route path="/" exact element={<Home />} />
                        <Route path="/auth" exact element={<Auth />} />
                    </Routes>
                </Container>
            </BrowserRouter>
    );
}

export default App;