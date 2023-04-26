const NUMBERS = ["", "egy", "két", "három", "négy", "öt", "hat", "hét", "nyolc", "kilenc"]

const PRODUCTS_OF_TEN = ["", "tíz", "húsz", "harminc", "negyven", "ötven", "hatvan", "hetven", "nyolcvan", "kilencven"]

const POWERS_OF_TEN = [
    "szexdecilliárd", "szexdecillió", "kvintdecilliárd", "kvintdecillió", "kvadecilliárd", "kvadecillió", "tridecilliárd",
    "tridecillió", "bidecilliárd", "bidecillió", "undecilliárd", "undecillió", "decilliárd", "decillió", "nonilliárd", "nonillió",
    "oktilliárd", "oktillió", "szeptilliárd", "szeptillió", "szextilliárd", "szextillió", "kvintilliárd", "kvintillió",
    "kvadrilliárd", "kvadrillió", "trilliárd", "trillió", "billiárd", "billió", "milliárd", "millió", "ezer", ""
]

const TOTAL_NUMBER_OF_GROUPS = POWERS_OF_TEN.length
const DIGITS_IN_GROUP = 3
const MOST_POSSIBLE_DIGITS = TOTAL_NUMBER_OF_GROUPS * DIGITS_IN_GROUP

function getHundredPlaceTextFor(digit) {
    return NUMBERS[digit];
}

function getTenPlaceTextFor(digit) {
    return PRODUCTS_OF_TEN[digit]
}

function getOnePlaceTextFor(digit) {
    return NUMBERS[digit]
}

function getThousandGroupNameFor(groupNumber) {
    return POWERS_OF_TEN[groupNumber]
}

module.exports = {
    DIGITS_IN_GROUP,
    MOST_POSSIBLE_DIGITS,
    TOTAL_NUMBER_OF_GROUPS,
    getHundredPlaceTextFor,
    getTenPlaceTextFor,
    getOnePlaceTextFor,
    getThousandGroupNameFor
}
