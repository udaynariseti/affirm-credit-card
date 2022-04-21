import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import CreditCardForm from './../creditCardForm';
import * as util from './../util.js'

jest.mock('util', () => ({
    formatCreditCardNumber: jest.fn(),
    formatName: jest.fn(),
    formatCVV: jest.fn(),
    formatExpiryMonth: jest.fn(),
    formatExpiryYear: jest.fn()
}));

test("should render without crashing", () => {
    render(<CreditCardForm></CreditCardForm>);
    const paymentForm = screen.queryByTestId('payment-form');
    const customerNameField = screen.queryByTestId('customer-name');
    const creditCardNumberFiled = screen.queryByTestId('credit-card-number');

    expect(paymentForm).toBeInTheDocument();
    expect(customerNameField).toBeInTheDocument();
    expect(creditCardNumberFiled).toBeInTheDocument();
});

test("should call formatCreditCardNumber when there is a change in creditCardNumber", () => {
    render(<CreditCardForm />);

    const inputValue = '3455 34545645 34534';
    const cardNumberInput = screen.getByTestId('credit-card-number');
    jest.spyOn(util, 'formatCreditCardNumber')
    fireEvent.change(cardNumberInput, { target: { value: inputValue } });

    expect(util.formatCreditCardNumber).toHaveBeenCalled();
});

test("should call formatName when there is a change in credit card holder name", () => {
    render(<CreditCardForm />);

    const inputValue = "Uday Nariseti";
    const cardHolderName = screen.getByTestId('credit-card-holder-name');
    jest.spyOn(util, 'formatName')
    fireEvent.change(cardHolderName, { target: { value: inputValue } });

    expect(util.formatName).toHaveBeenCalled();
});

test("should call formatCVV when there is a change in CVV input field", () => {
    render(<CreditCardForm />);

    const cardHolderName = screen.getByTestId('cvv');
    jest.spyOn(util, 'formatCVV')
    fireEvent.change(cardHolderName, { target: { value: "123" } });

    expect(util.formatCVV).toHaveBeenCalled();
});

test("should call formatExpiryMonth when there is a change in Expiry Month input field", () => {
    render(<CreditCardForm />);

    const cardHolderName = screen.getByTestId('expiry-month');
    jest.spyOn(util, 'formatExpiryMonth')
    fireEvent.change(cardHolderName, { target: { value: "123" } });

    expect(util.formatExpiryMonth).toHaveBeenCalled();
});

test("should call formatExpiryYear when there is a change in Expiry Year input field", () => {
    render(<CreditCardForm />);

    const cardHolderName = screen.getByTestId('expiry-year');
    jest.spyOn(util, 'formatExpiryYear')
    fireEvent.change(cardHolderName, { target: { value: "2022" } });

    expect(util.formatExpiryYear).toHaveBeenCalled();
});