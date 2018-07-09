module.exports = {
  install (Vue) {
    const browserObject = null
    if (typeof browser !== "undefined") {
      browserObject = browser 
    } else if (typeof chrome !== "undefined") {
      browserObject = chrome
    }
    if (!browserObject) { throw new Error('"browser" or "chrome" not found.') }
    /**
     * @param {string} messageName - The name of the message, as specified in the messages.json file.
     * @param {string|string[]} [substitutions] - A single substitution string, or an array of substitution strings.
     * @returns {string} Message localized for current locale.
     * @see {@link https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/i18n/getMessage}
     * @todo Reactive locales. No api supports switching locales for now.
     */
    Vue.prototype.$i18n = function i18n () {
      return browserObject.i18n.getMessage.apply(void 0, arguments)
    }
  }
}
