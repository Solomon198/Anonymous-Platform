import { toast } from 'react-toastify'

const AUTO_CLOSE_TIMEOUT = 8000
type notificationType = 'warn' | 'error' | 'success' | 'info'
export function notificationCenter(
    msg: string | JSX.Element,
    type?: notificationType
): void {
    switch (type) {
        case 'error':
            toast.error(msg, { autoClose: AUTO_CLOSE_TIMEOUT })
            break
        case 'info':
            toast.info(msg, { autoClose: AUTO_CLOSE_TIMEOUT })
            break
        case 'success':
            toast.success(msg, { autoClose: AUTO_CLOSE_TIMEOUT })
            break
        case 'warn':
            toast.warn(msg, { autoClose: AUTO_CLOSE_TIMEOUT })
            break
        default:
            toast(msg, { autoClose: AUTO_CLOSE_TIMEOUT })
    }
}
