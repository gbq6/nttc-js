const MOST_POSSIBLE_DIGITS = require('./numberText').MOST_POSSIBLE_DIGITS

function validate(number) {
    validateFormatOf(number)
    trimmedNumber = removeLeadingZeroesFrom(number)
    validateLengthOf(number)
    return trimmedNumber
}

const DIGITS_ONLY_REGEX = /^\d+$/
const LEADING_ZEROES_REGEX = /^0+(?!$)/

function validateFormatOf(number) {
    if (isNumberNotValid(number)) {
        throw "Nem megfelelő formátum. Csak számjegyeket használj!"
    }
}

function isNumberNotValid(number) {
    return number == null || number.trim() == '' || !DIGITS_ONLY_REGEX.test(number)
}

function removeLeadingZeroesFrom(number) {
    return number.replace(LEADING_ZEROES_REGEX, "")
}

function validateLengthOf(number) {
    if (isNumberTooLong(number)) {
        throw `A megadott szám túl hosszú. Legfeljebb ${MOST_POSSIBLE_DIGITS} számjegy!`
    }
}

function isNumberTooLong(number) {
    return number.length > MOST_POSSIBLE_DIGITS
}

module.exports = validate
