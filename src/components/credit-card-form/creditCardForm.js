import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { Card, Form, Row, Col, ButtonGroup } from 'react-bootstrap';
import '../../css/creditCardForm.css';
import {
    formatCreditCardNumber,
    formatExpiryMonth,
    formatExpiryYear,
    formatCVV,
    formatName,
    cleanNumber,
    getCreditCardType
} from './util.js';

export default function CreditCardForm() {

    const [name, setName] = useState('');
    const [cardNumber, setCardNumber] = useState('')
    const [expiryMonth, setExpiryMonth] = useState('')
    const [expiryYear, setExpiryYear] = useState('')
    const [cvv, setCVV] = useState('');
    const [expiryDateInvalid, setExpiryDateInvalid] = useState(false);
    const [validated, setValidated] = useState(false);

    const onClear = () => {
        setName('');
        setCardNumber('');
        setExpiryMonth('');
        setExpiryYear('');
        setCVV('');
    }

    const isDateValid = (expiryYear, expiryMonth) => {
        const expiryDate = new Date(expiryYear + '-' + expiryMonth + '-01');
        const currentDate = new Date();
        const monthsDiff = new Date(new Date(expiryDate) - currentDate).getMonth();

        if (expiryDate < currentDate || monthsDiff <= 0) {
            setExpiryDateInvalid(true)
            return;
        }
        setExpiryDateInvalid(false);
    }

    const onInputChange = ({ target }) => {
        if (target.name === "name") {
            target.value = formatName(target.value);
            setName(target.value);
            return;
        }

        if (target.name === "cardNumber") {
            const cardNumber = target.value;
            if (!cardNumber) {
                target.value = cardNumber;
                setCardNumber(target.value);
                return;
            }

            let cleanValue = cleanNumber(cardNumber);

            target.value = formatCreditCardNumber(cleanValue);
            setCardNumber(target.value);
            return;
        }

        if (target.name === "expiryMonth") {
            if(parseInt(target.value) > 12){
                target.value = formatExpiryMonth(target.value);
                setExpiryDateInvalid(true)
                return;
            }
            target.value = formatExpiryMonth(target.value);
            setExpiryMonth(target.value);
            isDateValid(expiryYear, target.value);
            return;
        }

        if (target.name === "expiryYear") {
            target.value = formatExpiryYear(target.value);
            setExpiryYear(target.value);
            isDateValid(target.value, expiryMonth);
            return;
        }

        if (target.name === "cvv") {
            let cleanValue = cleanNumber(cardNumber);
            const cardType = getCreditCardType(cleanValue);
            target.value = formatCVV(target.value, cardType);
            setCVV(target.value);


            return;
        }
        setValidated(false);
    };

    const onSubmit = (event) => {
        
        const form = event.currentTarget;
        const isFormValid = form.checkValidity();
        if (!isFormValid) {
            //Preventing form submission if there are any errors
            event.preventDefault();
            event.stopPropagation();
        }
        setValidated(true);

        //TODO: If the form is valid we will submit the form data from here
        //If it a SPA we can take the form data and submit in ajax way.
        //For now we are just not submitting 
        event.preventDefault();
        event.stopPropagation();
    };

    return (
        <div data-testid="payment-form" className="payment-form">
            <Container fluid="sm">
                <Card>
                    <Card.Body>
                        <Form noValidate validated={validated} onSubmit={onSubmit}>
                            <Form.Group data-testid="customer-name" className="mb-3 form-group" controlId="name">
                                <Row >
                                    <Col xs={4} className="form-group__label"><Form.Label>Name</Form.Label></Col>
                                    <Col>
                                        <Form.Control
                                            className="form-group__input"
                                            name="name"
                                            data-testid="credit-card-holder-name"
                                            type="text"
                                            placeholder="Enter Name"
                                            pattern="[^\s][A-z0-9À-ž\s]+"
                                            isValid={false}
                                            required
                                            value={name}
                                            onChange={onInputChange}
                                        />
                                        <Form.Control.Feedback type="invalid">Please enter an name without #/,.</Form.Control.Feedback>
                                    </Col>

                                </Row>
                            </Form.Group>

                            <Form.Group className="mb-3 form-group" controlId="cardNumber">
                                <Row>
                                    <Col xs={4} className="form-group__label"><Form.Label>Enter card number</Form.Label></Col>
                                    <Col>
                                        <Form.Control
                                            name="cardNumber"
                                            data-testid="credit-card-number"
                                            type="text"
                                            placeholder="Enter Card Number"
                                            required
                                            value={cardNumber}
                                            onChange={onInputChange}
                                        />
                                        <Form.Control.Feedback type="invalid">Please enter an valid card number</Form.Control.Feedback>
                                    </Col>
                                </Row>
                            </Form.Group>

                            <Form.Group className="mb-3 form-group" controlId="cvv">
                                <Row>
                                    <Col xs={4} className="form-group__label"><Form.Label>Enter CVV</Form.Label></Col>
                                    <Col xs={3}>
                                        <Form.Control
                                            name="cvv"
                                            data-testid="cvv"
                                            type="password"
                                            placeholder="CVV"
                                            pattern="\d{3,4}"
                                            required
                                            value={cvv}
                                            onChange={onInputChange}
                                        />
                                        <Form.Control.Feedback type="invalid">Please enter an valid cvv</Form.Control.Feedback>
                                    </Col>
                                </Row>
                            </Form.Group>

                            <Form.Group className="mb-3 form-group" controlId="month">
                                <Row>
                                    <Col xs={4} className="form-group__label"><Form.Label>Expiration</Form.Label></Col>
                                    <Col xs={3}>
                                        <Form.Control
                                            name="expiryMonth"
                                            data-testid="expiry-month"
                                            type="tel"
                                            placeholder="MM"
                                            pattern="\d{1,2}"
                                            maxLength="2"
                                            required
                                            isInvalid={expiryDateInvalid}
                                            value={expiryMonth}
                                            onChange={onInputChange}
                                        />
                                        <Form.Control.Feedback type="invalid">Please enter a valid Expiry Date</Form.Control.Feedback>
                                    </Col>
                                    <Col xs={1}><Form.Label>/</Form.Label></Col>
                                    <Col xs={3}><Form.Control
                                        name="expiryYear"
                                        data-testid="expiry-year"
                                        type="text"
                                        placeholder="YYYY"
                                        pattern="\d{4}"
                                        maxLength="4"
                                        required
                                        isValid={expiryDateInvalid}
                                        value={expiryYear}
                                        onChange={onInputChange}
                                    /></Col>
                                </Row>
                            </Form.Group>

                            <ButtonGroup>
                                <Button variant="primary" type="submit">
                                    Submit
                                </Button>
                                <Button variant="secondary" onClick={onClear}>
                                    Clear
                                </Button>
                            </ButtonGroup>

                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        </div>
    );
}




