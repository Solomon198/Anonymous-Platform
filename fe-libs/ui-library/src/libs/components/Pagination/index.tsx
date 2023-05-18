import MaterialPagination, {
    type PaginationProps,
} from '@mui/material/Pagination'

import PaginationItem from '@mui/material/PaginationItem'

import { type SxProps } from '@mui/material'

export interface IPagination extends PaginationProps {
    paginationItemSx?: SxProps
    paginationItemBgColor?: string
    selectedBgColor?: string
    selectedTextColor?: string

    'data-testid'?: string
}

const Pagination = (props: IPagination): JSX.Element => {
    const {
        shape = 'rounded',
        paginationItemSx = {},
        selectedBgColor = 'primary',
        selectedTextColor = 'text',
        paginationItemBgColor = 'background.paper',
        disabled = false,
    } = props
    return (
        <MaterialPagination
            disabled={true}
            renderItem={(item) => (
                <PaginationItem
                    {...{
                        ...item,
                        disabled,
                        shape,
                        sx: {
                            ...paginationItemSx,

                            backgroundColor: paginationItemBgColor,

                            '&.Mui-selected:hover': {
                                backgroundColor: selectedTextColor,
                            },
                            '&.Mui-selected': {
                                color: selectedTextColor,
                                background: selectedBgColor,
                            },
                        },
                    }}
                />
            )}
            shape={shape}
            {...props}
        />
    )
}

export default Pagination
