import React from "react";
import "./Footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faYoutube, faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faCopyright } from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-item privacy">
                </div>
                <div className="footer-item copyright">
                    <span className="text-gray-400" style={{ paddingRight: 5 }}>Copyright</span>
                    <FontAwesomeIcon icon={faCopyright} />
                    <span className="text-gray-400" style={{ paddingLeft: 5 }}>
                        {new Date().getFullYear()} HPC-LAB (SEECS) All Rights
                        Reserved.
                    </span>
                </div>
                <a
                    href="https://github.com/HamxaMahmmood"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-item social github"
                    aria-label="GitHub"
                >
                    <FontAwesomeIcon icon={faGithub} />
                </a>
                <a
                    href="https://www.linkedin.com/in/hamza-mahmood-57447024a/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-item social linkedin"
                    aria-label="LinkedIn"
                >
                    <FontAwesomeIcon icon={faLinkedin} />
                </a>
                <a
                    href="https://www.youtube.com/channel/UCXarDyoEgZ5fVAT7QruBgZA"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-item social youtube"
                    aria-label="YouTube"
                >
                    <FontAwesomeIcon icon={faYoutube} />
                </a>
            </div>
        </footer>
    );
};

export default Footer;      