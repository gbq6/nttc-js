const validate = require('./validator')
const getHundredPlaceTextFor = require('./numberText').getHundredPlaceTextFor
const getTenPlaceTextFor = require('./numberText').getTenPlaceTextFor
const getOnePlaceTextFor = require('./numberText').getOnePlaceTextFor
const getThousandGroupNameFor = require('./numberText').getThousandGroupNameFor

const TOTAL_NUMBER_OF_GROUPS = require('./numberText').TOTAL_NUMBER_OF_GROUPS
const MOST_POSSIBLE_DIGITS = require('./numberText').MOST_POSSIBLE_DIGITS
const DIGITS_IN_GROUP = require('./numberText').DIGITS_IN_GROUP

const ZERO = "nulla"
const TWO = "kettő"
const TEN_SOMETHING = "tizen"
const TWENTY_SOMETHING = "huszon"
const HUNDRED = "száz"

const THOUSAND_GROUP_SEPARATOR = "-"

var isMoreThanTwoThousand
var number
var result

var groups
var hundredPlaceDigit
var tenPlaceDigit
var onePlaceDigit

function convert(number) {
    prepareConversion(number)
    return convertNumber()
}

function prepareConversion(numberToConvert) {
    number = validate(numberToConvert)
    result = ''
    groups = Array(TOTAL_NUMBER_OF_GROUPS)
}

function convertNumber() {
    if (isNumberZero()) {
        result += ZERO
    } else {
        checkIfNumberIsMoreThanTwoThousand()
        splitNumberToThousandGroups()
        convertGroups()
    }
    return result
}

function isNumberZero() {
    return number == "0"
}

function checkIfNumberIsMoreThanTwoThousand() {
    if (number.length > 4 || parseInt(number) > 2000) {
        isMoreThanTwoThousand = true
    }
}

function splitNumberToThousandGroups() {
    let numberOfLeadingZeroesNeeded = MOST_POSSIBLE_DIGITS - number.length
    fillNumberWithLeadingZeroes(numberOfLeadingZeroesNeeded)
    for (let group = 0; group < MOST_POSSIBLE_DIGITS; group += DIGITS_IN_GROUP) {
        setGroupValueOf(group)
    }
}

function fillNumberWithLeadingZeroes(numberOfLeadingZeroesNeeded) {
    number = "0".repeat(numberOfLeadingZeroesNeeded) + number
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

module.exports = convert
