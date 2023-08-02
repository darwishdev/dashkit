declare module 'vue-i18n' {
    import { DefineComponent } from 'vue'
    import { LocaleMessages } from 'vue-i18n'

    // Define the type of options that are passed to the VueI18n constructor
    export interface VueI18nOptions {
        locale?: string
        fallbackLocale?: string
        messages?: LocaleMessages
        datetimeFormats?: Record<string, unknown>
        numberFormats?: Record<string, unknown>
        availableLocales?: string[]
        formatter?: unknown
        missing?: (locale: string, key: string, vm?: DefineComponent) => string | void
        silentTranslationWarn?: boolean | RegExp
        silentFallbackWarn?: boolean | RegExp
        formatFallbackMessages?: boolean
        preserveDirectiveContent?: boolean
        warnHtmlInMessage?: boolean
        escapeParameterHtml?: boolean
        inheritLocaleOnMissing?: boolean
        postTranslation?: (str: string) => string
        onWarn?: (msg: string, vm?: DefineComponent, trace?: string) => void
        onError?: (err: Error, vm?: DefineComponent, info?: string) => void
    }

    // Define the type of the VueI18n instance
    export class VueI18n {
        constructor(options?: VueI18nOptions)
        t(key: string, ...args: unknown[]): string
        tc(key: string, choice?: number, ...args: unknown[]): string
        te(key: string, locale?: string): boolean
        d(value: unknown, ...args: unknown[]): string
        n(value: unknown, ...args: unknown[]): string
        datetimeFormats: Record<string, unknown>
        numberFormats: Record<string, unknown>
        locale: string
        fallbackLocale: string
        messages: LocaleMessages
        availableLocales: string[]
        formatter: unknown
        missing: (locale: string, key: string, vm?: DefineComponent) => string | void
        silentTranslationWarn: boolean | RegExp
        silentFallbackWarn: boolean | RegExp
        formatFallbackMessages: boolean
        preserveDirectiveContent: boolean
        warnHtmlInMessage: boolean
        escapeParameterHtml: boolean
        inheritLocaleOnMissing: boolean
        postTranslation: (str: string) => string
        onWarn: (msg: string, vm?: DefineComponent, trace?: string) => void
        onError: (err: Error, vm?: DefineComponent, info?: string) => void
    }

    // Add the plugin method to the Vue constructor
    export function install(app: any, options?: VueI18nOptions): void

    // Add the global translation functions to the Vue constructor
    // export function useI18n(): VueI18n
    // export function createI18n(): VueI18n
    export declare function useI18n<Schema = DefaultLocaleMessageSchema, Locales = 'en-US', Options extends UseI18nOptions<SchemaParams<Schema, VueMessageType>, LocaleParams<Locales>> = UseI18nOptions<SchemaParams<Schema, VueMessageType>, LocaleParams<Locales>>>(options?: Options): Composer<NonNullable<Options['messages']>, NonNullable<Options['datetimeFormats']>, NonNullable<Options['numberFormats']>, NonNullable<Options['locale']>>;
    export declare function createI18n<Legacy extends boolean = true, Options extends I18nOptions = I18nOptions, Messages = Options['messages'] extends object ? Options['messages'] : {}, DateTimeFormats = Options['datetimeFormats'] extends object ? Options['datetimeFormats'] : {}, NumberFormats = Options['numberFormats'] extends object ? Options['numberFormats'] : {}, OptionLocale = Options['locale'] extends string ? Options['locale'] : Locale>(options: Options, LegacyVueI18n?: any): typeof options['legacy'] extends true ? I18n<Messages, DateTimeFormats, NumberFormats, OptionLocale, true> : typeof options['legacy'] extends false ? I18n<Messages, DateTimeFormats, NumberFormats, OptionLocale, false> : I18n<Messages, DateTimeFormats, NumberFormats, OptionLocale, Legacy>;
    export function t(key: string, ...args: unknown[]): string
    export function tc(key: string, choice?: number, ...args: unknown[]): string
    export function te(key: string, locale?: string): boolean
    export function d(value: unknown, ...args: unknown[]): string
    export function n(value: unknown, ...args: unknown[]): string
}