import emoji from "node-emoji"

export default function emailValidator (email, errorHandler) {
    let emailString = email.split(''), error = false, validEmail = '', whiteSpace = 0, atCounter = 0, dotCounter = 0,  errorMessage

    emailString.forEach((item, index, array) => {
        // all letters must be in lowercase
        if (item.toUpperCase() !== item.toLowerCase()) {
            item = item.toLowerCase()
        }

        // limit email to 8 characters minimum
        if (index < 6) {
            error = true
            errorMessage = `${emoji.emojify(':worried:')} Email must be at least 7 characters long`
        }

        // scan for multiple '@'
        if (item === '@') {
            atCounter += 1
        }

        // scan for '@'
        if (atCounter === 0) {
            error = true
            errorMessage = `${emoji.emojify(':warning:')} Enter your email @domain.com`
        }

        // scan for multiple '.'
        if (item === '.') {
            dotCounter += 1
        }

        // scan for '.'
        if (dotCounter === 0) {
            error = true
            errorMessage = `${emoji.emojify(':warning:')} Enter your email @domain.com`
        }

        // email can not begin with a special character
        if (index === 0 && item.toUpperCase() === item.toLowerCase()) {
            let isNumber

            for (let i=0; i<10; i++) {
                if (parseInt(item) === i) {
                    isNumber = true
                }
            }

            if (!isNumber) {
                error = true
                errorMessage = `${emoji.emojify(':worried:')} Email can not begin with a special character`
            }
        }

        // email can not have 2 consecutive special characters
        if (index > 0 && item.toUpperCase() === item.toLowerCase() && array[index - 1].toUpperCase() ===  array[index - 1].toLowerCase()) {
            let isNumber

            for (let i=0; i<10; i++) {
                if (parseInt(item) === i) {
                    isNumber = true
                }
            }

            for (let i=0; i<10; i++) {
                if (parseInt(array[index - 1]) === i) {
                    isNumber = true
                }
            }

            if (!isNumber) {
                error = true
                errorMessage = `${emoji.emojify(':worried:')} Email can not have consecutive special characters`
            }
        }

        // limit email to 50 characters maximum
        if (index >= 50) {
            error = true
            errorMessage = `${emoji.emojify(':worried:')} Email must not exceed 50 characters`
        }

        // count the number of white spaces in the email string
        if (item === ' ') {
            whiteSpace += 1
        }

        // warn if whitespace exists in email string
        if (whiteSpace > 0) {
            error = true
            errorMessage = `${emoji.emojify(':warning:')} spaces are not allowed in email`
        }

        // revert to original hint if name and surname detected
        if (index >= 6 && whiteSpace === 0) {
            error = false
        }

        validEmail += item
    })

    error ? errorHandler(errorMessage) : errorHandler()

    return validEmail
}