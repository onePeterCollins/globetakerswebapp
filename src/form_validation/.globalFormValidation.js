import nameValidator from './NameValidation'
import longrichCodeValidator from './LongrichCodeValidation'
import rankValidator from './RankValidation'
import subTeamValidator from './SubTeamValidation'

function newEntry (instance, field, value) {
    switch(field) {
        case 'name':
            instance.username = nameValidator(value, instance.usernameHint)
            instance.$User.setName(instance.username)
            break;

        case 'longrichCode':
            instance.longrichCode = longrichCodeValidator(value, instance.longrichCodeHint)
            instance.$User.setLongrichCode(instance.longrichCode)
            break;

        case 'teamLeadsRank':
            instance.teamLeadsRank = rankValidator(value, instance.teamLeadsRankHint)
            instance.$User.setTeamLeadsRank(instance.teamLeadsRank)
            break;

        case 'teamLeadsName':
            instance.teamLeadsName = nameValidator(value, instance.teamLeadsNameHint)
            instance.$User.setTeamLeadsName(instance.teamLeadsName)
            break;

        case 'subTeam':
            instance.subTeam = subTeamValidator(value, instance.subTeamHint)
            instance.$User.setSubTeam(instance.subTeam)
            break;

        case 'verificationCode':
            instance.verificationCode === instance.generatedCode
            ? instance.verificationCodeHint()
            : instance.verificationCodeHint('Enter the correct code')
            break
    }
}

function scanEntries (instance) {
    let error = false, errorMessages = [],

    fields = [
        {name: "'full name'",   data: instance.username,   errorMessage: instance.errorMessages.username,   default: 'Name and surname max 30 characters'},
        {name: "'Longrich code'",   data: instance.longrichCode,   errorMessage: instance.errorMessages.longrichCode,   default: 'Your Longrich code'},
        {name: "'team leaders rank'",   data: instance.teamLeadsRank,   errorMessage: instance.errorMessages.teamLeadsRank,   default: 'Example: D5, D6, D7 ...'},
        {name: "'team leaders name'",   data: instance.teamLeadsName,   errorMessage: instance.errorMessages.teamLeadsName,   default: 'Fullname of your team leader'},
        {name: "'sub-team name'",   data: instance.subTeam,   errorMessage: instance.errorMessages.subTeam,   default: 'The name of your sub-team'},
        {name: "'verification code'",   data: instance.verificationCode,   errorMessage: instance.errorMessages.verificationCode,   default: 'Enter the code above'}
      ]

    for (let i in fields) {
        if (fields[i].errorMessage) {
            // check for empty fields
            if (fields[i].data === '') {
                error = true
                errorMessages.push(`${fields[i].name} field is empty`)
            }

            // check for error fields
            if (fields[i].errorMessage != fields[i].default) {
                if (!error) {
                    error = true
                    errorMessages.push(`${fields[i].name} field is invalid`)
                }
            }
        }
    }

    error ? instance.errorMessages.generalErrorMessage = errorMessages : instance.errorMessages.generalErrorMessage = null

    return error
}

export default {
    newEntry: newEntry,
    scanEntries: scanEntries
}
