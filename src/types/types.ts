import { LoginRequest, LoginResponse } from '@/api/ApiTypes'
import { FormKitSchemaNode, FormKitNode } from '@formkit/core'
import type { ErrorMessages } from "@formkit/core"
import type { DefaultConfigOptions } from '@formkit/vue'
import { LocaleMessageObject } from 'vue-i18n/dist/vue-i18n.js'
export interface DashKitConfig {
    formKitConfig: DefaultConfigOptions
    translations: LocaleMessageObject
    uploadHandler?: UploadHandler
    loginHandler?: LoginHandler
}
export interface ToastHandler {
    hideToast?: boolean
    title?: String
    message?: String
}

export interface DialogUpdateParms {
    onConfirmed?: Function,
    dialog: any,
    form: FormUpdateParams,
    config?: {
        width?: string
        breakpoints?: Record<string, string>
    }
}
export interface DialogCreateParms {
    onConfirmed?: Function,
    form: FormCreateParams,
    dialog: any,
    config?: {
        width?: string
        breakpoints?: Record<string, string>
    }
}
export interface DialogDeleteRestoreParms {
    onConfirmed?: Function,
    deleteRestoreHandler: DeleteRestoreHandler<any>,
    dialog: any,
    config?: {
        width?: string
        breakpoints?: Record<string, string>
    }
}
export interface FilterParser {
    getDisplayValue(inputNode: FormKitNode): string;
}

export interface FindHandler<Request, Response, TargetResponse> {
    findFunction: (req: Request) => Promise<Response>;
    mapFunction?: (response: Response) => TargetResponse;
    requestPropertyName: string;
    requestValue?: number;
}
export interface FormUpdateParams {
    sections: Array<FormSeciton>
    options: FormOptions
    submitHandler: SubmitHandler<any, any, any>
    toastHandler: ToastHandler
    findHandler: FindHandler<any, any, any>
}


export interface FormFilterParams {
    inputs: FormKitSchemaNode[],
    options?: FormFilterOptions,
    modelValue?: Record<string, any>,
    displayValue?: Record<string, any>,
}
export interface FormCreateParams {
    sections: Array<FormSeciton>
    options: FormOptions
    submitHandler: SubmitHandler<any, any, any>
    toastHandler: ToastHandler
}

export type CrudOptions = {
    title: string
    feature: string
    showExportButton: boolean
    showCreateButton: boolean
    showDeletedFilter: boolean
}

export interface DeleteRestoreHandler<Req> {
    deleteRestore: (req: Req) => Promise<any>
    callBack?: () => any;
    requestPropertyName?: string;
    errorHandler?: Record<string, string>
    toastHandler?: ToastHandler
}

export interface Permission {
    permissionId: number
    permissionName: string
    permissionFunction: string
    permissionDescription: string
}

export interface PermissionsListRow {
    group: string

    permissions: Permission[]

}
export interface PermissionsListResponse {
    permissions: PermissionsListRow[],
    permissionsIds: number[]

}
export type ErrorHandler = {
    globalErrors?: ErrorMessages
    fieldErrors?: Record<string, ErrorMessages>
}
export type ToastError = {
    summary?: string
    detail?: string
}
export type ImportHandler<Request, Response> = {
    submit: (req: Request) => Promise<Response>
    submitCallBack?: (response: Response) => any
    importTemplateLink: string
    errorHandler?: Record<string, ToastError>
    toastHandler?: ToastHandler

}
export interface SubmitHandler<Request, TargetRequest, Response> {
    submit: (req: TargetRequest) => Promise<Response>
    submitCallBack?: (response: Response) => any
    requestPropertyName?: string
    errorHandler: ErrorHandler
    mapFunction?: (req: Request) => TargetRequest
    redirectRoute?: string
}
export interface FormFilterOptions {
    showActiveFilters?: boolean
    showClearFilters?: boolean
}

export interface FormOptions {
    id: String
    title: string
    withBackground?: boolean
    withHeader?: boolean
    allowBulkCreate?: boolean
    showHeaderSubmit?: boolean
}

export type FormSeciton = Record<string, FormKitSchemaNode[]>
export type FileUploadRequest = {
    fileName: string
    fileData: Uint8Array
}
export type FileUploadResponse = {
    fileName: string
}


export type FileRemoveRequest = {
    fileName: string,
    isSoftDelete: boolean,
}
export type FileRemoveResponse = {}

export type FileRestoreRequest = {
    fileName: string,
}
export type FileRestoreResponse = {}

export type UploadHandler = {
    fileUpload: (reuest: FileUploadRequest) => Promise<FileUploadResponse>
    fileRemove: (reuest: FileRemoveRequest) => Promise<FileRemoveResponse>
    fileRestore: (reuest: FileRestoreRequest) => Promise<FileRestoreResponse>
    baseImageUrl: string
}

export type LoginHandler = {
    submit: (req: LoginRequest) => Promise<LoginResponse>
    errorHandler: ErrorHandler
    redirectRoute: string
}