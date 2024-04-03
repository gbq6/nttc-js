import {validate} from './validator.js'
import {
    DIGITS_IN_GROUP,
    getHundredPlaceTextFor,
    getOnePlaceTextFor,
    getTenPlaceTextFor,
    getThousandGroupNameFor,
    HUNDRED,
    MOST_POSSIBLE_DIGITS,
    TEN_SOMETHING,
    THOUSAND_GROUP_SEPARATOR,
    TOTAL_NUMBER_OF_GROUPS,
    TWENTY_SOMETHING,
    TWO,
    ZERO
} from './numberText.js'

const EMPTY_STRING = ''

let number
let result

let isMoreThanTwoThousand
let groups = Array(TOTAL_NUMBER_OF_GROUPS)
let hundredPlaceDigit
let tenPlaceDigit
let onePlaceDigit

export function convert(numberToConvert) {
    number = numberToConvert
    if (isEmpty()) return EMPTY_STRING
    number = validate(number)
    result = EMPTY_STRING
    return convertNumber()
}

function convertNumber() {
    if (isNumberZero()) return ZERO

    checkIfNumberIsMoreThanTwoThousand()
    splitNumberToThousandGroups()
    convertGroups()

    return result
}

function isEmpty() {
    return number == null || number.trim() === EMPTY_STRING
}

function isNumberZero() {
    return number == '0'
}

function checkIfNumberIsMoreThanTwoThousand() {
    // The first condition's purpose is to improve performance
    isMoreThanTwoThousand = number.length > 4 || parseInt(number) > 2000
}

function splitNumberToThousandGroups() {
    fillNumberWithLeadingZeroes()
    for (let group = 0; group < MOST_POSSIBLE_DIGITS; group += DIGITS_IN_GROUP) {
        setGroupValueOf(group)
    }
}

function fillNumberWithLeadingZeroes() {
    let numberOfLeadingZeroesNeeded = MOST_POSSIBLE_DIGITS - number.length
    number = '0'.repeat(numberOfLeadingZeroesNeeded) + number
}

function setGroupValueOf(groupNumber) {
    groups[groupNumber / DIGITS_IN_GROUP] = number.substring(groupNumber, groupNumber + DIGITS_IN_GROUP)
}

function convertGroups() {
    for (let group = 0; group < TOTAL_NUMBER_OF_GROUPS; group++) {
        if (isNotEmptyGroup(group)) {
            splitGroupToDigits(group)
            addThousandGroupSeparator()
            addHundredPlaceText()
            addTenPlaceText()
            addOnePlaceText(group)
            addThousandGroupName(group)
        }
    }
}

function isNotEmptyGroup(group) {
    return parseInt(groups[group]) > 0
}

function splitGroupToDigits(group) {
    hundredPlaceDigit = groups[group].charAt(0)
    tenPlaceDigit = groups[group].charAt(1)
    onePlaceDigit = groups[group].charAt(2)
}

function addThousandGroupSeparator() {
    if (hasPrefix() && isMoreThanTwoThousand) {
        result += THOUSAND_GROUP_SEPARATOR
    }
}

function hasPrefix() {
    return result.length > 0
}

function addHundredPlaceText() {
    if (hundredPlaceDigit > 1) {
        result += getHundredPlaceTextFor(hundredPlaceDigit)
    }
    if (hundredPlaceDigit > 0) {
        result += HUNDRED
    }
}

function addTenPlaceText() {
    if (isNumberRoundToTen() || isAboveThirty()) {
        result += getTenPlaceTextFor(tenPlaceDigit)
    } else if (isNumberTwentySomething()) {
        result += TWENTY_SOMETHING
    } else if (isNumberTenSomething()) {
        result += TEN_SOMETHING
    }
}

function isNumberRoundToTen() {
    return onePlaceDigit == 0
}

function isAboveThirty() {
    return tenPlaceDigit >= 3
}

function isNumberTwentySomething() {
    return tenPlaceDigit == 2
}

function isNumberTenSomething() {
    return tenPlaceDigit == 1
}

function addOnePlaceText(group) {
    if (isItLastDigitAndEqualToTwo(group)) {
        result += TWO
    } else if (isNumberNotOneThousandSomething(group)) {
        result += getOnePlaceTextFor(onePlaceDigit)
    }
}

function isItLastDigitAndEqualToTwo(group) {
    return group == TOTAL_NUMBER_OF_GROUPS - 1 && onePlaceDigit == 2
}

function isNumberNotOneThousandSomething(group) {
    return !(group == TOTAL_NUMBER_OF_GROUPS - 2 && onePlaceDigit == 1 && !hasPrefix())
}

function addThousandGroupName(group) {
    result += getThousandGroupNameFor(group)
}
