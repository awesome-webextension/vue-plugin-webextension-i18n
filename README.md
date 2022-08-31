# vue-plugin-webextension-i18n
Vue.js plugin that wraps the extension internationalization api. Supports [WebExtension](https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/i18n/getMessage) and native [Chrome extension](https://developer.chrome.com/extensions/i18n).

# Install

```bash
npm add vue-plugin-webextension-i18n@0.1.2
```

# Usage

This plugin exposes an instance method `$i18n` whose signature is identical to that of `i18n.getMessage`.

```javascript
import Vue from 'vue'
import i18n from 'vue-plugin-webextension-i18n'
Vue.use(i18n)

new Vue({
  template: "<h1>{{ $i18n('title') }}</h1>",
  mounted () {
    const info = this.$i18n('info_head') + Date.now()
    // ...
  }
})
```
