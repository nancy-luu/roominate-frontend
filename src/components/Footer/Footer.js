import React from 'react';
import { Row, Col } from "react-bootstrap";
import { BsLinkedin } from 'react-icons/bs'
import { AiFillGithub } from 'react-icons/ai'
import { MdEmail } from 'react-icons/md'

import "./footer.scss"

export default function Footer (){


    return (
        <div className='main-footer'>
            <Row className="foot-top">
                <img 
                    className='footerlogo' 
                    src="images/FooterImg3.png" 
                    alt='footer-image'
                />
            </Row>
            <Row className="foot-btm">
                    <div className="footer-text">created by : Nancy Luu</div> 
                    <ul className="icon-wrapper">
                        <a href="mailto:nluuarch@gmail.com" target="_blank" >
                            <MdEmail className='foot-icons1'/>
                        </a>
                        <a href="https://www.linkedin.com/in/nancyluucodes/" target="_blank" >
                            <BsLinkedin className='foot-icons2' />
                        </a>
                        <a  href="https://github.com/nluuarch" target="_blank">
                            <AiFillGithub className='foot-icons3' />
                        </a>
                    </ul>
            </Row>
        </div>
    );
}