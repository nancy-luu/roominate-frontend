import React, { useState, useEffect } from "react";
import { Row, Col } from 'react-bootstrap';
import { AiOutlineDoubleRight, AiOutlineDoubleLeft } from "react-icons/ai";
import FeaturedUser from "../Community/FeaturedUser"; 


export default function FeatUserSlider ({ featUsers, token }) {
    const [img, setImg] = useState(0);
    const [toggle, setToggle] = useState(false);
    const length = featUsers.length;
  
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
                <Col className="left-arrow-container">
                    <AiOutlineDoubleLeft className="left-arrow" onClick={prevSlide} />
                </Col>
                <Col className="featuser-container">
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
                </Col>
                <Col className="right-arrow">
                    <AiOutlineDoubleRight className="right-arrow" onClick={nextSlide} />
                </Col>
            </Row>
        </section>

    )

}