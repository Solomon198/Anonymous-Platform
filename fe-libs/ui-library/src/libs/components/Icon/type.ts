import { type Color } from '@mui/material'
import { type ComponentType } from 'react'

export interface IIconNames {
    ArrowUp: unknown
    ArrowDown: unknown
    ArrowDownAlt: unknown
    Minus: unknown
    Plus: unknown
    CloseModal: unknown
    ThickMultiply: unknown
    Check: unknown
    Copy: unknown
    Previous: unknown
    Next: unknown
    First: unknown
    Last: unknown
    Calender: unknown
    CheckCircle: unknown
    InfoCircle: unknown
    Ban: unknown
    Trash: unknown
    Redo: unknown
    Pen: unknown
    Eye: unknown
    EyeSlash: unknown
    Search: unknown
    InfoNotification: unknown
    DangerNotification: unknown
    WarningNotification: unknown
    SuccessNotification: unknown
    DefaultNotification: unknown
    EllipsisV: unknown
    EllipsisH: unknown
    SortAsc: unknown
    SortDesc: unknown
    FileUpload: unknown
    DatepickerIcon: unknown
    DatepickerNextMonth: unknown
    DatepickerPrevMonth: unknown
    AccordionArrowUp: unknown
    AccordionArrowDown: unknown
    AccordionPlus: unknown
    AccordionMinus: unknown
    TableRowCollapse: unknown
    TableRowExpand: unknown
    SelectDropDown: unknown
}

export type TIconNames = keyof IIconNames

export type TimportedIcomComponent = ComponentType<{
    className?: string
    size?: string | number
    color?: Color
}>

export type TIconContext = Record<string, TimportedIcomComponent>
