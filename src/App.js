// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import ApplyNow from "./components/ApplyNow"; // Ensure this component exists
import Form from "./components/Form"; // Import your Form component
import "./styles/global.css";
import Footer from "./components/footer";

function App() {
  return (
    <Router>
      <Routes>
        {/* Define Routes using 'element' instead of 'component' */}
        <Route path="/" element={<Home />} />
        <Route path="/apply-now" element={<ApplyNow />} />
        <Route path="/form" element={<Form />} /> {/* Add the route for the form page */}
      </Routes>
      <Footer />
    </Router>

  );
}

export default App;
