import React, { useState, useEffect } from "react";
import { Row, Col } from 'react-bootstrap';
import { BsArrowLeftShort, BsArrowRightShort } from "react-icons/bs";
import Container from "react-bootstrap/Container";
import FeaturedUser from "../Community/FeaturedUser"; 


export default function FeatUserSlider ({ featUsers, token }) {
    const [img, setImg] = useState(0);
    const [toggle, setToggle] = useState(false);
    const length = featUsers.length;

    console.log(featUsers)
  
    useEffect(() => {
      setTimeout(() => setToggle((prevToggle) => !prevToggle), 5000);
      return () => nextSlide();
    }, [toggle]);
  
    const nextSlide = () => {
      setImg(img === length - 1 ? 0 : img + 1);
    };
  
    const prevSlide = () => {
      setImg(img === 0 ? length - 1 : img - 1);
    };
  
    if (!Array.isArray(featUsers) || featUsers.lenth <= 0) {
      return null;
    }

    // console.log(featUsers)

    return(
        <section className="feat-user-slider">
            <Row>
                    {/* <BsArrowLeftShort className="left-arrow" onClick={prevSlide} /> */}
                    {featUsers.map((singleFeatUser, index) => {
                        console.log(singleFeatUser)
                        return (
                            <div
                                className={index === img ? "slide active" : "slide"}
                                key={index}
                            >
                                {index === img && (
                                    // <img src={singleFeatUser.user_photo.image} alt="sfu-img" className="single-img"/>
                                    <FeaturedUser key={singleFeatUser.id} singleFeatUser={singleFeatUser} token={token}/> 
                                )}
                            </div>
                        )
                    })}
                    {/* <BsArrowRightShort className="right-arrow" onClick={nextSlide} /> */}
            </Row>
        </section>

    )

}