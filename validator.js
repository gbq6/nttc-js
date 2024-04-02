import {MOST_POSSIBLE_DIGITS} from './numberText.js'

const DIGITS_ONLY_REGEX = /^\d+$/
const LEADING_ZEROES_REGEX = /^0+(?!$)/

export function validate(number) {
    validateFormatOf(number)
    let trimmedNumber = removeLeadingZeroesFrom(number)
    validateLengthOf(trimmedNumber)
    return trimmedNumber
}

function validateFormatOf(number) {
    if (isNumberNotValid(number)) {
        throw new NumberFormatError
    }
}

function isNumberNotValid(number) {
    return number == null || number.trim() == '' || !DIGITS_ONLY_REGEX.test(number)
}

function removeLeadingZeroesFrom(number) {
    return number.replace(LEADING_ZEROES_REGEX, '')
}

function validateLengthOf(number) {
    if (isNumberTooLong(number)) {
        throw new NumberLengthError(number)
    }
}

function isNumberTooLong(number) {
    return number.length > MOST_POSSIBLE_DIGITS
}

export class NumberFormatError extends Error {
    constructor() {
        super('Nem megfelelő formátum: Csak számjegyeket használj!');
        this.name = 'NumberFormatError'
    }
}

export class NumberLengthError extends Error {
    constructor(number) {
        super(`A megadott szám túl hosszú: ${number.length} számjegy a maximális ${MOST_POSSIBLE_DIGITS} helyett!`);
        this.name = 'NumberLengthError'
    }
}
