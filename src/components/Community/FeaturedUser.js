import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import { RiMailSendLine } from 'react-icons/ri'
import Card from 'react-bootstrap/Card'
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

import "./featuser.scss"


export default function FeaturedUser({ singleFeatUser, token }) {
    const [messageModalShow, setMessageModalShow] = React.useState(false);

    // console.log(singleFeatUser)

    return (
      <div className="roominator-card-container">
        <Row>
          <Row>
            <img
              className="feat-user-image"
              src={
                singleFeatUser.user_photo
                  ? singleFeatUser.user_photo.image
                  : "https://nanuntio.com/wp-content/uploads/2020/03/service_default_avatar_182956.png"
              }
              style={{ width: "20rem", height: "15rem" }}
            ></img>
          </Row>
          <Row>
            <Row>
              <Card.Title>
                <b>{singleFeatUser.username}</b>
              </Card.Title>
            </Row>
            <Row>
              <Card.Text>
                <b>Account Type: </b>
                {singleFeatUser.user_type}
              </Card.Text>
            </Row>
            <Row>
              <Card.Text>
                <b>Charge: </b>${singleFeatUser.user_charge} hr
              </Card.Text>
            </Row>
            <Row>
              <Card.Text>
                <b>Location: </b>
                {singleFeatUser.user_location}
              </Card.Text>
            </Row>
            <Row>
              <Card.Text>
                <b>Description: </b>
                {singleFeatUser.user_desc}
              </Card.Text>
            </Row>
            <button
              className="contact-btn"
              style={{ backgroundColor: "#6C63FF", margin: "1%" }}
              // onClick={() => setMessageRoominatorShow(true)}
            >
              <RiMailSendLine style={{ width: "3rem", height: "1rem" }} />
            </button>
          </Row>
        </Row>
        {/* <StartConvoModal
                show={messageModalShow}
                onHide={() => setMessageModalShow(false)}
                /> */}
      </div>
    );
}