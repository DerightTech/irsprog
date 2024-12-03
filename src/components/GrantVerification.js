// import React, { useState } from "react";


// const GrantVerification = () => {
// const [formData, setFormData] = useState({
// fullName: "",
// email: "",
// phone: "",
// specialNeeds: "",
// });

// const handleChange = (e) => {
// const { name, value } = e.target;
// setFormData({ ...formData, [name]: value });
// };

// const handleSubmit = (e) => {
// e.preventDefault();
// console.log("Form Data Submitted:", formData);
// };

// return (
// <div className="grant-verification">
//     <section className="header-section">
//     <div className="header-container">
//         <h2>GRANT VERIFICATION</h2>
//     </div>
//     </section>

//     <div className="form-container">
//     <form onSubmit={handleSubmit}>
//         <div className="form-row">
//         <p className="info-text">
//             <b>
//             Input Your Registered Name, Phone Number, and Email Address below
//             to Proceed to Verification
//             </b>
//         </p>
//         </div>

//         <div className="form-row">
//         <input
//             type="text"
//             name="fullName"
//             value={formData.fullName}
//             onChange={handleChange}
//             placeholder="Registered Full Name"
//             required
//         />
//         </div>

//         <div className="form-row">
//         <input
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             placeholder="Registered Email Address"
//             required
//         />
//         </div>

//         <div className="form-row">
//         <input
//             type="text"
//             name="phone"
//             value={formData.phone}
//             onChange={handleChange}
//             placeholder="Registered Phone Number"
//         />
//         </div>

//         <div className="form-row">
//         <h4>Proof Of Need</h4>
//         </div>

//         <div className="form-row">
//         <label className="radio-group">
//             <span>Do you have any dependent with special needs?</span>
//             <div className="radio-options">
//             <label>
//                 <input
//                 type="radio"
//                 name="specialNeeds"
//                 value="yes"
//                 onChange={handleChange}
//                 />
//                 Yes
//             </label>
//             <label>
//                 <input
//                 type="radio"
//                 name="specialNeeds"
//                 value="no"
//                 onChange={handleChange}
//                 />
//                 No
//             </label>
//             </div>
//         </label>
//         </div>

//         <button type="submit" className="submit-button">
//         Submit
//         </button>
//     </form>
//     </div>
// </div>
// );
// };

// export default GrantVerification;
