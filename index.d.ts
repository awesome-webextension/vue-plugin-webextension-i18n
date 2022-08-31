import { PluginObject } from 'vue'

export interface Ii18nFunction {
  (messageName: string, substitutions?: string | string[]): string
}

declare module 'vue/types/vue' {
  interface Vue {
    $i18n: Ii18nFunction
  }
}

declare module 'vue' {
  interface ComponentCustomProperties {
    $i18n: Ii18nFunction
  }
}

declare const i18n: PluginObject<Ii18nFunction>
export default i18n
