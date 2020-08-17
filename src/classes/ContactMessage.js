// This class object is a model of the information collected from the contact form

/**
 * @author  Peter Collins
 * @author  /github.com/onepetercollins
 * @alias   ContactMessage
 */

export default class ContactMessage {
    constructor() {
        this._name = ''
        this._email = ''
        this._subject = ''
        this._message = ''
        this._date = ''
        this._typeof = 'contact-message'
        this._sn = 0
        this._id = ''
    }

    // getters
    getName() {
        return this._name
    }

    getEmail() {
        return this._email
    }

    getSubject() {
        return this._subject
    }

    getMessage() {
        return this._message
    }

    getDate() {
        return this._date
    }

    getSn() {
        return this._sn
    }

    // setters

    /**
     * @param {String} newName
     */
    setName(newName) {
        this._name = newName
    }

    /**
     * @param {String} newEmail
     */
    setEmail(newEmail) {
        this._email = newEmail
    }

    /**
     * @param {String} newSubject
     */
    setSubject(newSubject) {
        this._subject = newSubject
    }

    /**
     * @param {String} newMessage
     */
    setMessage(newMessage) {
        this._message = newMessage
    }

    /**
     * @param {String} newDate
     */
    setDate(newDate) {
        this._date = newDate
    }

    /**
     * @param {Number} newSn
     */
    setSn(newSn) {
        this._sn = newSn
    }
}