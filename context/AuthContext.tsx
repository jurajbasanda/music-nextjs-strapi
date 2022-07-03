import { createContext, ReactNode, useContext, useState, useEffect } from 'react'
import useRouter from 'next/router'
import { API_URL } from '@/config/index'

type authContextType = {
	error: any
	user: boolean | null
	login: ({}: Props) => void
	logout: ({}: Props) => void
	register: ({}: Props) => void
}
const authContextDefaultValues: authContextType = {
	error: null,
	user: null,
	login: () => {},
	logout: () => {},
	register: () => {},
}

const AuthContext = createContext<authContextType>(authContextDefaultValues)

type Props = {
	children: ReactNode
	user: any
	email: string
	password: string
}
export const AuthProvider = ({ children }: Props) => {
	const [user, setUser] = useState<any>(null)
	const [error, setError] = useState<any>(null)

	//Register
	const register = async ({ user }: Props): Promise<any> => {
		console.log(user)
	}
	//Login
	const login = async ({ email: identifier, password }: Props): Promise<any> => {
		console.log({ identifier, password })
	}
	//Logout
	const logout = async ({}: Props): Promise<void> => {
		console.log('Logout')
	}
	//Check if user is logged in
	const checkUserLoggedIn = async ({ user }: Props): Promise<any> => {
		console.log('check')
	}

	return (
		<>
			<AuthContext.Provider value={{ user, error, register, login, logout }}>
				{children}
			</AuthContext.Provider>
		</>
	)
}

export default AuthContext
