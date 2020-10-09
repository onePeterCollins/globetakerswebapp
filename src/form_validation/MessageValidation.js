import emoji from "node-emoji"

export default function messageValidator (message, errorHandler) {
    let messageString = message.split(''), error = false, validMessage = '',  errorMessage

    messageString.forEach((item, index, array) => {
        // capitalize first letter of message
        if (index === 0 && item.toUpperCase() !== item.toLowerCase()) {
            item = item.toUpperCase()
        }

        // message can not begin with a hyphen
        if (index === 0 && item === '-') {
            error = true
            errorMessage = `${emoji.emojify(':worried:')} Message can not begin with a hyphen`
        }


        // message can not begin with white space
        if (index === 0 && item === ' ') {
            item = ''
        }

        // delete double white space
        if (item === ' ' && array[index - 1] === ' ') {
            item = ''
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

        // limit message to 200 characters
        if (index >= 200) {
            error = true
            errorMessage = `${emoji.emojify(':worried:')} Message must not exceed 200 characters`
        }

        validMessage += item
    })

    error ? errorHandler(errorMessage) : errorHandler()

    return validMessage
}
