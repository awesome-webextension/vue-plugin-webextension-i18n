module.exports = {
  install (app) {
    let browserObject = null
    try {
      if (typeof browser.runtime.getURL === 'function') {
        browserObject = browser
      }
    } catch (e) {
      try {
        if (typeof chrome.runtime.getURL === 'function') {
          browserObject = chrome
        }
      } catch (e) {}
    }
    if (!browserObject) { throw new Error('"browser" or "chrome" not found.') }
    const getMessage = browserObject.i18n.getMessage.bind(browserObject.i18n)
    if (app.prototype) {
      // vue2
      app.prototype.$i18n = getMessage
    } else {
      // vue3
      app.config.globalProperties.$i18n = getMessage
    }
  }
}
