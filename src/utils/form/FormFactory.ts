import { FormOptions, FormSeciton } from '@/types/types';
import { FormKitSchemaNode } from '@formkit/core'
import type { I18n } from 'vue-i18n/dist/vue-i18n.js';


export class FormFactory {
    private static instance: FormFactory;
    forms = {} as any
    hr = {
        $el: 'hr',
        attrs: {
            class: 'my-4'
        },
    } as FormKitSchemaNode
    t = null as any
    SubmitBtn = {
        $formkit: 'submit',
        outerClass: "mt-4 w-full",
        label: "submit",
    }
    private constructor() {
        // Private constructor to prevent instantiation
    }

    InitTranslation(i18n: I18n): void {
        this.t = i18n.global.t
        // this.SubmitBtn.label = this.t(this.SubmitBtn.label)
    }
    withFlex(flexChildren: FormKitSchemaNode[], justify: string = ''): FormKitSchemaNode {
        return {
            $el: 'div',
            attrs: {
                class: `flex justify-content-${justify} align-items-center`
            },
            children: flexChildren

        }
    }
    WithBackground(elements: FormKitSchemaNode[], withBackground: boolean): FormKitSchemaNode {
        return {
            $el: 'div',
            attrs: {
                class: `${withBackground ? 'bg-card p-4 border-round mb-4' : ''}`
            },
            children: elements
        }

    }
    WithGrid(elements: FormKitSchemaNode[]): FormKitSchemaNode {
        return {
            $el: 'div',
            attrs: {
                class: 'grid'
            },
            children: elements
        }

    }
    Title(title: string): FormKitSchemaNode {
        return {
            $el: 'h1',
            attrs: {
                class: 'mx-2 title'
            },
            children: this.t(title)
        }
    }
    SectionFirstKey(section: FormSeciton): string {
        return Object.keys(section)[0]
    }


    BulkCreateSwitch(): FormKitSchemaNode {
        return {
            $formkit: "toggle",
            outerClass: "mb-0 mx-4",
            label: this.t("stayOnSamePageAfterSuccess"),
            name: "isBulkCreate"
        }
    }

    HeaderRight(options: FormOptions): FormKitSchemaNode[] {
        const map = {
            'WithSubmit': [this.SubmitBtn],
            'WithBulk': [this.BulkCreateSwitch()],
            'WithSubmitWithBulk': [this.SubmitBtn, this.BulkCreateSwitch()]
        }
        const key = `${options.showHeaderSubmit ? 'WithSubmit' : ''}${options.allowBulkCreate ? 'WithBulk' : ''}`
        if (!map[key]) {
            return []
        }
        return map[key]
    }
    Header(options: FormOptions, withHeader: boolean): FormKitSchemaNode[] {
        if (!withHeader) {
            return []
        }
        const title: FormKitSchemaNode = this.Title(options.title)

        const rightHeaderBtns = this.HeaderRight(options)
        const header: FormKitSchemaNode[] =
            [
                this.withFlex(
                    [
                        title,
                        this.withFlex(
                            rightHeaderBtns
                        )
                    ],

                    'between'
                ),
                this.hr
            ]
        return header
    }
    CreateSectionOutput(section: FormSeciton, withBackground: boolean): FormKitSchemaNode {
        const title = this.SectionFirstKey(section)
        const formTitle = this.Title(title)
        const inputs = section[title].map((input: any) => {
            if (input.label) {
                input.label = this.t(input.label)
            }
            if (input.placeholder) {
                input.placeholder = this.t(input.placeholder)
            }
            return input
        })
        const formSeciotn: FormKitSchemaNode = this.WithBackground([formTitle, this.WithGrid(inputs)], withBackground)
        return formSeciotn
    }
    ConvertSections(sections: FormSeciton[], withBackground: boolean): FormKitSchemaNode[] {
        const lastSection = sections[sections.length - 1]
        const key = this.SectionFirstKey(lastSection)
        const lastInput = lastSection[key][lastSection[key].length - 1]
        if (lastInput != this.SubmitBtn) {
            lastSection[key].push(this.SubmitBtn)
        }
        return sections.map((section: FormSeciton) => this.CreateSectionOutput(section, withBackground))
    }
    CreateForm(options: FormOptions, sections: FormSeciton[]): FormKitSchemaNode | FormKitSchemaNode[] {
        if (Object.keys(this.forms).includes(options.id.toLowerCase())) {
            return this.forms[options.id.toLowerCase()]
        }
        const allHeaderElementsAreEmpty = options.title == '' && !options.showHeaderSubmit && !options.allowBulkCreate
        const withHeader = options.withHeader || !allHeaderElementsAreEmpty
        const withBackground = withHeader && (typeof options.withBackground == 'undefined' || options.withBackground)

        const header = this.Header(options, withHeader)
        const formSections = [
            ...header,
            ...this.ConvertSections(sections, options.withBackground!)
        ]
        const formWrapper = this.WithBackground(formSections, withBackground)
        this.forms[options.id.toLowerCase()] = formWrapper
        return formWrapper
    }
    CreateFormFilter(inputs: FormKitSchemaNode[]): FormKitSchemaNode[] {
        // const filterForm: FormKitSchemaNode[] = 
        return [this.WithGrid(inputs)]
    }
    public static getInstance(): FormFactory {
        if (!FormFactory.instance) {
            FormFactory.instance = new FormFactory();
        }
        return FormFactory.instance;
    }

}


export default FormFactory.getInstance();