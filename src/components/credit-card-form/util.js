import { cardTypes } from '../../constants/cardTypes'

export const getCreditCardType = (cc) => {
    const amex = new RegExp('^3[47]');
    const visa = new RegExp('^4[0-9]{12}(?:[0-9]{3})?$');

    if (visa.test(cc)) {
        return cardTypes.VISA;
    }
    if (amex.test(cc)) {
        return cardTypes.AMEX;
    }
    return undefined;
}

export const cleanNumber = (value = "") => {
    return value.replace(/\D+/g, "");
}

export const formatCreditCardNumber = (cardNumber) => {
    let formattedCreditCard = cardNumber;

    if (cardNumber.length > 16) {
        formattedCreditCard = cardNumber.slice(0, 16);
    }

    const cardType = getCreditCardType(formattedCreditCard);

    if (cardType === cardTypes.AMEX && cardNumber.length > 15) {
        formattedCreditCard = cardNumber.slice(0, 15)
    } else if (cardType === cardTypes.VISA && cardNumber.length > 16) {
        formattedCreditCard = cardNumber.slice(0, 16);
    }

    switch (cardType) {
        case cardTypes.AMEX:
            formattedCreditCard = `${cardNumber.slice(0, 4)} ${cardNumber.slice(4, 10)} ${cardNumber.slice(10, 15)}`;
            break;
        case cardTypes.VISA:
            formattedCreditCard = `${cardNumber.slice(0, 4)} ${cardNumber.slice(4, 8)} ${cardNumber.slice(8, 12)} ${cardNumber.slice(12, 16)}`;
            break;
        default:
            formattedCreditCard = `${cardNumber.slice(0, 4)} ${cardNumber.slice(4, 8)} ${cardNumber.slice(8, 12)} ${cardNumber.slice(12, 16)}`;
            break;
    }

    return formattedCreditCard.trim();
}

export const formatExpiryMonth = (value) => {
    const cleanedValue = cleanNumber(value);
    return cleanedValue.slice(0, 2);
}

export const formatExpiryYear = (value) => {
    const cleanedValue = cleanNumber(value);
    return cleanedValue.slice(0, 4);
}

export const formatCVV = (value, cardType) => {
    const cleanedValue = cleanNumber(value);
    let maxLength = 4;

    maxLength = cardType === cardTypes.AMEX ? 4 : 3;
    return cleanedValue.slice(0, maxLength);
}

export const formatName = (value) => {
    const regEx = /^[a-z][a-z\s]*$/i;
    if (!value.match(regEx)) {
        return value.slice(0, -1);
    }
    return value;
}