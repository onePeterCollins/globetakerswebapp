// mixin for encryption and decryption of JSON web tokens
export default {
    install(Vue) {
        Vue.prototype.$Encrypt = {}
        Vue.prototype.$Decrypt = {}
        Vue.prototype.$GetDataWithToken = {}

        Vue.mixin ({
            mounted () {
                this.$Encrypt = function (string, encryptionKey) {
                    let result = '', key = encryptionKey ? encryptionKey : keyGen(), keyTracker = 0

                    for (let i=0; i<string.length; i++) {
                        result += String.fromCharCode(key[i % (key.length % (i ^ 7))]^string.charCodeAt(i));
                    }

                    function keyGen() {
                        let base = Math.random().toString().split('').reverse(),
                        keyLength = 0,
                        charCode,
                        key = ''
                
                        // set key length to 20 characters max
                        base.forEach ((item) => {
                          if (item != '0' && item != '.') {
                            if (keyLength < 10 && keyLength < 20) {
                                keyLength += (1 * item)
                            }
                
                            // limit the keyLength to 20
                            if (keyLength > 20) {
                                keyLength = 20
                            }
                          }
                        })
                
                        for (let i=0; i<keyLength; i++) {
                            charCode = Math.floor(Math.random() * 10)
                            key += charCode.toString()
                        }
                
                        return key
                    }

                    function embedKey (key, code) {
                        let matrix = String.fromCharCode(key.length), chunk, firstStop = 0
                
                        for (let i in code) {
                            if (i > 0 && i % key.length === 0) {
                                keyTracker === key.length ? keyTracker = 0 : null
                                chunk = code.slice(i - key.length, i) + key[keyTracker]
                                matrix += chunk
                                keyTracker++
                                firstStop = i
                            }
                        }
                
                        for (let i = firstStop; i<code.length; i++) {
                            matrix += code[i]
                        }
                
                        return matrix
                    }
                
                    return {key: key, token: embedKey(key, result)};
                },

                this.$Decrypt = function (token) {
                    let keyLength = token.charCodeAt(0),
                    pureToken = getPureToken(token),
                    extractedKey = extractKey(pureToken),
                    extractedToken = extractToken(pureToken),
                    result = ''

                    for (let i=0; i<extractedToken.length; i++) {
                        result += String.fromCharCode(extractedKey[i % (extractedKey.length % (i ^ 7))]^extractedToken.charCodeAt(i));
                    }

                    function getPureToken (token) {
                        let pureToken = ''

                        for (let i in token) {
                            if (i > 0) {
                                pureToken += token[i]
                            }
                        }

                        return pureToken
                    }

                    function extractKey (token) {
                        let extractedKey = '', chunk
                
                        for (let i in token) {
                            if (i > 0 && i % (keyLength + 1) === 0) {
                                chunk = token.slice(i - (keyLength + 1), i)
                    
                                if (extractedKey.length < keyLength) {
                                    extractedKey += chunk.split('').pop()
                                }
                            }
                        }
                
                        return extractedKey
                    }

                    function extractToken (token) {
                        let extractedToken = '', chunk = '', key = '', firstStop = 0
                
                        for (let i in token) {
                            if (i > 0 && i % (keyLength + 1) === 0) {
                                chunk = token.slice(i - (keyLength + 1), i).split('')
                                
                                if (key.length < keyLength) {
                                    key += chunk.pop()
                                    extractedToken += chunk.join('')
                                    key.length === keyLength ? key = '' : null
                                    firstStop = i
                                }
                            }
                        }
                
                        // push remainder after stripping encryption key
                        for (let i = firstStop; i<token.length; i++) {
                            extractedToken += token[i]
                        }
                
                        return extractedToken
                    }

                    return {key: extractedKey, token: result}
                },

                this.$GetDataWithToken = function (payload, key) {
                    let keyLength = payload.data.charCodeAt(0),
                    pureToken = getPureToken(payload.data),
                    extractedKey = extractKey(pureToken),
                    data = null

                        
                        
                    if (extractedKey === key) {
                        data = payload.data
                    }

                    function getPureToken (token) {
                        let pureToken = ''

                        for (let i in token) {
                            if (i > 0) {
                                pureToken += token[i]
                            }
                        }

                        return pureToken
                    }

                    function extractKey (token) {
                        let extractedKey = '', chunk
                
                        for (let i in token) {
                            if (i > 0 && i % (keyLength + 1) === 0) {
                                chunk = token.slice(i - (keyLength + 1), i)
                    
                                if (extractedKey.length < keyLength) {
                                    extractedKey += chunk.split('').pop()
                                }
                            }
                        }
                
                        return extractedKey
                    }

                    return data
                }
            }
        })
    }
}