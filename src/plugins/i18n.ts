
import { createI18n } from 'vue-i18n'

import { LocaleMessageObject } from 'vue-i18n/dist/vue-i18n.js'

const initI18n = (messages: LocaleMessageObject) => createI18n({
    locale: 'en',
    fallbackLocale: 'en',
    useScope: 'global',
    globalInjection: true,
    legacy: false,
    messages,
})


export default initI18n
