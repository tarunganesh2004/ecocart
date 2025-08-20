import { createContext, useState, useEffect } from 'react'
import jwtDecode from 'jwt-decode'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

export const AuthContext = createContext()

export function AuthProvider({ children }) {
    const [authTokens, setAuthTokens] = useState(() => localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)
    const [user, setUser] = useState(() => localStorage.getItem('authTokens') ? jwtDecode(localStorage.getItem('authTokens')) : null)
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    const login = async (email, password) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/users/login`, { email, password })
            const data = response.data
            setAuthTokens(data)
            setUser(jwtDecode(data.token))
            localStorage.setItem('authTokens', JSON.stringify(data))
            toast.success('Logged in successfully')
            navigate('/')
        } catch (error) {
            toast.error(error.response?.data?.message || 'Login failed')
        }
    }

    const logout = () => {
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem('authTokens')
        toast.info('Logged out')
        navigate('/login')
    }

    const register = async (email, password) => {
        try {
            await axios.post(`${import.meta.env.VITE_API_URL}/users/register`, { email, password })
            toast.success('Registered successfully! Please log in.')
            navigate('/login')
        } catch (error) {
            toast.error(error.response?.data?.message || 'Registration failed')
        }
    }

    useEffect(() => {
        if (authTokens) {
            setUser(jwtDecode(authTokens.token))
        }
        setLoading(false)
    }, [authTokens])

    return (
        <AuthContext.Provider value={{ user, authTokens, login, logout, register, loading }}>
            {children}
        </AuthContext.Provider>
    )
}