import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserForm from "./Pages/UserForm";
import { Toaster } from "react-hot-toast";
import UserProfile from "./Pages/UserProfile";

function App() {
  return (
    <>

      <BrowserRouter>
      <Routes>
        <Route path="/" element={<UserForm />} />
        <Route path="/user-profile/:userId" element={<UserProfile />} />
      </Routes>
    </BrowserRouter>
    <Toaster position='top-center' autoClose={2000}/>  
    
    </>
  
  );
}

export default App;

