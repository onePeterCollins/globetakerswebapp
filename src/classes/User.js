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
        this._upline = {teamLeadsRank: '', teamLeadsName: '', subTeam: ''}
        this._email = ''
        this._country = ''
        this._verified = false
        this._isOnline = false
        this._loginHistory = []
        this._notifications = []
        this._seenNotifications = 0
        this._questions = []
        this._userTypes = ['student', 'tutor']
        this._typeIndex = 0
        this._lectures = {audio: [], text: [], video: []}
        this._violations = []
        this._dateOfBirth = ''
        this._registrationDate = ''
        this._complaints = []
        this._profileUploaded = false
        this._blocked = false
        this._disabled = false
        this._typeof = 'user'
        this._persist = false
        this._id = ''
        this._activeStatus = ''
    }

    // getters
    getName () {
        return this._name
    }

    getFirstName() {
        let firstName = '', noSpace = true

        this._name.split('').forEach((item) => {
            if (item.toUpperCase() !== item.toLowerCase() && noSpace) {
                firstName += item
            }

            if (item === ' ') {
                noSpace = false
            }
        })

        return firstName
    }

    getLongrichCode () {
        return this._longrichCode
    }

    // upline
    getUpline () {
        return this._upline
    }

    getTeamLeadsRank () {
        return this._upline.teamLeadsRank
    }

    getTeamLeadsName () {
        return this._upline.teamLeadsName
    }

    getSubTeam () {
        return this._upline.subTeam
    }

    getEmail () {
        return this._email
    }

    getCountry () {
        return this._country
    }

    verified () {
        return this._verified
    }

    getOnlineStatus () {
        return this._isOnline
    }

    getLoginHistory () {
        return this._loginHistory
    }

    getNotifications () {
        return this._notifications
    }

    getQuestions () {
        return this._questions
    }

    getUserType () {
        return this._userTypes[this._typeIndex]
    }

    getLectures () {
        let lectures = null

        if (this.getUserType === 'tutor') {
            lectures = this._lectures
        }

        return lectures
    }

    getViolations () {
        return this._violations
    }

    getDateOfBirth () {
        return this._dateOfBirth
    }

    getRegistrationDate () {
        return this._registrationDate
    }

    getComplaints () {
        return this._complaints
    }

    getProfile () {
        return this._profileUploaded
    }

    blocked () {
        return this._blocked
    }

    disabled () {
        return this._disabled
    }

    // setters

    /**
     * @param {String} newName
     */
    setName (newName) {
        this._name = newName
    }

    /**
     * @param {String} newCode
     */
    setLongrichCode (newCode) {
        this._longrichCode = newCode
    }

    /**
     * @param {String} newRank
     */
    setTeamLeadsRank (newRank) {
        this._upline.teamLeadsRank = newRank
    }

    /**
     * @param {String} newName
     */
    setTeamLeadsName (newName) {
        this._upline.teamLeadsName = newName
    }

    /**
     * @param {String} newTeamName
     */
    setSubTeam (newTeamName) {
        this._upline.subTeam = newTeamName
    }

    /**
     * @param {String} newEmail
     */
    setEmail (newEmail) {
        this._email = newEmail
    }

    /**
     * @param {String} newCountry
     */
    setCountry (newCountry) {
        this._country = newCountry
    }

    /**
     * @param {String} newStatus
     */
    setVerificationStatus (newStatus) {
        this._verified = newStatus
    }

    /**
     * @param {String} newStatus
     */
    setOnlineStatus (newStatus) {
        this._isOnline = newStatus
    }

    /**
     * @param {String} newHistory
     */
    addLoginHistory (newHistory) {
        this._loginHistory.push(newHistory)
    }

    /**
     * @param {String} newNotificationTitle
     */
    addSeenNotification (newNotificationTitle) {
        this._notifications.push(newNotificationTitle)
        this._seenNotifications += 1
    }

    /**
     * @param {String} newQuestion
     */
    addQuestion (newQuestion) {
        this._questions.push(newQuestion)
    }

    /**
     * @param {String} index
     */
    setUserType (index) {
        this._typeIndex = index
    }

    /**
     * @param {String} lecture
     */
    addLecture (lecture) {
        switch(lecture.format) {
            case 'audio':
                this._lectures.audio.push(lecture.title)
                break;

            case 'text':
                this._lectures.text.push(lecture.title)
                break;

            case 'video':
                this._lectures.video.push(lecture.title)
                break;
        }
    }

    /**
     * @param {String} newViolation
     */
    addViolation (newViolation) {
        this._violations.push(newViolation)
    }

    /**
     * @param {String} newDate
     */
    setDateOfBirth (newDate) {
        this._dateOfBirth = newDate
    }
   
    /**
     * @param {String} newDate
     */
    setRegistrationDate (newDate) {
        this._registrationDate = newDate
    }

    /**
     * @param {String} newComplaint
     */
    addComplaint (newComplaint) {
        this._complaints.push(newComplaint)
    }

    /**
     * @param {String} status
     */
    setProfile (status) {
        this._profileUploaded = status
    }

    block () {
        this._blocked = true
    }

    unblock () {
        this._blocked = false
    }

    disable () {
        this._disabled = true
    }

    enable () {
        this._disabled = false
    }

    /**
     * @param {String} status
     */
    setPersistence (status) {
        this._persist = status
    }

    /**
     * @param {String} newId
     */
    setId (newId) {
        this._id = newId
    }

    /**
     * @param {String} newActiveStatus
     */
    setActiveStatus (newActiveStatus) {
        this._activeStatus = newActiveStatus
    }
}
