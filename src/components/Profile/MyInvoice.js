import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./myinvoice.scss"
const API = 'http://localhost:3000'


export default function MyInvoice({ singleInvoice, currUser, isLoading, setIsLoading, loadingRequest, setLoadingRequest }){
    const [invoiceShow, setInvoiceShow] = useState(false);
    const token = localStorage.getItem("token");

    function handlePayInvoice(){
        setIsLoading(true)
        fetch(`${API}/pay_invoice/${singleInvoice.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                paid: true,
            })
        }).then((r) => {
            if (r.ok){
                setLoadingRequest(loadingRequest+1)
                return r.json()
            }
        }).then((data) => console.log(data))
        
        setInvoiceShow(false)
    }

    function ShowInvoiceModal(props) {
        return (
            <Modal
                {...props}
                size="m"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter" className="paid-color">
                    <b>Invoice Details:</b>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                    <Form 
                        // onSubmit={handleListInquire} 
                        id={singleInvoice.id} 
                        >
                        <div className="form-group">
                            <div><b>Task:</b></div>
                            <div>{singleInvoice.title}</div>
                            <div><b>Description:</b></div>
                            <div>{singleInvoice.invoice_desc}</div>
                            <div><b>Hours Worked:</b></div>
                            <div>{singleInvoice.hours_worked}</div>
                            <div><b>From:</b></div>
                            <div> {singleInvoice.user2.username}</div>
                            <div><b>To:</b></div>
                            <div> {singleInvoice.user.username}</div>
                            <div><b>Additional Costs:</b></div>
                            <div>${singleInvoice.additional_fees}</div>
                        </div>
                        <div>
                            {/* <button 
                                className="listing-modal-submit"
                                style={{ backgroundColor: "#9F99FF", margin: "1%"}}
                                type="submit"
                            >{isLoading ? "Loading..." : "Submit"}
                            </button> */}
                        </div>
                    </Form>
            </Modal.Body>
            <Modal.Footer>
                <Modal.Title className="footer-wrapper">
                    <div className="paid-text">Total: <b className="paid-color">${singleInvoice.amount}</b></div>
                    { singleInvoice.paid ? 
                        <div className="paid-text">Status: <b className="paid-color">paid</b></div>
                        :
                        <div className="paid-text">Status: <b className="paid-color">unpaid</b></div>
                    }
                    { currUser.id === singleInvoice.user.id ?
                        <div className="button-container">
                            <Button
                                className="listing-modal-submit"
                                style={{ backgroundColor: "#6C63FF", margin: "1%"}}
                                onClick={handlePayInvoice}
                            >Pay</Button>
                        </div>
                        :
                        <></>
                    }
                </Modal.Title>
            </Modal.Footer>
            </Modal>
        );
    }    

    console.log(singleInvoice.paid)

    return(
        <div className="invoice-container">
            {singleInvoice.paid ?
                <>
                    <Row className="paid-invoice-card">
                    <Col className="conversation-date">{singleInvoice.created_at}</Col>
                    <Col className="conversation-text">{singleInvoice.user2.username}</Col>
                    <Col className="conversation-text">{singleInvoice.user.username}</Col>
                    <Col className="conversation-task">{singleInvoice.title}</Col>
                    <Col className="conversation-desc">{singleInvoice.invoice_desc}</Col>
                    <Col className="conversation-amount">$ {singleInvoice.amount}</Col>
                    <Col className="button-section">
                        <button
                            className="see-details-button"
                            style={{ backgroundColor: "#6C63FF", margin: "1%"}}
                            onClick={() => setInvoiceShow(true)} 
                        >details</button>
                    </Col>
                    </Row>
                    <ShowInvoiceModal
                        show={invoiceShow}
                        onHide={() => setInvoiceShow(false)}
                    />
                </>
                :
                <>
                    <Row className="invoice-card">
                        <Col className="conversation-date">{singleInvoice.created_at}</Col>
                        <Col className="conversation-text">{singleInvoice.user2.username}</Col>
                        <Col className="conversation-text">{singleInvoice.user.username}</Col>
                        <Col className="conversation-task">{singleInvoice.title}</Col>
                        <Col className="conversation-desc">{singleInvoice.invoice_desc}</Col>
                        <Col className="conversation-amount">$ {singleInvoice.amount}</Col>
                        <Col className="button-section">
                            <button
                                className="see-details-button"
                                style={{ backgroundColor: "#6C63FF", margin: "1%"}}
                                onClick={() => setInvoiceShow(true)} 
                            >details
                            </button>
                        </Col>
                    </Row>
                    <ShowInvoiceModal
                        show={invoiceShow}
                        onHide={() => setInvoiceShow(false)}
                    />
                </>
            }
        </div>
    )
}