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

    getDate() {
        return this._date
    }

    getId() {
        return this._id
    }

    // setters
}