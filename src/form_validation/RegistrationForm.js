import nameValidator from './NameValidation'
import longrichCodeValidator from './LongrichCodeValidation'
import rankValidator from './RankValidator'

export default function newEntry (instance, field, value) {
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
    }
}
