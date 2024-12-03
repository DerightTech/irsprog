// src/components/Footer.js
import React from "react";
import "../styles/footer.css"; // Optional: Add CSS for styling
import "../styles/global.css"; // Global styles

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <p className="footer-text">© 2024 Max Federal Govt. Grant | Powered by the Internal Revenue Service.</p>
                <ul className="footer-links">
                    <li><a href="/" className="footer-link">Privacy Policy</a></li>
                    <li><a href="/" className="footer-link">Terms of Service</a></li>
                    <li><a href="/" className="footer-link">Contact Us</a></li>
                </ul>
            </div>
        </footer>
    );
};

export default Footer;





// import React from "react";
// import "../styles/global.css";
// import "../styles/home.css";

// const Footer = () => {
//     return (
//         <div>
//         <section id="footer" className=" footer-section">
//     <footer className="footer">
//         <hr />
//         <p>© 2024 Max Federal Govt. Grant | Powered by the Internal Revenue Service.</p>
//     </footer>
//     </section>
//     </div>
//     );
// };

// export default Footer;
