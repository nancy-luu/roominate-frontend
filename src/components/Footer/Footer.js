import React from 'react';
import { BsLinkedin } from 'react-icons/bs'
import { AiFillInstagram } from 'react-icons/ai'
import { MdEmail } from 'react-icons/md'

export default function Footer (){


    return (
        <div className='footer-container'>
            <div className='brand-container'>
                <div>
                    <img className='brand' src="images/RoomLogo.png" alt='brand image'/>
                </div>
                <div className='tagline'>Inspiration</div>
                <h6 className='phone'>loren impsum blah blah</h6> 

                <div className='contacts'>

                <a  href="mailto:nluuarch@gmail.com" target="_blank" ><MdEmail className='icons'/></a>

                <a  href="https://www.linkedin.com/in/nancyluucodes/" target="_blank" ><BsLinkedin className='icons' /></a>

                <a  href="https://www.instagram.com/seeingarchitecture/" target="_blank" ><AiFillInstagram className='icons' /></a>
                
                
                </div>
            </div>
        </div>
  );
}