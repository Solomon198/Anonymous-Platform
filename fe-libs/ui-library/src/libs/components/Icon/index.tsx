import React, { useContext, createContext } from 'react'

import { useTheme, type Color } from '@mui/material'

import type { IIconNames, TIconContext, TIconNames } from './type'

import { getPalleteColor } from './utils'

import { type ColorNames } from '../Theme'

export type { IIconNames, TIconContext, TIconNames }

export interface IBaseIconProps {
    /** Specify color as available in theme */
    color?: ColorNames | Color
    /** Specify size in pixel */
    size?: string | number
    /** Specify name of icon from icon pack */
    name: TIconNames
}

const IconContext = createContext<TIconContext | null>(null)
const useIcons = (): TIconContext => {
    const icons = useContext(IconContext)
    if (icons == null) {
        throw new Error(
            'icons is null. Please consider wrapping your application in an Iconprovider'
        )
    }
    return icons
}

const Icon = (props: IBaseIconProps): JSX.Element => {
    const { name, size, color = 'primary' } = props
    const theme = useTheme()
    const icons = useIcons()
    const SelectedIcon = icons[name]
    if (SelectedIcon === undefined || SelectedIcon === null) {
        throw new Error(`Icon ${name} does not exist in IconProvider `)
    }

    const $sizeBool = typeof size === 'number' || typeof size === 'string'

    return (
        <>
            <SelectedIcon
                color={getPalleteColor(theme, color)}
                {...($sizeBool ? { width: size, height: size } : {})}
            />
        </>
    )
}

interface IcreateIconContextProps {
    icons: TIconContext
}

interface contextReturnType {
    Provider: React.FC<{ children: JSX.Element }>
    Icon: (props: IBaseIconProps) => JSX.Element
}

export const createIconContext = ({
    icons,
}: IcreateIconContextProps): contextReturnType => {
    const Provider: React.FC<{ children: JSX.Element }> = ({
        children,
    }): JSX.Element => {
        return (
            <IconContext.Provider value={icons}>
                {children}
            </IconContext.Provider>
        )
    }

    return { Icon, Provider }
}
