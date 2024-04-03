import {convert} from './converter.js'
import {MOST_POSSIBLE_DIGITS} from './numberText.js'
import {NumberFormatError, NumberLengthError} from "./validator.js";

const LONGEST_VALID_NUMBER = '9'.repeat(MOST_POSSIBLE_DIGITS)
const TOO_LONG_VALID_NUMBER = '000' + '9'.repeat(MOST_POSSIBLE_DIGITS)
const TOO_LONG_NUMBER = '9'.repeat(MOST_POSSIBLE_DIGITS + 1)

const TEST_CASES = [
    { input: '0', expected: 'nulla' },
    { input: '2', expected: 'kettő' },
    { input: '10', expected: 'tíz' },
    { input: '11', expected: 'tizenegy' },
    { input: '20', expected: 'húsz' },
    { input: '21', expected: 'huszonegy' },
    { input: '000', expected: 'nulla' },
    { input: '100', expected: 'száz' },
    { input: '202', expected: 'kétszázkettő' },
    { input: '222', expected: 'kétszázhuszonkettő' },
    { input: '1000', expected: 'ezer' },
    { input: '1100', expected: 'ezerszáz' },
    { input: '2000', expected: 'kétezer' },
    { input: '2021', expected: 'kétezer-huszonegy' },
    { input: '3100', expected: 'háromezer-száz' },
    { input: '11000', expected: 'tizenegyezer' },
    { input: '222001', expected: 'kétszázhuszonkétezer-egy' },
    { input: '0001234', expected: 'ezerkétszázharmincnégy' },
    { input: '0002234', expected: 'kétezer-kétszázharmincnégy' },
    { input: '1111111', expected: 'egymillió-száztizenegyezer-száztizenegy' },
    { input: '2222222', expected: 'kétmillió-kétszázhuszonkétezer-kétszázhuszonkettő' },
    { input: '111111111', expected: 'száztizenegymillió-száztizenegyezer-száztizenegy' },
    { input: '1111111111', expected: 'egymilliárd-száztizenegymillió-száztizenegyezer-száztizenegy' },
    { input: '1900000711', expected: 'egymilliárd-kilencszázmillió-hétszáztizenegy' },
    { input: '9223372036854775807', expected:
            'kilenctrillió-kétszázhuszonhárombilliárd-háromszázhetvenkétbillió-' +
            'harminchatmilliárd-nyolcszázötvennégymillió-hétszázhetvenötezer-nyolcszázhét' },
    { input: '999999999999999999999999999999999999999999999999999999999999999999999999999', expected:
            'kilencszázkilencvenkilencbidecillió-kilencszázkilencvenkilencundecilliárd-' +
            'kilencszázkilencvenkilencundecillió-kilencszázkilencvenkilencdecilliárd-' +
            'kilencszázkilencvenkilencdecillió-kilencszázkilencvenkilencnonilliárd-' +
            'kilencszázkilencvenkilencnonillió-kilencszázkilencvenkilencoktilliárd-' +
            'kilencszázkilencvenkilencoktillió-kilencszázkilencvenkilencszeptilliárd-' +
            'kilencszázkilencvenkilencszeptillió-kilencszázkilencvenkilencszextilliárd-' +
            'kilencszázkilencvenkilencszextillió-kilencszázkilencvenkilenckvintilliárd-' +
            'kilencszázkilencvenkilenckvintillió-kilencszázkilencvenkilenckvadrilliárd-' +
            'kilencszázkilencvenkilenckvadrillió-kilencszázkilencvenkilenctrilliárd-' +
            'kilencszázkilencvenkilenctrillió-kilencszázkilencvenkilencbilliárd-' +
            'kilencszázkilencvenkilencbillió-kilencszázkilencvenkilencmilliárd-' +
            'kilencszázkilencvenkilencmillió-kilencszázkilencvenkilencezer-kilencszázkilencvenkilenc' },
    { input: LONGEST_VALID_NUMBER, expected:
            'kilencszázkilencvenkilencszexdecilliárd-kilencszázkilencvenkilencszexdecillió-' +
            'kilencszázkilencvenkilenckvintdecilliárd-kilencszázkilencvenkilenckvintdecillió-' +
		    'kilencszázkilencvenkilenckvadecilliárd-kilencszázkilencvenkilenckvadecillió-' +
	        'kilencszázkilencvenkilenctridecilliárd-kilencszázkilencvenkilenctridecillió-' +
	        'kilencszázkilencvenkilencbidecilliárd-kilencszázkilencvenkilencbidecillió-' +
	        'kilencszázkilencvenkilencundecilliárd-kilencszázkilencvenkilencundecillió-' +
	        'kilencszázkilencvenkilencdecilliárd-kilencszázkilencvenkilencdecillió-' +
	        'kilencszázkilencvenkilencnonilliárd-kilencszázkilencvenkilencnonillió-' +
	        'kilencszázkilencvenkilencoktilliárd-kilencszázkilencvenkilencoktillió-' +
	        'kilencszázkilencvenkilencszeptilliárd-kilencszázkilencvenkilencszeptillió-' +
	        'kilencszázkilencvenkilencszextilliárd-kilencszázkilencvenkilencszextillió-' +
	        'kilencszázkilencvenkilenckvintilliárd-kilencszázkilencvenkilenckvintillió-' +
	        'kilencszázkilencvenkilenckvadrilliárd-kilencszázkilencvenkilenckvadrillió-' +
	        'kilencszázkilencvenkilenctrilliárd-kilencszázkilencvenkilenctrillió-' +
	        'kilencszázkilencvenkilencbilliárd-kilencszázkilencvenkilencbillió-' +
	        'kilencszázkilencvenkilencmilliárd-kilencszázkilencvenkilencmillió-' +
			'kilencszázkilencvenkilencezer-kilencszázkilencvenkilenc' },
    { input: TOO_LONG_VALID_NUMBER, expected:
            'kilencszázkilencvenkilencszexdecilliárd-kilencszázkilencvenkilencszexdecillió-' +
			'kilencszázkilencvenkilenckvintdecilliárd-kilencszázkilencvenkilenckvintdecillió-' +
			'kilencszázkilencvenkilenckvadecilliárd-kilencszázkilencvenkilenckvadecillió-' +
			'kilencszázkilencvenkilenctridecilliárd-kilencszázkilencvenkilenctridecillió-' +
			'kilencszázkilencvenkilencbidecilliárd-kilencszázkilencvenkilencbidecillió-' +
			'kilencszázkilencvenkilencundecilliárd-kilencszázkilencvenkilencundecillió-' +
			'kilencszázkilencvenkilencdecilliárd-kilencszázkilencvenkilencdecillió-' +
			'kilencszázkilencvenkilencnonilliárd-kilencszázkilencvenkilencnonillió-' +
			'kilencszázkilencvenkilencoktilliárd-kilencszázkilencvenkilencoktillió-' +
			'kilencszázkilencvenkilencszeptilliárd-kilencszázkilencvenkilencszeptillió-' +
			'kilencszázkilencvenkilencszextilliárd-kilencszázkilencvenkilencszextillió-' +
			'kilencszázkilencvenkilenckvintilliárd-kilencszázkilencvenkilenckvintillió-' +
			'kilencszázkilencvenkilenckvadrilliárd-kilencszázkilencvenkilenckvadrillió-' +
			'kilencszázkilencvenkilenctrilliárd-kilencszázkilencvenkilenctrillió-' +
			'kilencszázkilencvenkilencbilliárd-kilencszázkilencvenkilencbillió-' +
			'kilencszázkilencvenkilencmilliárd-kilencszázkilencvenkilencmillió-' +
			'kilencszázkilencvenkilencezer-kilencszázkilencvenkilenc' }
]

