const { JSDOM } = require("jsdom")
const chrome = require('sinon-chrome/extensions')
const browser = require('sinon-chrome/webextensions')
const chai = require('chai')
const sinonChai = require("sinon-chai")
chai.should()
chai.use(sinonChai)

// shut off Vue's logs
process.env.NODE_ENV = 'production'

;['chrome', 'webext'].forEach(type => {
  describe(`${type === 'chrome' ? 'Chrome ' : 'Web'}Extensions with Vue2`, function () {
    var Vue, ext

    // Clean env
    beforeEach(function () {
      delete require.cache[require.resolve('vue2')]
      delete require.cache[require.resolve('../index')]
      ext = type === 'chrome' ? chrome : browser
      ext.runtime.getURL = () => ''
      const { window } = new JSDOM(`<!DOCTYPE html><body><div id="app"></div></body></html>`)
      const browserType = type === 'chrome' ? 'chrome' : 'browser'
      window[browserType] = ext
      global[browserType] = ext
      global.window = window
      global.document = window.document
      Vue = require('vue2/dist/vue.common.js')
      const plugin = require('../index')
      Vue.use(plugin)
    })

    it('Using $i18n in intance\'s option object', function (done) {
      const vm = new Vue({
        el: '#app',
        beforeCreate () {
          this.$i18n('beforeCreate')
        },
        created () {
          ext.i18n.getMessage.should.have.been.calledWith('beforeCreate')
          this.$i18n('created')
        },
        mounted () {
          ext.i18n.getMessage.should.have.been.calledWith('created')
          this.$i18n('mounted')
        },
      })
      setTimeout(() => {
        ext.i18n.getMessage.should.have.been.calledWith('mounted')
        done()
      }, 0)
    })

    it('Using $i18n in intance\'s template', function (done) {
      const vm = new Vue({
        el: '#app',
        template: "<p>{{ $i18n('title') }}</p>",
      })
      setTimeout(() => {
        ext.i18n.getMessage.should.have.been.calledWith('title')
        done()
      }, 0)
    })
  })

  describe(`${type === 'chrome' ? 'Chrome ' : 'Web'}Extensions with Vue3`, function () {
    var createApp, plugin, ext

    // Clean env
    beforeEach(function () {
      delete require.cache[require.resolve('vue')]
      delete require.cache[require.resolve('../index')]
      ext = type === 'chrome' ? chrome : browser
      ext.runtime.getURL = () => ''
      const { window } = new JSDOM(`<!DOCTYPE html><body><div id="app"></div></body></html>`)
      const browserType = type === 'chrome' ? 'chrome' : 'browser'
      window[browserType] = ext
      global[browserType] = ext
      global.window = window
      global.document = window.document
      global.navigator = window.navigator
      global.SVGElement = window.SVGElement
      global.Element = window.Element
      createApp = require('vue/dist/vue.cjs.js').createApp
      plugin = require('../index')
    })

    it('Using $i18n in intance\'s option object', function (done) {
      const app = createApp({
        beforeCreate () {
          this.$i18n('beforeCreate')
        },
        created () {
          ext.i18n.getMessage.should.have.been.calledWith('beforeCreate')
          this.$i18n('created')
        },
        mounted () {
          ext.i18n.getMessage.should.have.been.calledWith('created')
          this.$i18n('mounted')
        },
      })
      app.use(plugin)
      app.mount('#app')
      setTimeout(() => {
        ext.i18n.getMessage.should.have.been.calledWith('mounted')
        done()
      }, 0)
    })

    it('Using $i18n in intance\'s template', function (done) {
      const app = createApp({
        template: "<p>{{ $i18n('title') }}</p>",
      })
      app.use(plugin)
      app.mount('#app')
      setTimeout(() => {
        ext.i18n.getMessage.should.have.been.calledWith('title')
        done()
      }, 0)
    })
  })
})
