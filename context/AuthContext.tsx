import { createContext, ReactNode, useContext, useState, useEffect } from 'react'
import useRouter from 'next/router'
import { API_URL, NEXT_URL } from '@/config/index'
import {
	LoginDetails,
	UserLoginErrorRes,
	UserRegistrationReq,
	UserRegistrationRes,
} from '@/interfaces/user'

type authContextType = {
	error: UserLoginErrorRes | null
	user: UserRegistrationRes | null
	login: ({}: LoginDetails) => void
	logout: () => void
	register: ({}: UserRegistrationReq) => void
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
	user?: any
	email?: string
	password?: string
}
export const AuthProvider = ({ children }: Props) => {
	const [user, setUser] = useState<UserRegistrationRes | null>(null)
	const [error, setError] = useState<UserLoginErrorRes | null>(null)

	//Register
	const register = async ({ user }: UserRegistrationReq): Promise<any> => {
		console.log(user)
	}
	//Login
	const login = async ({ email: identifier, password }: LoginDetails): Promise<any> => {
		const res = await fetch(`${NEXT_URL}/api/login`, {
			method: 'POST',
			headers: { 'Content-type': 'application/json' },
			body: JSON.stringify({ identifier, password }),
		})
		const data = await res.json()
		console.log(data)

		if (res.ok) {
			setUser(data.user)
			console.log(data.user)
		} else {
			setError(data.error)
			setError(null)
		}
	}
	//Logout
	const logout = async (): Promise<void> => {
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
