import emoji from "node-emoji"

export default function rankValidator (rank, errorHandler) {
    let rankString = rank.split(''), error = false, validRank = '',  errorMessage

    rankString.forEach((item, index) => {
        //capitalize first letter of rank
        if (index === 0 && item.toUpperCase() !== item.toLowerCase()) {
            item = item.toUpperCase()
        }

        //if second character is an alphabet, capitialize it
        if (index === 1 && item.toUpperCase() !== item.toLowerCase()) {
            item = item.toUpperCase()
        }

        // warn if rank is less than 2 characters long
        if (index < 1) {
            error = true
            errorMessage = `${emoji.emojify(':warning:')} code must be at least 2 characters long`
        }

        // warn if the first character of the rank is not an alphabet
        if (index === 0 && item.toUpperCase() === item.toLowerCase()) {
            error = true
            errorMessage = `${emoji.emojify(':warning:')} invalid Longrich rank`
        }

        // warn if the second character of the rank is a symbol
        if (index >= 0 && item.toUpperCase() === item.toLowerCase()) {
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

        // delete white space
        if (item === ' ') {
            error = true
            errorMessage = `${emoji.emojify(':warning:')} no spaces allowed in team lead's rank`
        }

        // revert to original hint if no error is found
        if (index === 1 && errorMessage === `${emoji.emojify(':warning:')} code must be at least 2 characters long`) {
            error = false
        }

        validRank += item
    })

    error ? errorHandler(errorMessage) : errorHandler()

    return validRank
}