const WRONG_FORMAT_CASES = [
    '',
    'a',
    '-1',
    null,
    '0.1',
    '0,1',
    '123a',
]

function runTests() {
    console.log()
    let failures = testConversion() + testNumberFormatValidation() + testNumberLengthValidation()
    if (failures === 0) {
        console.log(`All tests passed\n`)
    } else {
        console.error(`There are ${failures} test failures\n`)
    }
}

function testConversion() {
    let failures = 0
    TEST_CASES.forEach(testCase => {
        try {
            const result = convert(testCase.input)
            if (result !== testCase.expected) {
                console.error(`Input:    ${testCase.input}\nExpected: ${testCase.expected}\nActual:   ${result}\n`)
                failures++
            }
        } catch (error) {
            console.error(`Input: ${testCase.input}\n${error}\n`)
            failures++
        }
    });
    return failures
}

function testNumberFormatValidation() {
    let failures = 0
    WRONG_FORMAT_CASES.forEach(testCase => {
        failures += assertError(testCase, NumberFormatError)
    });
    return failures
}

function testNumberLengthValidation() {
    return assertError(TOO_LONG_NUMBER, NumberLengthError)
}

function assertError(input, expected) {
    try {
        let result = convert(input)
        console.error(`Input:    ${input}\nExpected: ${expected.name}\nActual:   ${result}\n`)
        return 1
    } catch (error) {
        let pass = error instanceof expected
        if (!pass) {
            console.error(`Input:    ${input}\nExpected: ${expected.name}\nActual:   ${error.name}\n`)
        }
        return pass ? 0 : 1
    }
}

runTests()
