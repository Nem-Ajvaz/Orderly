import React from "react";
import style from "../../assets/css/footer.css";

const Footer = () => {
  return (
    <footer className="bg-primary text-light mb-4 py-3 flex-row align-center">
      <div className="contact-links">
        <ul>
          <li className="footer-li">
            <a href="mailto:nemanja.ajvaz@gmail.com">Gmail</a>
          </li>
          <li className="footer-li">
            <a href="https://github.com/Nem-Ajvaz">GitHub</a>
          </li>
          <li className="footer-li">
            <a href="https://stackoverflow.com/users/16861130/iamnem">
              Stack OverFlow
            </a>
          </li>
        </ul>
      </div>
      <div className="copyRight">&copy; Nemanja Ajvaz 2021</div>
    </footer>
  );
};

export default Footer;
