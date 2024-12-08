import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormComponent from "./FormComponent"; // Import the separated FormComponent

import "../styles/apply-now.css";
import "../styles/global.css";

const ApplyNow = () => {
    const [consent, setConsent] = useState(false); // Define consent state in ApplyNow
    const navigate = useNavigate();

    const handleHomeNavigation = () => {
        navigate("/"); // Navigate to the Home page
    };

    return (
        <div>
            {/* Fixed Navbar */}
            <nav className="navbar-main">
                <h1 className="navbar-title" onClick={handleHomeNavigation} style={{ cursor: "pointer" }}>
                Max Funding
                </h1>
                {/* <div className="contact-info">
                    <span>+1(480) 920-0606</span>
                    <span>info@irsgrantfederal.com</span>
                </div> */}
                <a href="/apply-now" className="btn-apply">Apply Now</a>
            </nav>

            {/* Form Components */}
            <FormComponent consent={consent} setConsent={setConsent} /> {/* Pass consent and setConsent as props */}
            
        </div>
    );
};

export default ApplyNow;
