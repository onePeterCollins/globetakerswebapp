// This class object specifies all the details of the different kinds of users on the platform

/**
 * @author  Peter Collins
 * @author  /github.com/onepetercollins
 * @alias   User
 */

export default class Notification {
    constructor() {
        this._title = ''
        this._subHead = ''
        this._date = ''
        this._sender = ''
        this._audienceClass = ['students', 'tutors', 'general']
        this._audienceIndex = 2
        this._content = []
        this._views = 0
        this._typeof = 'notification'
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

    getContent() {
        return this._content
    }
    
    getViews() {
        return this._views
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
}