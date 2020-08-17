// This class object specifies all the details and content of notifications on the platform

/**
 * @author  Peter Collins
 * @author  /github.com/onepetercollins
 * @alias   Notification
 */

export default class Notification {
    constructor() {
        this._title = ''
        this._subHead = ''
        this._date = ''
        this._sender = ''
        this._audienceClass = ['students', 'tutors', 'general']
        this._audienceIndex = 2
        this._audienceTeam = ''
        this._content = []
        this._views = 0
        this._typeof = 'notification'
        this._sn = 0
        this._id = ''
    }

    // getters
    getTitle() {
        return this._title
    }

    getSubHead() {
        return this._subHead
    }

    getDate() {
        return this._date
    }

    getSender() {
        return this._sender
    }

    getAudience() {
        return this._audienceClass[this._audienceIndex]
    }

    getAudienceTeam() {
        return this._audienceTeam
    }

    getContent() {
        return this._content
    }
    
    getViews() {
        return this._views
    }

    getSn() {
        return this._sn
    }

    // setters

    /**
     * @param {String} newTitle
     */
    setTitle(newTitle) {
        this._title = newTitle
    }

    /**
     * @param {String} newSubHead
     */
    setSubHead(newSubHead) {
        this._subHead = newSubHead
    }

    /**
     * @param {String} newDate
     */
    setDate(newDate) {
        this._date = newDate
    }

    /**
     * @param {String} newSender
     */
    setSender(newSender) {
        this._sender = newSender
    }

    /**
     * @param {Number} index
     */
    setAudienceIndex(index) {
        this._audienceIndex = index
    }

    /**
     * @param {String} newTeam
     */
    setAudienceTeam(newTeam) {
        this._audienceTeam = newTeam
    }

    /**
     * @param {String} newContent
     */
    setContent(newContent) {
        this._content = newContent
    }

    /**
     * @param {Number}
     */
    addView() {
        this._views += 1
    }

    /**
     * @param {Number} newSn
     */
    setSn(newSn) {
        this._sn = newSn
    }
}