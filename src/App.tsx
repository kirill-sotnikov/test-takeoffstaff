import React from "react";
import { Route, Routes } from "react-router-dom";
import Contacts from "./containers/Contacts";
import Login from "./containers/Login";

function App() {
  return (
    <>
      <Routes>
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/" element={<Login />} />
      </Routes>
      {/* <div>
        <Login />
      </div> */}
    </>
  );
}

export default App;
