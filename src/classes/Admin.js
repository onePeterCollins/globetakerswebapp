// administrator user object

export default class Admin {
    constructor() {
        this._name = ''
        this._password = ''
    }

    getName() {
        return this._name
    }

    getPassword() {
        return this._password
    }

    setName(newName) {
        this._name = newName
    }

    setPassword(newPassword) {
        this._password = newPassword
    }
}