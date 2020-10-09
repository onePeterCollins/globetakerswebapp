// This class object specifies all the details of the different kinds of lectures on the platform

/**
 * @author  Peter Collins
 * @author  /github.com/onepetercollins
 * @alias   Lecture
 */

export default class Lecture {
    constructor() {
        this._title = ''
        this._author = ''
        this._formatIndex = 0
        this._formats = ['text', 'audio']
        this._content = []
        this._questions = []
        this._seenBy = []
        this._views = 0
        this._date = ''
        this._id = ''
        this._approved = false
    }

    // getters

    getTitle() {
        return this._title
    }

    getAuthor() {
        return this._author
    }

    getFormat() {
        return this._formats[this._formatIndex]
    }

    getFormatIndex() {
        return this._formatIndex
    }

    getContent() {
        return this._content
    }

    getQuestions() {
        return this._questions
    }

    getViewerDetails() {
        return this._seenBy
    }

    getViews() {
        return this._views
    }

    getDate() {
        return this._date
    }

    //setters

    /**
     * @param {String} newTitle
     */
    setTitle (newTitle) {
        this._title = newTitle
    }

    /**
     * @param {String} newAuthor
     */
    setAuthor (newAuthor) {
        this._author = newAuthor
    }

    /**
     * @param {Number} newFormat
     */
    setFormat (newFormat) {
        this._formatIndex = newFormat
    }

    /**
     * @param {Number} newContent
     */
    addContent (newContent) {
        this._content.push(newContent)
    }

    /**
     * @param {Object} newQuestion
     */
    addQuestion (newQuestion) {
        this._questions.push(newQuestion)
    }

    /**
     * @param {Object} newViewer
     */
    addViewer (newViewer) {
        this._seenBy.push(newViewer)
    }

    addView () {
        this._views += 1
    }

    /**
     * @param {String} newDate
     */
    setDate (newDate) {
        this._date = newDate
    }

    /**
     * @param {String} newId
     */
    setId (newId) {
        this._id = newId
    }

    approve () {
        this._approved = true
    }

    disapprove () {
        this._approved = false
    }
}