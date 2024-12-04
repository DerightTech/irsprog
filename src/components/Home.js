// src/components/Home.js
import React from "react";
import { Link } from "react-router-dom";
import "../styles/global.css";
import "../styles/home.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const testimonials = [
{
    name: "Donna Hawes",
    message: "It is a welcome relief for those who have been struggling financially and it provides much-needed assistance to those who need it most.",
    image: "https://maxfegogrfuprog.com/wp-content/uploads/2020/01/team-3.jpg",
},
{
    name: "Nancy Wilson",
    message: "It allowed me to cover some of my basic living expenses, as well as helping to pay down some of my debt. The process of applying was easy and straightforward. I found the staff to be very helpful and knowledgeable.",
    image: "https://maxfegogrfuprog.com/wp-content/uploads/2023/05/testimonial-2.jpg",
},
{
    name: "Mark Wilson",
    message: "Their team made the application process seamless and stress-free.",
    image: "https://maxfegogrfuprog.com/wp-content/uploads/2023/05/testimonial-3.jpg",
},
{
    name: "Jacob Kathleen",
    message: "I felt that they genuinely wanted to help and were willing to go the extra mile to make sure I received the assistance I needed. I am very grateful for the grant relief package and would highly recommend it to anyone who is facing a financial struggle.",
    image: "https://maxfegogrfuprog.com/wp-content/uploads/2024/08/images-1.jpg",
},
];

