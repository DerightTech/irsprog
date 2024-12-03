import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/apply-now.css";
import "../styles/global.css";

// Reusable FormComponent
const FormComponent = () => {
    const [consent, setConsent] = useState(false);
    const navigate = useNavigate(); // useNavigate hook for navigation

    // Handle consent checkbox change
    const handleCheckboxChange = () => {
        setConsent(!consent);
    };

    // Handle the "Next" button click to navigate to the form page
    const handleNextClick = () => {
        if (consent) {
            navigate("/form"); // Navigate to the form page
        } else {
            alert("You must agree to the terms first!");
        }
    };

    return (
        
        <div className="form-container">
            <div role="alert" aria-live="polite" className="form-response-message" aria-hidden="true"></div>
            <div className="form-pagination-progress" aria-hidden="true"></div>

            {/* Form Content */}
            <div role="tabpanel" id="form-page-0" className="form-pagination ">
                <div className="form-content">
                    <div className="form-row">
                        <div className="form-html">
                            <div className="form-field">
                            <br></br>
                            <br></br>
                            <br></br>
                            <br></br>
                                <h4 style={{ color: "red" }}>What You Need To Know About this Grant.</h4>
                                <ol>
                                    <li><strong>MAX Grant Program</strong> is a new empowerment program designed to assist elderly citizens from countries like the Philippines, United Kingdom, and the United States.</li>
                                    <li>This Grant isn't a <strong>Loan.</strong> No official will ever ask for repayment.</li>
                                    <li>Only one legal document is required, such as a <strong>Driver's License or State ID.</strong></li>
                                    <li>No restrictions on how to use your grant after approval.</li>
                                    <li>Provide only the necessary information.</li>
                                    <li>Ensure understanding of all questions and requirements.</li>
                                    <li>An upfront <strong>Delivery Payment</strong> is involved depending on the grant amount.</li>
                                    <li>Ensure all provided information is accurate and up-to-date.</li>
                                    <li>If you need help, contact <b>+1(480) 920-0606</b> for support.</li>
                                    <li>Your information is <strong>100% secured</strong>.</li>
                                </ol>
                            </div>
                        </div>
                    </div>

                    {/* Consent Checkbox */}
                    <div className="form-row">
                        <div className="form-consent">
                            <div className="form-field">
                                <div className="checkbox-wrapper">
                                    <label htmlFor="consent-checkbox" className="form-checkbox">
                                        <input
                                            type="checkbox"
                                            id="consent-checkbox"
                                            checked={consent}
                                            onChange={handleCheckboxChange}
                                            required
                                        />
                                        <span className="checkbox-box" aria-hidden="true"></span>
                                    </label>
                                    <div className="checkbox-label">
                                        <p>Yes, I agree and Understand.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Next Button */}
                    {consent && (
                        <div className="form-row">
                            <button type="button" className="btn-next" onClick={handleNextClick}>
                                Next
                            </button>
                        </div>
                        
                    )}
                    
                    
    
                </div>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
            </div>
            
        </div>

        
    );
    
};

export default FormComponent;
