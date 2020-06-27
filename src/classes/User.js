// This class object specifies all the details of the different kinds of users on the platform

/**
 * @author  Peter Collins
 * @author  /github.com/onepetercollins
 * @alias   User
 */

export default class User {
    constructor() {
        this._name = ''
        this._longrichCode = ''
        this._groupName = ''
        this._email = ''
        this._verified = false
        this._isOnline = false
        this._loginHistory = []
        this._notifications = []
        this._seenNotifications = 0
        this._questions = []
        this._userTypes = ['student', 'tutor']
        this._typeIndex = 0
        this._violations = []
        this._dateOfBirth = ''
        this._dateOfRegistration = ''
        this._complaints = []
    }

    // getters
    getName () {
        return this._name
    }

    get getLongrichCode () {
        return this._longrichCode
    }

    get getGroupName () {
        return this._groupName
    }

    get getEmail () {
        return this._email
    }

    get getVerificationStatus () {
        return this._verified
    }

    get getOnlineStatus () {
        return this._isOnline
    }

    get getLoginHistory () {
        return this._loginHistory
    }

    get getNotifications () {
        return this._notifications
    }

    get getQuestions () {
        return this._questions
    }

    get getUserType () {
        return this._userTypes[this._typeIndex]
    }

    get getViolations () {
        return this._violations
    }

    get getDateOfBirth () {
        return this._dateOfBirth
    }

    get getDateOfRegistration () {
        return this._dateOfRegistration
    }

    get getComplaints () {
        return this._complaints
    }

    // setters

    /**
     * @param {String} /newName
     */
    setName (newName) {
        function action (obj, newName) {
            obj._name = newName
        }

        return action(this, newName)
    }

    /**
     * @param {String} newCode
     */
    set setLongrichCode (newCode) {
        this._longrichCode = newCode
    }

    /**
     * @param {String} newGroupName
     */
    set setGroupName (newGroupName) {
        this._groupName = newGroupName
    }

    /**
     * @param {String} newEmail
     */
    set setEmail (newEmail) {
        this._email = newEmail
    }

    /**
     * @param {String} newStatus
     */
    set setVerificationStatus (newStatus) {
        this._verified = newStatus
    }

    /**
     * @param {String} newStatus
     */
    set setOnlineStatus (newStatus) {
        this._isOnline = newStatus
    }

    /**
     * @param {String} newHistory
     */
    set addLoginHistory (newHistory) {
        this._loginHistory.push(newHistory)
    }

    /**
     * @param {String} newNotificationTitle
     */
    set addSeenNotification (newNotificationTitle) {
        this._notifications.push(newNotificationTitle)
        this._seenNotifications += 1
    }

    /**
     * @param {String} newQuestion
     */
    set addQuestion (newQuestion) {
        this._questions.push(newQuestion)
    }

    /**
     * @param {String} index
     */
    set setUserType (index) {
        this._typeIndex = index
    }

    /**
     * @param {String} newViolation
     */
    set addViolation (newViolation) {
        this._violations.push(newViolation)
    }

    /**
     * @param {String} newDate
     */
    set setDateOfBirth (newDate) {
        this._dateOfBirth = newDate
    }
   
    /**
     * @param {String} newDate
     */
    set setDateOfRegistration (newDate) {
        this._dateOfRegistration = newDate
    }

    /**
     * @param {String} newComplaint
     */
    set addComplaint (newComplaint) {
        this._complaints.push(newComplaint)
    }
}
