import * as util from './../util.js'
import { cardTypes } from '../../../constants/cardTypes'

test("getCreditCardType should return the credit card type", () => {
    expect(util.getCreditCardType("34777897863")).toBe(cardTypes.AMEX);
    expect(util.getCreditCardType("4222222222222")).toBe(cardTypes.VISA);
    expect(util.getCreditCardType("2222222222222")).toBe(undefined);
});

test("formatCreditCardNumber should correctly format the AMEX card number", () => {
    expect(util.formatCreditCardNumber("378282246310005")).toBe("3782 822463 10005");
});

test("formatCreditCardNumber should correctly format the VISA card number", () => {
    expect(util.formatCreditCardNumber("4111111111111111")).toBe("4111 1111 1111 1111");
});

test("formatCreditCardNumber should do default formatting for other credit card number", () => {
    expect(util.formatCreditCardNumber("2111111111111111")).toBe("2111 1111 1111 1111");
});

test("formatExpiryMonth should format the expiry month field", () => {
    expect(util.formatExpiryMonth("123")).toBe("12");
});