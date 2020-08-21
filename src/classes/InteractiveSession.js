// This class object specifies all the details and content of notifications on the platform

/**
 * @author  Peter Collins
 * @author  /github.com/onepetercollins
 * @alias   InteractiveSession
 */

export default class InteractiveSession {
    constructor() {
        this._title = ''
        this._url = ''
        this._host = ''
        this._conversation = []
        this._participants = []
        this._active = false
        this._date = ''
        this._id = ''
    }

    // getters
    getTitle() {
        return this._title
    }

    getURL() {
        return this._url
    }

    getHost() {
        return this._host
    }

    getConversation() {
        return this._conversation
    }

    getParticiapnts() {
        return this._particiapnts
    }

    getState() {
        return this._state
    }

    getDate() {
        return this._date
    }

    getId() {
        return this._id
    }

    // setters
    /**
     * @param {String} newTitle
     */
    setTitle (newTitle) {
        this._title = newTitle
    }

    /**
     * @param {String} newUrl
     */
    setURL (newUrl) {
        this._url = newUrl
    }

    /**
     * @param {String} newHost
     */
    setHost (newHost) {
        this._host = newHost
    }

    /**
     * @param {} newMessage
     */
    addMessage (newMessage) {
        this._conversation.push(newMessage)
    }

    /**
     * @param {} newParticipant
     */
    addParticipant (newParticipant) {
        this._participants.push(newParticipant)
    }

    /**
     * @param {Boolean} newState
     */
    setState (newState) {
        this._state = newState
    }

    /**
     * @param {String} newDate
     */
    setDate (newDate) {
        this._date = newDate
    }
}