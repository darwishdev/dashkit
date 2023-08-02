import type { FormSeciton, ToastHandler } from '@/types/types'


const sections: FormSeciton[] = [
    {
        login: [
            {
                $formkit: 'text',
                outerClass: "col-12",
                name: 'userName',
                label: 'userNameLabel',
                placeholder: 'userNamePlaceholder',
                validation: 'required|length:3',

            },
            {
                $formkit: 'password',
                outerClass: "col-12",
                name: 'userPassword',
                label: 'passwordLabel',
                placeholder: 'passwordPlaceholder',
                validation: 'required|length:6',

            },
        ],
    },
]

const toastHandler: ToastHandler = {
    hideToast: false
}


export default {
    sections,
    toastHandler
}