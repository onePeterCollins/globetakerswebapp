import emoji from "node-emoji"

export default function longrichCodeValidator (code, errorHandler) {
    let codeString = code.split(''), error = false, validCode = '',  errorMessage

    codeString.forEach((item, index, array) => {
        // first 2 letters of the code are in uppercase
        if (index <= 1 && item.toUpperCase() !== item.toLowerCase()) {
            item = item.toUpperCase()
        }

        // warn if code is less than 10 characters long
        if (index < 9) {
            error = true
            errorMessage = `${emoji.emojify(':warning:')} code must be 10 characters long`
        }

        // warn if the first 2 characters of the code are not alphabets
        if (index <= 1 && item.toUpperCase() === item.toLowerCase()) {
            error = true
            errorMessage = `${emoji.emojify(':warning:')} invalid Longrich code`
        }

        // warn if symbol is found in last 8 characters of code
        if (index > 1 && item.toUpperCase() === item.toLowerCase()) {
            let isNumber

            for (let i=0; i<10; i++) {
                if (parseInt(item) === i) {
                    isNumber = true
                }
            }

            if (!isNumber) {
                error = true
                errorMessage = `${emoji.emojify(':warning:')} invalid character in Longrich code`
            }
        }

        // warn if alphabet is found in last 8 characters of code
        if (index > 1 && item.toUpperCase() !== item.toLowerCase()) {
            error = true
            errorMessage = `${emoji.emojify(':warning:')} invalid Longrich code`
        }

        // warn if first 2 characters of code are not alphabets
        if (array[0] && array[1]) {
            for (let i=0; i<2; i++) {
                if (array[i].toUpperCase() === array[i].toLowerCase()) {
                    error = true
                    errorMessage = `${emoji.emojify(':warning:')} invalid Longrich code`
                }
            }
        }

        // warn if code exceeds 10 characters
        if (index > 9) {
            error = true
            errorMessage = `${emoji.emojify(':warning:')} invalid Longrich code`
        }

        // warn if white space is found
        if (item === ' ') {
            error = true
            errorMessage = `${emoji.emojify(':warning:')} no spaces allowed in Longrich code`
        }

        // revert to original hint if no error is found
        if (index === 9 && errorMessage === `${emoji.emojify(':warning:')} code must be 10 characters long`) {
            error = false
        }

        validCode += item
    });

    error ? errorHandler(errorMessage) : errorHandler()

    return validCode
}
