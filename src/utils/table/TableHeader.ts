import type { TableRouter, ITableHeader } from '@/types/types'
import { h, resolveComponent } from 'vue'
import Tag from 'primevue/tag';
import { FormatCurrency } from '@/utils/helpers'
import { ColumnProps } from 'primevue/column';

export class TableHeaderText implements ITableHeader {
    columnProps: ColumnProps = {}
    columnName: string
    constructor(name: string, sortable: boolean = true) {
        this.columnName = name
        this.columnProps.sortable = sortable
    }
    renderHtml(value: any) {
        return h('p', value[this.columnName]);
    }
}

export class TableHeaderPrice implements ITableHeader {
    columnProps: ColumnProps = {}
    columnName: string
    constructor(name: string, sortable: boolean = true) {
        this.columnProps.sortable = sortable
        this.columnName = name
    }

    renderHtml(value: any) {
        return h('span', FormatCurrency(value[this.columnName]))
    }
}

export class TableHeaderTag implements ITableHeader {

    columnProps: ColumnProps = {}
    columnName: string
    constructor(name: string, sortable: boolean = true) {
        this.columnProps.sortable = sortable
        this.columnName = name
    }
    renderHtml(value: any) {
        return h(Tag, {
            value: value[this.columnName]
        })
    }
}

export class TableHeaderLink implements ITableHeader {
    columnProps: ColumnProps = {}
    columnName: string
    tableRouter: TableRouter
    constructor(name: string, sortable: boolean = true, tableRouter: TableRouter) {
        this.columnProps.sortable = sortable
        this.columnName = name
        this.tableRouter = tableRouter
    }

    renderHtml(value: any) {
        const ruterLink = resolveComponent('router-link')
        const params = {}
        params[this.tableRouter.paramName] = value[this.tableRouter.paramColumnName]
        return h(ruterLink, { to: { name: this.tableRouter.name, params } }, () => [h('span', value[this.columnName])])
    }
}

export class TableHeaderImage implements ITableHeader {
    columnProps: ColumnProps = {}
    columnName: string
    constructor(name: string, sortable: boolean = false) {
        this.columnProps.sortable = sortable
        this.columnName = name
    }

    renderHtml(value: any) {
        const appImage = resolveComponent('app-image')
        return h(appImage, { src: value[this.columnName] })
    }
}
