/* eslint-disable react/prop-types */
import { ListItemButton, ListItemIcon } from '@mui/material'
export const ListItemWrapper: React.FC<{
    children: JSX.Element
    isMobile?: boolean
}> = ({ children, isMobile }): JSX.Element => {
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (isMobile) {
        return (
            <ListItemButton>
                <ListItemIcon>{children}</ListItemIcon>
            </ListItemButton>
        )
    }
    return <>{children}</>
}
