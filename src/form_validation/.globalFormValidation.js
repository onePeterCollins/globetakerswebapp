import countryValidator from './CountryValidation'
import nameValidator from './NameValidation'
import emailValidator from './EmailValidation'
import longrichCodeValidator from './LongrichCodeValidation'
import rankValidator from './RankValidation'
import subTeamValidator from './SubTeamValidation'
import messageValidator from './MessageValidation'


function newEntry (instance, field, value) {
    switch(field) {
        case 'name':
            instance.username = nameValidator(value, instance.usernameHint)
            instance.$User.setName(instance.username)
            break;

        case 'email':
            instance.email = emailValidator(value, instance.emailHint)
            instance.$User.setEmail(instance.email)
            break;

        case 'country':
            instance.country = countryValidator(value, instance.countryHint)
            instance.$User.setCountry(instance.country)
            break;

        case 'longrichCode':
            instance.longrichCode = longrichCodeValidator(value, instance.longrichCodeHint)
            instance.$User.setLongrichCode(instance.longrichCode)
            break;

        case 'subTeam':
            instance.subTeam = subTeamValidator(value, instance.subTeamHint)
            instance.$User.setSubTeam(instance.subTeam)
            break;

        case 'teamLeadsName':
            instance.teamLeadsName = nameValidator(value, instance.teamLeadsNameHint)
            instance.$User.setTeamLeadsName(instance.teamLeadsName)
            break;

        case 'teamLeadsRank':
            instance.teamLeadsRank = rankValidator(value, instance.teamLeadsRankHint)
            instance.$User.setTeamLeadsRank(instance.teamLeadsRank)
            break;

        case 'subject':
            instance.subject = subTeamValidator(value, instance.subjectHint)
            instance.contactMessage.setSubject(instance.subject)
            break;

        case 'message':
            instance.message = messageValidator(value, instance.messageHint)
            instance.contactMessage.setMessage(instance.message)
            break;
    }
}

function scanEntries (instance) {
    let error = false, errorMessages = [],

    fields = [
        {name: "'country'",   data: instance.country,   errorMessage: instance.errorMessages.country,   default: 'Country of resdence'},
        {name: "'email'",   data: instance.email,   errorMessage: instance.errorMessages.email,   default: 'youremail@domain.com max 30 characters'},
        {name: "'full name'",   data: instance.username,   errorMessage: instance.errorMessages.username,   default: 'Name and surname max 30 characters'},
        {name: "'Longrich code'",   data: instance.longrichCode,   errorMessage: instance.errorMessages.longrichCode,   default: 'Your Longrich code'},
        {name: "'sub-team name'",   data: instance.subTeam,   errorMessage: instance.errorMessages.subTeam,   default: 'The name of your sub-team'},
        {name: "'team leaders name'",   data: instance.teamLeadsName,   errorMessage: instance.errorMessages.teamLeadsName,   default: 'Fullname of your team leader'},
        {name: "'team leaders rank'",   data: instance.teamLeadsRank,   errorMessage: instance.errorMessages.teamLeadsRank,   default: 'Example: D5, D6, D7 ...'},
        {name: "'subject'",   data: instance.subject,   errorMessage: instance.errorMessages.subject,   default: 'Enter subject max 30 characters'},
        {name: "'message'",   data: instance.message,   errorMessage: instance.errorMessages.message,   default: 'Write your message max 200 characters'}
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
