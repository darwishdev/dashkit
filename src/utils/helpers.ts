import { utils, write, read } from 'xlsx';
import { saveAs } from 'file-saver';
import type { ErrorHandler, ToastHandler, ToastError } from "@/types/types"
import type { FormKitNode } from "@formkit/core"
import { ToastServiceMethods } from 'primevue/toastservice'
import { NavigationGuardNext, RouteLocationNormalized } from "vue-router"
export const handleSuccessToast = (handler: ToastHandler | undefined, toast: ToastServiceMethods, t: Function, title: string): void => {

    console.log("hnalder" , handler , toast)
    const defaultTitle = `${title}_success_toast_title`
    const defaultMessage = `${title}_success_toast_message`
    if (handler) {
        if (!handler.hideToast) {
            toast.add({ severity: 'success', summary: t(`${handler.title ? handler.title : defaultTitle}`), detail: t(`${handler.message ? handler.message : defaultMessage}`), life: 3000 });
        }
    } else {
        toast.add({ severity: 'success', summary: t(defaultTitle), detail: t(defaultMessage), life: 3000 });
    }
}
export const objFirstKey = (obj: Object) => {
    return Object.keys(obj)[0]
}
export const convertArrayToObjectArray = (input: any[][]): Object => {
    if (input.length < 2) {
        return [];
    }

    const headers = input[0].map((header: any) => header.toString());

    const rows = input.slice(1).map((row) => {
        const obj: any = {};
        row.forEach((value: any, index: number) => {
            const header = headers[index];
            obj[header] = value;
        });
        return obj;
    });

    return { rows }
}
export function getRouteVariation(currentRoute: string, variation: string): string {
    console.log(currentRoute)
    if(!currentRoute){
        return ""
    }
    const routeParts = currentRoute.split('_');
    if(!routeParts){
        return ""
    }
    // remvove last char "s" if the function is list by  routeParts[0].slice(0, -1) 
    let featureName = routeParts[1] == 'list' ? routeParts[0].slice(0, -1) : routeParts[0];

    featureName = variation == 'list' ? `${featureName}s` : featureName
    return `${featureName}_${variation}`;
}
export const objNonNullValues = (obj: Object) => {
    return Object.fromEntries(
        Object.entries(obj).filter(([_, value]) => value !== null && value !== "" && value !== undefined)
    );
}


export const handleToastError = (err: ToastError, toast: ToastServiceMethods, translation: Function): void => {
    toast.add({ severity: 'error', summary: translation(err.summary), detail: translation(err.detail), life: 3000 });
}
export const handleError = (error: any, _node: FormKitNode, _toast: ToastServiceMethods, _errorHandler: ErrorHandler, _t: Function): void => {
    if (error == null) {
        return
    }
    const messages = error.message.split(' ')
    const message: string = messages.length == 2 ? messages[1] : error.message
    if (message == 'internalServerError') {
        const err: ToastError = {
            summary: 'internalServerErrorTitle',
            detail: 'internalServerErrorMessage',
        }
        handleToastError(err, _toast, _t)
        // _toast.add({ severity: 'error', summary: _t('internalServerErrorTitle'), detail: _t('internalServerErrorMessage'), life: 3000 });
    } else {
        if (!_errorHandler.globalErrors && !_errorHandler.fieldErrors) {
            _node.setErrors(['unknow_error'])
            return
        }
        if (_errorHandler.globalErrors && _errorHandler.globalErrors[message]) {
            _node.setErrors((_errorHandler.globalErrors![message]))
            return
        }
        if (_errorHandler.fieldErrors && _errorHandler.fieldErrors[message]) {
            const err = _errorHandler.fieldErrors[message]
            const key = objFirstKey(err)
            err[key] = _t(err[key])
            _node.setErrors([], err)
            return
        }

        _node.setErrors([_t('unknown_error')])

    }
}



export const parseDate = (date: string): string => {
    const dateValue = new Date(date);
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        timeZone: 'Africa/Cairo',
    };
    return dateValue.toLocaleString('en-US', options);
}

export const SnakeToCamel = (str: string): string => {
    return str.replace(/([-_]\w)/g, (match) => match[1].toUpperCase());
}

export const ToPascal = (str: string): string => {
    const camelCaseStr = SnakeToCamel(str)
    return camelCaseStr.charAt(0).toUpperCase() + camelCaseStr.slice(1);
}
export const Can = (functionName: string): boolean => {
    const convertedPermissionName = ToPascal(functionName)
    const permissions = atob(localStorage.getItem('permissions') as string)
    return permissions.includes(convertedPermissionName) || convertedPermissionName == 'DashboardView'
}
export const authMiddleware = (to: RouteLocationNormalized, _: RouteLocationNormalized, next: NavigationGuardNext) => {
    if (to.name != 'login') {
        if (!localStorage.getItem('token')) {
            localStorage.removeItem('permissions')
            localStorage.removeItem('sideBar')
            next({ name: 'login' })
        }
    }
    if (!Can(ToPascal(to.name as string)) && to.name != 'unauthorized' && to.name != 'login') {
        next({ name: 'unauthorized' })
    }
    next()
}




export const ExportCSV = (data: unknown[], fileName: string = 'data') => {
    const worksheet = utils.json_to_sheet(data);
    const workbook = utils.book_new();
    utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    const excelBuffer = write(workbook, { bookType: 'xlsx', type: 'array' });
    const fileData = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
    saveAs(fileData, `${fileName}.xlsx`);
}


export function parseCSV(content: any): any[] {
    const lines = content.split('\n');
    const data: any = [];

    for (let i = 1; i < lines.length; i++) {
        const fields = lines[i].split(',');
        data.push(fields);
    }
    return data
}
export function parseExcel(content: any) {
    const workbook = read(content, { type: 'binary' });
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = utils.sheet_to_json(worksheet, { header: 1 });
    return data
}

export function ParseFile(content: any, type: 'csv' | 'xlsx' | 'xls'): any[] {
    const parseMapper = {
        'csv': parseCSV,
        'xlsx': parseExcel,
        'xls': parseExcel,
    }
    return parseMapper[type](content)
}