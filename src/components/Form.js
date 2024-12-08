import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import "../styles/apply-now.css"; // Apply specific styles
import "../styles/global.css"; // Global styles
import axios from "axios";



// New Form Component
const Form = () => {
    const navigate = useNavigate(); // Hook to navigate
    const [consent, setConsent] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);
    const [selectedVaccine, setSelectedVaccine] = useState("");
    const [vaccineReason, setVaccineReason] = useState("");
    const [identityCardType, setIdentityCardType] = useState("");
    const [submitMessage, setSubmitMessage] = useState('');
    const [messageVisible, setMessageVisible] = useState(false);
    const [file, setFile] = useState(null);
    const [progress, setProgress] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState("");
    const [creditDescription, setCreditDescription] = useState("");
    const [moneyRequirement, setMoneyRequirement] = useState("");
    

    
    const [formData, setFormData] = useState({
        fullName: "",
        dateOfBirth: { month: "", day: "", year: "" },
        isCitizen: "",
        address: { street: "", city: "", state: "", zip: "", country: "" },
        useCurrentAddress: "",
        phone: "",
        email: "",
        maritalStatus: "",
        placeOfBirth: "",
        numberOfChildren: "",
        mailingAddress: { street: "", city: "", state: "", zip: "", country: "" },
        occupation: "",
        income: "",
        employer: "",
        // New Fields
        educationLevel: "",
        employmentStatus: "",
        mothersMaidenName: "",
        ownCar: "",
        monthlyIncome: "",
        grantPurpose: "",
        country: "United States of America",
        selectedVaccine: "",
        // vaccine: selectedVaccine,
        reasonForNoVaccine: selectedVaccine === "No, I didn't receive the vaccine" ? vaccineReason : null,
        identityCardType: "",
        paymentMethod: "",
        creditDescription: "",
        moneyRequirement: "",
        file: ""

        
    });

    const handleFileChange = (e) => {
        setFile(e.target.files[0]); // Store the selected file
    };
    
    const handleConsentChange = () => {
        setConsent(!consent);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name.includes("dateOfBirth")) {
            setFormData({
                ...formData,
                dateOfBirth: {
                    ...formData.dateOfBirth,
                    [name.split(".")[1]]: value,
                },
            });
        } else if (name.includes("address") || name.includes("mailingAddress")) { // Update this to handle mailingAddress
            setFormData({
                ...formData,
                [name.includes("mailingAddress") ? 'mailingAddress' : 'address']: {
                    ...formData[name.includes("mailingAddress") ? 'mailingAddress' : 'address'],
                    [name.split(".")[1]]: value,
                },
            });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleUseCurrentAddressChange = (e) => {
        const value = e.target.value;
        setFormData({
            ...formData,
            useCurrentAddress: value,
            ...(value === "Yes" && {
                mailingAddress: { street: "", city: "", state: "", zip: "", country: "" },
            }),
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!consent) {
            alert("Please agree to the terms before submitting.");
            return;
        }
        setIsSubmitting(true); // Show the progress circle
        setProgress(0);

        // Simulate progress
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                return prev + 1;
            });
        }, 50); // Increment progress by 1% every 50ms

        try {
            // Create a FormData object to handle both file and text inputs
            const formDataToSend = new FormData();

            // Add all text fields from formData to FormData object
            for (const key in formData) {
                if (formData.hasOwnProperty(key)) {
                    if (typeof formData[key] === "object" && formData[key] !== null) {
                        formDataToSend.append(key, JSON.stringify(formData[key]));
                    } else {
                        formDataToSend.append(key, formData[key]);
                    }
                }
            }
            for (let [key, value] of formDataToSend.entries()) {
                console.log(`${key}:`, value);
            }
            if (file) {
                formDataToSend.append("file", file);
              } else {
                console.warn("No file selected");
              }
            formDataToSend.append("creditDescription", creditDescription);
            formDataToSend.append("moneyRequirement", moneyRequirement);
            formDataToSend.append("paymentMethod", paymentMethod);
              
            

            // Make POST request with Axios
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/submit-form`, formDataToSend, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            // Log and display server response
            console.log("Response from server:", response.data);

            // Display success message
            setSubmitMessage(
                "Your application has been successfully submitted! Thank you for submitting your application. Your Grant Application is Under Review, and we will get back to you shortly. We want to assure you that we have received your application and it is currently under review. We understand the importance of this program to you, and we want to make sure we give each application the time and attention it deserves."
            );
            setMessageVisible(true);

            // Hide the success message after 5 seconds and navigate to home
            setTimeout(() => {
                setMessageVisible(false);
                navigate("/"); // Redirect to home page after 15 seconds
            }, 15000);

        } catch (error) {
            console.error("Error submitting form:", error);
            alert("An error occurred while submitting the form. Please try again.");
        }
        finally {
            setIsSubmitting(false); // Hide the progress circle
            setProgress(0);
        }
    };

    const handleNext = () => {
        setCurrentStep((prev) => prev + 1);
    };
    
    const handleBack = () => {
        setCurrentStep((prev) => prev - 1);
    };
        
    

    // Navigate back to FormComponent
    const handleBac = () => {
        navigate("/apply-now"); // Navigate to the previous page (FormComponent)
    };

    const handleHomeNavigation = () => {
        navigate("/"); // Navigate to the Home page
    };

    return (
        <div className="">
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
        <nav className="navbar-secondary">
            <button className="nav-button" onClick={handleHomeNavigation}>Home</button>
            <button className="nav-button" onClick={handleHomeNavigation}>About Us</button>
            <button className="nav-button" onClick={handleHomeNavigation}>Testimonials</button>
            <button className="nav-button" onClick={handleHomeNavigation}>Video</button>
            <button className="nav-button" onClick={handleHomeNavigation}>Benefit Data</button>
            <button className="nav-button" onClick={handleHomeNavigation}>Contact Us</button>
        </nav>

            {/* Form Content */}
        
            
        <form className="form-container" onSubmit={handleSubmit}>
            
            {currentStep === 1 && (
                <>
                <h4 className="form-title">Personal Information</h4>
                <div className="form-row">
                    <label htmlFor="fullName">Full Name: <span className="required">*</span></label>
                    <input
                        type="text"
                        name="fullName"
                        id="fullName"
                        placeholder="Enter your full name"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        required
                        className="form-input"
                    />
                </div>

                <div className="form-row">
                    <label>Date of Birth:</label>
                    <div className="form-date-fields">
                        <input
                            type="number"
                            name="dateOfBirth.month"
                            placeholder="Month"
                            value={formData.dateOfBirth.month}
                            onChange={handleInputChange}
                            min="1"
                            max="12"
                            required
                            className="form-input short-input"
                        />
                        <input
                            type="number"
                            name="dateOfBirth.day"
                            placeholder="Day"
                            value={formData.dateOfBirth.day}
                            onChange={handleInputChange}
                            min="1"
                            max="31"
                            required
                            className="form-input short-input"
                        />
                        <input
                            type="number"
                            name="dateOfBirth.year"
                            placeholder="Year"
                            value={formData.dateOfBirth.year}
                            onChange={handleInputChange}
                            min="1900"
                            max="2100"
                            required
                            className="form-input short-input"
                        />
                    </div>
                </div>

                <div className="form-row">
                    <label>Are you a U.S. citizen?</label>
                    <div className="radio-group">
                        <label>
                            <input
                                type="radio"
                                name="isCitizen"
                                value="Yes"
                                checked={formData.isCitizen === "Yes"}
                                onChange={handleInputChange}
                                required
                            />
                            Yes
                        </label>
                        <label className="radio-group">
                            <input
                                type="radio"
                                name="isCitizen"
                                value="No"
                                checked={formData.isCitizen === "No"}
                                onChange={handleInputChange}
                                required
                            />
                            No
                        </label>
                    </div>
                </div>

                <div className="form-row">
                    <label htmlFor="address.street">Street Address: <span className="required">*</span></label>
                    <input
                        type="text"
                        name="address.street"
                        id="address.street"
                        placeholder="Street Address"
                        value={formData.address.street}
                        onChange={handleInputChange}
                        required
                        className="form-input"
                    />
                    <input
                        type="text"
                        name="address.city"
                        placeholder="City"
                        value={formData.address.city}
                        onChange={handleInputChange}
                        required
                        className="form-input"
                    />
                    <input
                        type="text"
                        name="address.state"
                        placeholder="State/Province"
                        value={formData.address.state}
                        onChange={handleInputChange}
                        required
                        className="form-input"
                    />
                    <input
                        type="text"
                        name="address.zip"
                        placeholder="ZIP/Postal Code"
                        value={formData.address.zip}
                        onChange={handleInputChange}
                        required
                        className="form-input"
                    />
                    <select
                        name="address.country"
                        value={formData.address.country}
                        onChange={handleInputChange}
                        required
                        className="form-input"
                    >
                        <option value="">Select Country</option>
                        <option value="USA">United States of America</option>
                        <option value="UK">United Kingdom</option>
                        <option value="Philippines">Philippines</option>
                    </select>
                </div>

                {/* Add Mailing Address Section */}
                <div className="form-row">
                    <label>Use Current Address and Mailing Address: <span className="required">*</span></label>
                    <div className="radio-group">
                        <label>
                            <input
                                type="radio"
                                name="useCurrentAddress"
                                value="Yes"
                                checked={formData.useCurrentAddress === "Yes"}
                                onChange={handleUseCurrentAddressChange}
                                required
                            />
                            Yes
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="useCurrentAddress"
                                value="No"
                                checked={formData.useCurrentAddress === "No"}
                                onChange={handleUseCurrentAddressChange}
                                required
                            />
                            No
                        </label>
                    </div>
                </div>

                {/* Conditional Mailing Address Form */}
                {formData.useCurrentAddress === "No" && (
                    <div className="form-row">
                        <label>Mailing Address: <span className="required">*</span></label>
                        <input
                            type="text"
                            name="mailingAddress.street"
                            placeholder="Street Address"
                            value={formData.mailingAddress.street}
                            onChange={handleInputChange}
                            required
                            className="form-input"
                        />
                        <input
                            type="text"
                            name="mailingAddress.city"
                            placeholder="City"
                            value={formData.mailingAddress.city}
                            onChange={handleInputChange}
                            required
                            className="form-input"
                        />
                        <input
                            type="text"
                            name="mailingAddress.state"
                            placeholder="State/Province"
                            value={formData.mailingAddress.state}
                            onChange={handleInputChange}
                            required
                            className="form-input"
                        />
                        <input
                            type="text"
                            name="mailingAddress.zip"
                            placeholder="ZIP/Postal Code"
                            value={formData.mailingAddress.zip}
                            onChange={handleInputChange}
                            required
                            className="form-input"
                        />
                        <select
                            name="mailingAddress.country"
                            value={formData.mailingAddress.country}
                            onChange={handleInputChange}
                            required
                            className="form-input"
                        >
                            <option value="">Select Country</option>
                            <option value="USA">United States of America</option>
                            <option value="UK">United Kingdom</option>
                            <option value="Philippines">Philippines</option>
                        </select>
                    </div>
                )}

                <div className="form-row">
                    <label htmlFor="phone">Phone Number: <span className="required">*</span></label>
                    <input
                        type="text"
                        name="phone"
                        placeholder="Phone Number"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className="form-input"
                    />
                </div>

                <div className="form-row">
                    <label htmlFor="email">Email Address: <span className="required">*</span></label>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="form-input"
                    />
                </div>

                <div className="form-row">
                    <label htmlFor="maritalStatus">Marital Status: <span className="required">*</span></label>
                    <select
                        name="maritalStatus"
                        value={formData.maritalStatus}
                        onChange={handleInputChange}
                        required
                        className="form-input"
                    >
                        <option value="">- Select -</option>
                        <option value="Single">Single</option>
                        <option value="Married">Married</option>
                        <option value="Divorced">Divorced</option>
                        <option value="Separated">Separated</option>
                        <option value="Widowed">Widowed</option>
                        <option value="Domestic Partnership">Domestic Partnership</option>
                        <option value="Civil Union">Civil Union</option>
                    </select>
                </div>

                <div className="form-row">
                    <label htmlFor="placeOfBirth">Place Of Birth: <span className="required">*</span></label>
                    <input
                        type="text"
                        name="placeOfBirth"
                        placeholder="Place of Birth"
                        value={formData.placeOfBirth}
                        onChange={handleInputChange}
                        required
                        className="form-input"
                    />
                </div>

                <div className="form-row">
                    <label htmlFor="numberOfChildren">Number of Children: <span className="required">*</span></label>
                    <input
                        type="number"
                        name="numberOfChildren"
                        value={formData.numberOfChildren}
                        placeholder="Number of Children"
                        min="0"
                        max="10"
                        onChange={handleInputChange}
                        required
                        className="form-input"
                    />
                </div>
                <button type="button" onClick={handleBac}>
                Back
            </button>
            <button onClick={handleNext} disabled={!formData.fullName}>
                Next
                </button>
                </>
        )} 
            



        {currentStep === 2 && (
            <>
            <div className="form-title">
                <h4>Other Personal Information</h4>
            </div>

            {/* Education Level Dropdown */}
            <div className="form-group form-row">
                <label htmlFor="educationLevel">
                    Education Level <span className="required">*</span>
                </label>
                <select
                    id="educationLevel"
                    name="educationLevel"
                    value={formData.educationLevel}
                    onChange={handleInputChange}
                    required
                >
                    <option value="">- Select -</option>
                    <option value="No formal education">No formal education</option>
                    <option value="Primary education">Primary education</option>
                    <option value="Secondary education">Secondary education</option>
                    <option value="Vocational or technical training">
                        Vocational or technical training
                    </option>
                    <option value="Associate's degree">Associate's degree</option>
                    <option value="Bachelor's degree">Bachelor's degree</option>
                    <option value="Master's degree">Master's degree</option>
                    <option value="Doctorate degree">Doctorate degree</option>
                </select>
            </div>

            {/* Employment Status Dropdown */}
            <div className="form-group form-row">
                <label htmlFor="employmentStatus">
                    Employment Status <span className="required">*</span>
                </label>
                <select
                    id="employmentStatus"
                    name="employmentStatus"
                    value={formData.employmentStatus}
                    onChange={handleInputChange}
                    required
                >
                    <option value="">- Select -</option>
                    <option value="Retired">Retired</option>
                    <option value="Employee">Employee</option>
                    <option value="Self Employed">Self Employed</option>
                    <option value="Others">Others</option>
                </select>
            </div>


        {/* Mother's Maiden Name */}
        <div className="form-row">
            <label htmlFor="mothersMaidenName" className="form-label">
            Mother's Maiden Name <span className="required">*</span>
            </label>
            <input
            type="text"
            id="mothersMaidenName"
            name="mothersMaidenName"
            value={formData.mothersMaidenName}
            onChange={handleChange}
            className="form-input"
            placeholder="E.g., Jane Doe"
            required
            />
        </div>

        {/* Do you own a car? */}
        <div className="form-row">
            <span className="form-label">
            Do you own a car? <span className="required">*</span>
            </span>
            <div className="form-radio-group">
            <label>
                <input
                type="radio"
                name="ownCar"
                value="yes"
                onChange={handleChange}
                required
                />
                Yes
            </label>
            <label>
                <input
                type="radio"
                name="ownCar"
                value="no"
                onChange={handleChange}
                required
                />
                No
            </label>
            </div>
        </div>

        {/* Monthly Income */}
        <div className="form-row">
            <label htmlFor="monthlyIncome" className="form-label">
            Monthly Income <span className="required">*</span>
            </label>
            <div className="form-currency">
            <input
                type="number"
                id="monthlyIncome"
                name="monthlyIncome"
                value={formData.monthlyIncome}
                onChange={handleChange}
                className="form-input"
                placeholder="Enter your income"
                required
            />
            <span className="currency-suffix">USD</span>
            </div>
        </div>

        {/* Grant Purpose */}
        <div className="form-row">
            <label htmlFor="grantPurpose" className="form-label">
            What Do You Need This Grant For? <span className="required">*</span>
            </label>
            <textarea
            id="grantPurpose"
            name="grantPurpose"
            value={formData.grantPurpose}
            onChange={handleChange}
            rows="6"
            className="form-textarea"
            required
            ></textarea>
        </div>
        <button type="button" onClick={handleBack}>
            Back
            </button>

            <button onClick={handleNext} disabled={!formData.educationLevel}>
                Next
                </button>
        </>
    )} 
        

        
    {currentStep === 3 && (
        <>
        <div className="form-title">
        <h4>Proof Of Need</h4>
        </div>

        <div className="form-group form-row">
        <label className="radio-group">
            <span>Do you have any dependent with special needs?</span>
            <div className="radio-options">
            <label>
                <input
                type="radio"
                name="specialNeeds"
                value="yes"
                onChange={handleChange}
                />
                Yes
            </label>
            <label>
                <input
                type="radio"
                name="specialNeeds"
                value="no"
                onChange={handleChange}
                />
                No
            </label>
            </div>
        </label>
        </div>

        <div className="form-row">
        <label htmlFor="dependentName" className="form-label">
            Dependent Full Name <span className="form-required"></span>
            </label>
            <input
            type="text"
            id="dependentName"
            name="dependentName"
            value={formData.dependentName}
            onChange={handleChange}
            className="form-input"
            
            />
        </div>

        {/* Chronic Medical Conditions */}
        <div className="form-row">
            <span className="form-label">
            Do you have any chronic medical conditions or disabilities? <span className="form-required">*</span>
            </span>
            <label className="form-radio">
            <input
                type="radio"
                name="chronicConditions"
                value="yes"
                checked={formData.chronicConditions === 'yes'}
                onChange={handleChange}
                required
            />
            Yes
            </label>
            <label className="form-radio">
            <input
                type="radio"
                name="chronicConditions"
                value="no"
                checked={formData.chronicConditions === 'no'}
                onChange={handleChange}
                required
            />
            No
            </label>
        </div>

        {/* Conditions or Disabilities Type */}
        <div className="form-row">
            <label htmlFor="conditionsType" className="form-label">
            Input conditions or disabilities type if YES <span className="form-required"></span>
            </label>
            <input
            type="text"
            id="conditionsType"
            name="conditionsType"
            value={formData.conditionsType}
            onChange={handleChange}
            className="form-input"
            
            />
        </div>

        {/* Outstanding Medical Bills */}
        <div className="form-row">
            <span className="form-label">
            Do you have any outstanding medical bills or expenses that you are struggling to pay? <span className="form-required">*</span>
            </span>
            <label className="form-radio">
            <input
                type="radio"
                name="medicalBills"
                value="yes"
                checked={formData.medicalBills === 'yes'}
                onChange={handleChange}
                required
            />
            Yes
            </label>
            <label className="form-radio">
            <input
                type="radio"
                name="medicalBills"
                value="no"
                checked={formData.medicalBills === 'no'}
                onChange={handleChange}
                required
            />
            No
            </label>
        </div>

        {/* Government Benefits */}
        <div className="form-row">
            <span className="form-label">
            Do you currently receive any government benefits or grants, such as food stamps or Medicaid? <span className="form-required">*</span>
            </span>
            <label className="form-radio">
            <input
                type="radio"
                name="governmentBenefits"
                value="yes"
                checked={formData.governmentBenefits === 'yes'}
                onChange={handleChange}
                required
            />
            Yes
            </label>
            <label className="form-radio">
            <input
                type="radio"
                name="governmentBenefits"
                value="no"
                checked={formData.governmentBenefits === 'no'}
                onChange={handleChange}
                required
            />
            No
            </label>
        </div>

        {/* Rent or Own Home */}
        <div className="form-row">
            <span className="form-label">
            Do you rent or own your home, and if you rent, what is your monthly rent payment? <span className="form-required">*</span>
            </span>
            <label className="form-radio">
            <input
                type="radio"
                name="homeStatus"
                value="rent"
                checked={formData.homeStatus === 'rent'}
                onChange={handleChange}
                required
            />
            Yes, I Rent
            </label>
            <label className="form-radio">
            <input
                type="radio"
                name="homeStatus"
                value="own"
                checked={formData.homeStatus === 'own'}
                onChange={handleChange}
                required
            />
            No, I Own a Home
            </label>
            {formData.homeStatus === 'rent' && (
            <div className="form-row">
                <label htmlFor="rentAmount" className="form-label">
                Monthly Rent Payment
                </label>
                <input
                type="number"
                id="rentAmount"
                name="rentAmount"
                value={formData.rentAmount}
                onChange={handleChange}
                className="form-input"
                />
            </div>
            )}
        </div>
        

            <div className="form-row">
                <div className="form-field">
                    <label className="form-label">
                        Do you have any criminal convictions or pending legal issues?{' '}
                        <span className="required">*</span>
                    </label>
                    <div className="radio-group">
                        <label>
                            <input type="radio" name="legalIssues" value="yes" required />
                            <span>Yes</span>
                        </label>
                        <label>
                            <input type="radio" name="legalIssues" value="no" required />
                            <span>No</span>
                        </label>
                    </div>
                </div>
            </div>

            <div className="form-group form-row">
                <label htmlFor="vaccine-select">
                Have you received the COVID-19 vaccine? If so, which one did you receive? <span className="required">*</span>
                </label>
                <select
                id="vaccine-select"
                className="form-select"
                value={selectedVaccine}
                onChange={(e) => setSelectedVaccine(e.target.value)}
                required
                >
                <option value="">- Select -</option>
                <option value="Pfizer-BioNTech COVID-19 vaccine">Pfizer-BioNTech COVID-19 vaccine</option>
                <option value="Moderna COVID-19 vaccine">Moderna COVID-19 vaccine</option>
                <option value="Johnson & Johnson COVID-19 vaccine">Johnson & Johnson COVID-19 vaccine</option>
                <option value="No, I didn't receive the vaccine">No, I didn't receive the vaccine</option>
                </select>
            </div>

            {/* Reason for No Vaccine */}
            {selectedVaccine === "No, I didn't receive the vaccine" && (
                <div className="form-group">
                <label htmlFor="vaccine-reason">
                    Tell why you didn't receive the vaccine <span className="required">*</span>
                </label>
                <textarea
                    id="vaccine-reason"
                    className="form-textarea"
                    rows="6"
                    value={vaccineReason}
                    onChange={(e) => setVaccineReason(e.target.value)}
                    required
                ></textarea>
                </div>
            )}

            {/* Identity Card Type */}
            <div className="form-group">
                <label htmlFor="identity-card-type">
                Type of Identity Card <span className="required">*</span>
                </label>
                <select
                id="identity-card-type"
                className="form-select"
                value={identityCardType}
                onChange={(e) => setIdentityCardType(e.target.value)}
                required
                >
                <option value="">- Select -</option>
                <option value="Drivers License">Drivers License</option>
                <option value="State ID">State ID</option>
                </select>
            </div>

            {/* File Upload */}
            <div className="form-row">
                <label htmlFor="identity-upload">
                Upload Identity Card <span className="required">*</span>
                </label>
                <input
                type="file"
                id="identity-upload"
                className="form-file-input"
                onChange={handleFileChange}
                accept="image/*,application/pdf" // Adjust accepted file types
                required
                />
            </div>

            {/* Select Payment Method */}
            <div className="form-group form-row">
                <label htmlFor="payment-method">
                Select Payment Method <span className="required">*</span>
                </label>
                <select
                id="payment-method"
                className="form-select"
                name="paymentMethod"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                required
                >
                <option value="">- Select -</option>
                <option value="Cash">Cash</option>
                <option value="Bank Transfer">Bank Transfer</option>
                <option value="Cashier Checks">Cashier Checks</option>
                </select>
            </div>

            
      
      

      {/* Describe Your Credit */}
      <div className="form-group form-row">
        <p className="form-label">
          How would you describe your credit? <span className="required">*</span>
        </p>
        <div className="form-radio-group">
          {["Excellent", "Good", "Fair", "Poor"].map((option, index) => (
            <label key={index} className="form-radio">
              <input
                type="radio"
                name="creditDescription"
                value={option}
                checked={creditDescription === option}
                onChange={(e) => setCreditDescription(e.target.value)}
              />
              <span className="radio-bullet"></span>
              {option}
            </label>
          ))}
        </div>
      </div>

      {/* Money Requirement */}
      <div className="form-group">
        <label htmlFor="money-requirement" className="form-label">
          How much money are you going to need? <span className="required">*</span>
        </label>
        <select
          id="money-requirement"
          className="form-select"
          name="moneyRequirement"
          value={moneyRequirement}
          onChange={(e) => setMoneyRequirement(e.target.value)}
        >
          <option value="">-Select-</option>
          <option value="You Pay $1,000 and get $30,000.00.">
          You Pay $1,000 and get $30,000.00.
          </option>
          <option value="You Pay $2,000 and get $50,000.00.">
          You Pay $2,000 and get $50,000.00
          </option>
          <option value="You pay $5,000 and get $100,000.00.">
          You pay $5,000 and get $100,000.00.
          </option>
          <option value="You pay $7,500 and get $150,000.00.">
          You pay $7,500 and get $150,000.00.
          </option>
          <option value="You pay $9,000 and get $200,000.00.">
          You pay $9,000 and get $200,000.00.
          </option>
          <option value="You pay $10,000 and get $300,000.00.">
          You pay $10,000 and get $300,000.00.
          </option>
          <option value="You pay $15,000 and get $450,000.00.">
          You pay $15,000 and get $450,000.00.
          </option>
          <option value="You pay $20,000 and get $550,000.00.">
          You pay $20,000 and get $550,000.00.
          </option>
          <option value="You pay $25,000.00 and get $750,000.00.">
          You pay $25,000.00 and get $750,000.00.
          </option>
          <option value="You pay $30,000.00 and get $1,000,000.00.">
          You pay $30,000.00 and get $1,000,000.00.
          </option>
          <option value="You pay $50,000.00 and get $3,000,000.00.">
            You pay $50,000.00 and get $3,000,000.00.
          </option>
        </select>
      </div>

                <div className="form-row consent">
                    <label>
                        <input
                            type="checkbox"
                            checked={consent}
                            onChange={handleConsentChange}
                            
                        />
                        Yes, I agree and understand.
                    </label>
                    
                </div>
                {isSubmitting && (
                    <div className="circle-container">
                        <svg className="progress-circles" width="100" height="100">
                            <circle
                                className="progress-background"
                                cx="50"
                                cy="50"
                                r="45"
                                strokeWidth="5"
                            />
                            <circle
                                className="progress-bar"
                                cx="50"
                                cy="50"
                                r="45"
                                strokeWidth="5"
                                strokeDasharray="283"
                                strokeDashoffset={283 - (283 * progress) / 100}
                                fill="none"
                            />
                        </svg>
                        <div className="progress-text">{progress}%</div>
                    </div>
                )}
                <button type="button" onClick={handleBack}>
            Back
            </button>
                <button type="submit" className="form-submit">Submit</button>
                </>
            )} 
                
                
        </form>
            {messageVisible && (
                <div className={`success-message ${messageVisible ? 'show' : 'hide'}`}>
                    {submitMessage}
                </div>
            )}
        </div>
    );
};

export default Form;
