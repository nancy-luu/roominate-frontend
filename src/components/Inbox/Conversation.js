import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { Link } from 'react-router-dom';
import Container from "react-bootstrap/Container";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Message from "./Message";
import "./conversation.scss";
const API = "http://localhost:3000";

export default function Conversation({
  singleConversation,
  user,
  userList,
  isLoading,
  setIsLoading,
  loadingRequest,
  setLoadingRequest,
  myConvos,
}) {
  const [messageCount, setMessageCount] = useState(0);
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState("");
  const [invoice, setInvoice] = useState(null);
  const [invoiceModalShow, setInvoiceModalShow] = useState(false);
  const [messageModalShow, setMessageModalShow] = React.useState(false);
  const token = localStorage.getItem("token");
  let messageText;
  let title;
  let invoice_desc;
  let hours_worked;
  let additional_fees;
  let amount;

  const myMessages = singleConversation.messages.filter((myMessage) => {
    if (myMessage.user_id === user.id) {
      return true;
    }
  });

  useEffect(() => {
    setIsLoading(true);
    if (token) {
      fetch(`${API}/message_count/${singleConversation.id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((resp) => resp.json())
        .then((messageCount) => {
          setMessageCount(messageCount);
          setIsLoading(false);
        });
    }
  }, [loadingRequest]);

  function handleSendMessage(e) {
    setIsLoading(true);
    fetch(`${API}/messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        message: messageText,
        user_id: user.id,
        conversation_id: singleConversation.id,
      }),
    }).then((r) => {
      if (r.ok) {
        r.json().then((message) => {
          setMessage(message);
          setLoadingRequest(loadingRequest + 1);
        });
      }
    });
    setMessage("");
    e.target.previousElementSibling.value = "";
  }

  function handleMessageInput(e) {
    console.log(e.target.value);
    messageText = e.target.value;
  }

  function handleSendInvoice() {
    setIsLoading(true);

    setIsLoading(true);
    const totalHours = parseFloat(hours_worked);
    const additionalCosts = parseFloat(additional_fees);
  
    const totalAmount = (totalHours * parseFloat(user.user_charge)) + additionalCosts;
  

    fetch(`${API}/invoices`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title,
        invoice_desc,
        paid: false,
        hours_worked,
        additional_fees,
        amount: totalAmount,
        user_id: singleConversation.user.id,
        user2_id: singleConversation.user2.id,
      }),
    }).then((r) => {
      if (r.ok) {
        r.json().then((invoice) => {
          setInvoice(invoice);
          setLoadingRequest(loadingRequest + 1);
        });
      }
    });
    console.log("_________________")
    console.log(hours_worked)
    console.log(user.user_charge)
    console.log(additional_fees)
    console.log(totalAmount)
    console.log("****************")
    setInvoiceModalShow(false);
    setTimeout(() => setMessageModalShow(true), 400);
  }

  function handleCreateTitle(e) {
    e.preventDefault();
    title = e.target.value;
  }

  function handleCreateDesc(e) {
    e.preventDefault();
    invoice_desc = e.target.value;
  }

  function handleCreateHrs(e) {
    e.preventDefault();
    hours_worked = e.target.value;
  }

  function handleCreateCosts(e) {
    e.preventDefault();
    additional_fees = e.target.value;
  }

  function handleCreateAmount(e) {
    e.preventDefault();
    amount = e.target.value;
  }

  function SetInvoiceModalShow(props) {
    return (
      <Modal
        {...props}
        size="m"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Send Invoice:
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSendInvoice}>
            <div className="form-group">
              <label>Task*</label>
              <input
                className="form-control"
                placeholder="Enter Task..."
                onChange={handleCreateTitle}
              ></input>
            </div>
            <div className="form-group">
              <label>Description*</label>
              <input
                className="form-control"
                placeholder="Enter Description..."
                autoComplete="on"
                onChange={handleCreateDesc}
              ></input>
            </div>
            <div className="form-group">
              <label>Hrs Worked*</label>
              <input
                type="cost"
                className="form-control"
                id="cost-input"
                autoComplete="on"
                onChange={handleCreateHrs}
              ></input>
            </div>
            <div className="form-group">
              <label>Additional Costs*</label>
              <input
                type="cost"
                className="form-control"
                id="cost-input"
                autoComplete="on"
                placeholder="Materials, toll, gas, etc..."
                onChange={handleCreateCosts}
              ></input>
            </div>
            <div>
              <Button
                className="listing-modal-submit"
                style={{ backgroundColor: "#6C63FF", margin: "1%" }}
                type="submit"
              >
                {isLoading ? "Loading..." : "Submit"}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }

  console.log(user);

  function SuccessModal(props) {
    return (
        <Modal
            {...props}
            size="m"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
        <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
               Invoice Sent!
            </Modal.Title>
            <Modal.Body>
                <Link to="/profile">See invoices</Link>
            </Modal.Body>
        </Modal.Header>
        </Modal>
    );
}  

  return (
    <div className="conversation-container">
      <div className="conversation-card">
        <div className="conversation-title">
          " {singleConversation.header} "
        </div>
        <Row className="conversation-button-wrapper">
          <Col className="info-center">
            <div className="conversation-text">from:</div>
            <div className="conversation-info">
              {" "}
              {singleConversation.user.username}
            </div>
          </Col>
          <Col className="info-center">
            <div className="conversation-text">to:</div>
            <div className="conversation-info">
              {" "}
              {singleConversation.user2.username}
            </div>
          </Col>
          <Col className="info-center">
            <div className="conversation-text">messages:</div>
            <div className="conversation-info">{messageCount}</div>
          </Col>
        </Row>
        <Row className="conversation-button-wrapper">
          {user.user_type === "Home Owner" ? (
            <>
              <Row className="see-btn-container">
                <button
                  className="see-btn"
                  style={{ backgroundColor: "#9F99FF", margin: "1%" }}
                  onClick={() => setShowMessage(!showMessage)}
                >
                  {showMessage ? "x" : "more"}
                </button>
              </Row>
            </>
          ) : (
            <>
              <Col className="see-btn-container">
                <button
                  className="see-btn"
                  style={{ backgroundColor: "#9F99FF", margin: "1%" }}
                  onClick={() => setShowMessage(!showMessage)}
                >
                  {showMessage ? "x" : "more"}
                </button>
              </Col>
              <Col className="invoice-btn-container">
                <button
                  className="invoice-btn"
                  style={{ backgroundColor: "#9F99FF", margin: "1%" }}
                  onClick={() => setInvoiceModalShow(true)}
                >
                  invoice
                </button>
              </Col>
            </>
          )}
        </Row>
      </div>
      {showMessage ? (
        <div className="fade-in">
          {singleConversation.messages.map((m) => (
            <Message
              singleMessage={m}
              key={m.id}
              user={user}
              userList={userList}
            />
          ))}
          <input
            id="test"
            className="chat-input"
            onChange={handleMessageInput}
          ></input>
          <button
            className="send-btn"
            style={{ backgroundColor: "#9F99FF", margin: "1%" }}
            onClick={handleSendMessage}
          >
            send
          </button>
        </div>
      ) : (
        <></>
      )}
      <SetInvoiceModalShow
        show={invoiceModalShow}
        onHide={() => setInvoiceModalShow(false)}
      />
      <SuccessModal
        className="successModal"
        show={messageModalShow}
        onHide={() => setMessageModalShow(false)}
      />
    </div>
  );
}
