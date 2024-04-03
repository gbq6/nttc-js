const NUMBERS = ['', 'egy', 'két', 'három', 'négy', 'öt', 'hat', 'hét', 'nyolc', 'kilenc']

const PRODUCTS_OF_TEN = ['', 'tíz', 'húsz', 'harminc', 'negyven', 'ötven', 'hatvan', 'hetven', 'nyolcvan', 'kilencven']

const POWERS_OF_TEN = [
    'szexdecilliárd', 'szexdecillió', 'kvintdecilliárd', 'kvintdecillió', 'kvadecilliárd', 'kvadecillió', 'tridecilliárd',
    'tridecillió', 'bidecilliárd', 'bidecillió', 'undecilliárd', 'undecillió', 'decilliárd', 'decillió', 'nonilliárd', 'nonillió',
    'oktilliárd', 'oktillió', 'szeptilliárd', 'szeptillió', 'szextilliárd', 'szextillió', 'kvintilliárd', 'kvintillió',
    'kvadrilliárd', 'kvadrillió', 'trilliárd', 'trillió', 'billiárd', 'billió', 'milliárd', 'millió', 'ezer', ''
]

export const ZERO = 'nulla'
export const TWO = 'kettő'
export const TEN_SOMETHING = 'tizen'
export const TWENTY_SOMETHING = 'huszon'
export const HUNDRED = 'száz'

export const THOUSAND_GROUP_SEPARATOR = '-'
export const DIGITS_IN_GROUP = 3
export const TOTAL_NUMBER_OF_GROUPS = POWERS_OF_TEN.length
export const MOST_POSSIBLE_DIGITS = DIGITS_IN_GROUP * TOTAL_NUMBER_OF_GROUPS

export function getHundredPlaceTextFor(digit) {
    return NUMBERS[digit]
}

export function getTenPlaceTextFor(digit) {
    return PRODUCTS_OF_TEN[digit]
}

export function getOnePlaceTextFor(digit) {
    return NUMBERS[digit]
}

export function getThousandGroupNameFor(groupNumber) {
    return POWERS_OF_TEN[groupNumber]
}
