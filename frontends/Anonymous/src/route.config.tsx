import { createBrowserRouter } from 'react-router-dom'
import Login from './pages/login'

const router = createBrowserRouter([
    {
        path: '/',
        element: <Login />,
        children: [
            {
                path: '/home',
                element: <div>Home</div>,
            },
            {
                path: '/features',
                element: <div>Features</div>,
            },
            {
                path: '/courses',
                element: <div>Courses</div>,
            },
            {
                path: '/about',
                element: <div>About</div>,
            },
            {
                path: '/support',
                element: <div>Support</div>,
            },
            {
                path: '/login',
                element: <div>Login</div>,
            },
        ],
    },
])
export default router