const BenefitData = () => (
    <section id="benefit" className="benefit-data-section">
        <h2>Max Grant Funding Data</h2>
        <p className="benefit-intro">
        Each year billions of dollars are awarded to individuals and businesses in the form of grants and other types of funding. Apply for YOUR piece today!
        </p>
        <div className="benefit-container">
        {[
            { title: "Personal Assistance", percentage: 92, applications: "50,375" },
            { title: "Max Govt. Funding Program", percentage: 100, applications: "85,104" },
            { title: "Home Buyers/Renovation", percentage: 84, applications: "38,316" },
            { title: "Business Assistance", percentage: 93, applications: "47,035" },
            { title: "Education", percentage: 85, applications: "65,311" },
            { title: "Charity Funding", percentage: 55, applications: "9,234" },
        ].map((item, index) => (
            <div key={index} className="benefit-item">
            <h3>{item.title}</h3>
            <div className="progress-circle" data-percentage={item.percentage}>
                <span className="percentage">{item.percentage}%</span>
            </div>
            <p>{item.applications} Applications</p>
            </div>
        ))}
        </div>
    </section>
    );

    const ContactForm = () => {
        const navigate = useNavigate(); // Initialize navigate hook
    
        const [formData, setFormData] = useState({
            fullName: "",
            email: "",
            phone: "",
            info: "",
            message: "",
        });
    
        const handleChange = (e) => {
            const { name, value } = e.target;
            setFormData({ ...formData, [name]: value });
        };
    
        const handleSubmit = async (e) => {
            e.preventDefault();
    
            try {
                const response = await axios.post(
                    `${process.env.REACT_APP_BACKEND_URL}/submit-contact`,
                    formData,
                    {
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );
    
                if (response.status === 200) {
                    alert("Message sent successfully!");
                    navigate("/"); // Navigate back to the home page
                } else {
                    alert(`Error: ${response.data.message}`);
                }
            } catch (error) {
                console.error("Error submitting form:", error);
                alert("An error occurred. Please try again.");
            }
        };
    
        return (
            <section id="contact" className="contact-section">
                <h2>Contact Us</h2>
                <p>We're here to help. Get in touch!</p>
                <form className="contact-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="fullName">
                            Full Name <span className="required">*</span>
                        </label>
                        <input
                            type="text"
                            id="fullName"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">
                            Email <span className="required">*</span>
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="phone">
                            Phone Number <span className="required">*</span>
                        </label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="info">
                            More Info <span className="required">*</span>
                        </label>
                        <select
                            id="info"
                            name="info"
                            value={formData.info}
                            onChange={handleChange}
                            required
                        >
                            <option value="" disabled>
                                - Select -
                            </option>
                            <option value="Grant Assistant">Grant Assistant</option>
                            <option value="Audit & Assurance">Audit & Assurance</option>
                            <option value="Financial Advisory">Financial Advisory</option>
                            <option value="Analytics and M&A">Analytics and M&A</option>
                            <option value="Middle Marketing">Middle Marketing</option>
                            <option value="Legal Consulting">Legal Consulting</option>
                            <option value="Regulatory Risk">Regulatory Risk</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="message">
                            Message <span className="required">*</span>
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            required
                        ></textarea>
                    </div>
                    <button type="submit" className="submit-button">
                        Send Now
                    </button>
                </form>
            </section>
        );
    };
    

const Home = () => {
// Handle smooth scroll to specific section
const handleScroll = (id) => {
document.getElementById(id).scrollIntoView({ behavior: "smooth" });
};

return (
<div>
    {/* First Nav Bar */}
    <nav className="navbar-main">
    <h1 className="navbar-title">Max Funding</h1>
    <div className="contact-info">
                <span>+1(480) 920-0606</span>
                <span>info@irsgrantfederal.com</span>
    </div>
    <Link className="btn-apply" to="/apply-now">Apply Now</Link>
    </nav>

    {/* Second Nav Bar */}
    <nav className="navbar-secondary">
    <button className="nav-button" onClick={() => handleScroll("home")}>Home</button>
    <button className="nav-button" onClick={() => handleScroll("about")}>About Us</button>
    <button className="nav-button" onClick={() => handleScroll("testimonials")}>Testimonials</button>
    <button className="nav-button" onClick={() => handleScroll("video")}>Video</button>
    <button className="nav-button" onClick={() => handleScroll("benefit")}>Benefit Data</button>
    <button className="nav-button" onClick={() => handleScroll("contact")}>Contact Us</button>
    </nav>

    {/* Sections */}
    <section id="home" className="section">
    <h2>IRS Max Federal Government Grants Funding Program</h2>
    <p style={{ fontSize: '3rem', fontWeight: "800" }}>
        Each Year Billions Of Dollars Are Awarded To Individuals And Businesses In The Form Of Grants And Other Types Of Funding.
    </p>
    <Link className="btn-start" to="/apply-now">START APPLICATION</Link>
    </section>

    <section id="about" className="section, who-we-are">
    <h2>WHO WE ARE</h2>
    <h1>Max Federal Government Grant Funds Program</h1>
    <p>The Max Federal Government Grant Funds Program is an international organization based in Washington, D.C. Our primary goal is to foster global monetary cooperation and promote sustainable economic growth. We provide financial support for various purposes, such as starting a business, improving business standards, funding real estate projects, paying off debts, and meeting personal needs. Additionally, we strive to reduce poverty and promote high employment rates worldwide. Periodically, we rely on resources from the World Bank to carry out our initiatives.</p> 
            <p>The primary aim of this program is to offer financial support to eligible individuals, business owners, and companies in order to fund the continuation of a healthy living and to improve the quality of life. Unlike loans, <b>grants do not require repayment after you have been deemed eligible and approved</b></p>
            <p>Our legal team, who have been recommended by the grant board (WBG) and fully certified by the Supreme Court of the United States, are available to assist you with the full application process to determine your eligibility and ensure final approval.</p> 
            <p>It is important to emphasize that Monetary Relief Grants do not require repayment, as long as the applicants remain qualified and adhere to the guidelines stipulated.</p>
            <p><b>Additionally, it is crucial to note that applicants are responsible for handling the processing fees associated with the grant application.</b></p>
    </section>

    <section id="testimonials" className="section">
    <h2>Clients Testimonials</h2>
  <div className="testimonials-container">
    {testimonials.map((testimonial, index) => (
      <div key={index} className="testimonial">
        <img src={testimonial.image} alt={`${testimonial.name}`} className="testimonial-image" />
        <p className="testimonial-message">"{testimonial.message}"</p>
        <p className="testimonial-name">- {testimonial.name}</p>
      </div>
    ))}
  </div>

    </section>

    <section id="video" className="section video-section">
    <h2>BECOME VOLUNTEER</h2>
        <h3>Max Federal Government Grant Funding Program</h3>
        <p>
        Interested in IRS Max Federal Government Grant Funding Program? Let's make a better future. Watch the video and click Apply Now to start your grant application. We will be glad to respond to you.
        </p>
        <div className="video-wrapper">
        <div
            className="video-thumbnail"
            style={{
            backgroundImage: "url(https://maxfegogrfuprog.com/wp-content/uploads/2024/08/do.jpg)",
            }}
        >
            <button
            className="play-button"
            onClick={() => window.open("https://youtu.be/jbV1TDZQAFc", "_blank")}
            aria-label="Play Video"
            >
            <svg aria-hidden="true" className="play-icon" viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg">
                <path d="M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z"></path>
            </svg>
            </button>
            
        </div>
        </div>
        <br></br>
        <Link className="btn-start" to="/apply-now">Apply Now</Link>

    </section>

    
    <BenefitData />
    

    <ContactForm />

{/* <section id="footer" className=" footer-section">
    <footer className="footer">
        <hr />
        <p>© 2024 Max Federal Govt. Grant | Powered by the Internal Revenue Service.</p>
    </footer>
    </section> */}
</div>
);
};

export default Home;
