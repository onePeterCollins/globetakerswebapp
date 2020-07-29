import emoji from "node-emoji"

export default function emailValidator (name, errorHandler) {
    let nameString = name.split(''), error = false, validName = '', whiteSpace = 0,  errorMessage

    nameString.forEach((item, index, array) => {
        // capitalize first letter of name
        if (index === 0 && item.toUpperCase() !== item.toLowerCase()) {
            item = item.toUpperCase()
        }

        // request for name and surname
        if (whiteSpace === 0) {
            error = true
            errorMessage = `${emoji.emojify(':warning:')} Enter name and surname max 30 characters`
        }

        // name can not begin with a hyphen
        if (index === 0 && item === '-') {
            error = true
            errorMessage = `${emoji.emojify(':worried:')} Name can not begin with a hyphen`
        }

        // name can not begin with white space
        if (index === 0 && item === ' ') {
            item = ''
        }

        // delete double white space
        if (item === ' ' && array[index - 1] === ' ') {
            item = ''
        }

        // warn user when name contains numbers or symbols
        if (item !== '-' && item !== ' ' && item !== '' && item.toUpperCase() === item.toLowerCase()) {
            error = true
            errorMessage = `${emoji.emojify(':worried:')} Name can not contain numbers or symbols`
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

        // limit name to 30 characters
        if (index >= 30) {
            error = true
            errorMessage = `${emoji.emojify(':worried:')} Name must not exceed 30 characters`
        }

        // count the number of white spaces in the name string
        if (item === ' ') {
            whiteSpace += 1
        }

        // revert to original hint if name and surname detected
        if (item.toUpperCase() !== item.toLowerCase() && whiteSpace > 0) {
            error = false
        }

        validName += item
    })

    error ? errorHandler(errorMessage) : errorHandler()

    return validName
}