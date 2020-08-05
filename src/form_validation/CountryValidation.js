import emoji from "node-emoji"

export default function countryValidator (country, errorHandler) {
    let countryString = country.split(''), error = false, validCountry = '',  errorMessage

    countryString.forEach((item, index, array) => {
        // capitalize first letter of country
        if (index === 0 && item.toUpperCase() !== item.toLowerCase()) {
            item = item.toUpperCase()
        }

        // country name can not begin with a hyphen
        if (index === 0 && item === '-') {
            error = true
            errorMessage = `${emoji.emojify(':worried:')} Country name can not begin with a hyphen`
        }

        // country name can not begin with white space
        if (index === 0 && item === ' ') {
            item = ''
        }

        // delete double white space
        if (item === ' ' && array[index - 1] === ' ') {
            item = ''
        }

        // warn user when country name contains numbers or symbols
        if (item !== '-' && item !== ' ' && item !== '' && item.toUpperCase() === item.toLowerCase()) {
            error = true
            errorMessage = `${emoji.emojify(':worried:')} Country name can not contain numbers or symbols`
        }

        // after every space, capitalize the next character
        if (array[index - 1] === ' ' && item.toUpperCase() !== item.toLowerCase()) {
            item = item.toUpperCase()
        }

        // all letters except initials must be in lowercase
        if (item.toUpperCase() !== item.toLowerCase() && index !== 0 && array[index - 1] !== ' ') {
            item = item.toLowerCase()
        }

        // remove white space before a hyphen
        if (item === ' ' && array[index + 1] === '-') {
            item = ''
        }

        // remove white space after a hyphen
        if (item === ' ' && array[index - 1] === '-') {
            item = ''
        }

        // capitalize first character after a hyphen
        if (item.toUpperCase() !== item.toLowerCase() && array[index - 1] === '-') {
            item = item.toUpperCase()
        }

        // capitalize first character after a fullstop
        if (item.toUpperCase() !== item.toLowerCase() && array[index - 1] === '.') {
            item = item.toUpperCase()
        }

        // limit name to 30 characters
        if (index >= 30) {
            error = true
            errorMessage = `${emoji.emojify(':worried:')} Country name must not exceed 30 characters`
        }

        // revert to original hint if no error
        if (item.toUpperCase() !== item.toLowerCase()) {
            error = false
        }

        validCountry += item
    })

    error ? errorHandler(errorMessage) : errorHandler()

    return validCountry
}
