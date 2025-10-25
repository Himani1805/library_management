import { Navigate } from 'react-router-dom'
import useAuth from '../../utils/hooks/useAuth.js'

const pathToNavigate = {
    admin: '/admin',
    user: '/dashboard',
    guest: '/login'
}

const allowedList = {
    admin: ['/admin', '/about', '/contact', '/account', '/books', '/books/add', '/userManagement', '/settings',"/books/view/:id","/books/payment/:id","/my-books"],
    user: ['/dashboard', '/about', '/contact', '/account', '/books', '/myBooks', '/settings',"/books/view/:id","/books/payment/:id","/my-books"],
    guest: ['/login', '/', '/signup', '/about', '/contact']
}


export default function ProtectedRoute({ children, path = '' }) {
    const { authData } = useAuth()

    const userRole = authData?.user?.role || 'guest'

    if (allowedList[userRole].includes(path)) {
        return children
    }

    return <Navigate to={pathToNavigate[authData.user?.role]} replace />

}