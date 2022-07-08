import { NextPage } from 'next/types'
import Link from 'next/link'
import { FormEventHandler, useState, useEffect, useContext } from 'react'
import { FaUser } from 'react-icons/fa'
import { ToastContainer, toast } from 'react-toastify'

import Layout from '@/components/Layout'
import styles from '@/styles/AuthForm.module.css'
import AuthContext from '@/context/AuthContext'

interface Props {}

const RegisterPage: NextPage<Props> = () => {
	const [username, setUsername] = useState<string>('')
	const [email, setEmail] = useState<string>('')
	const [password, setPassword] = useState<string>('')
	const [passwordConfirm, setPasswordConfirm] = useState<string>('')
	const { register, user, error } = useContext(AuthContext)

	const handleSubmit = (e: any) => {
		e.preventDefault()
		if (password !== passwordConfirm) {
			toast.error('Please fill all fields')

			console.log({ password, passwordConfirm })
		}
		register({ user: { email, password, username } })
	}
	return (
		<Layout title='User Registration'>
			<ToastContainer
				position='top-right'
				autoClose={500}
				hideProgressBar={true}
				newestOnTop={false}
				closeOnClick
				rtl={false}
			/>
			<div className={styles.auth}>
				<h1>
					<FaUser /> Register
				</h1>
				<form onSubmit={handleSubmit}>
					<div>
						<label htmlFor='username'>Username</label>
						<input
							type='text'
							id='username'
							name='username'
							value={username}
							autoComplete='username'
							onChange={(e) => setUsername(e.target.value)}
						/>
					</div>
					<div>
						<label htmlFor='email'>Email</label>
						<input
							type='email'
							id='email'
							name='email'
							value={email}
							autoComplete='email'
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>
					<div>
						<label htmlFor='password'>Password</label>
						<input
							type='password'
							id='password'
							name='password'
							value={password}
							autoComplete='new-password'
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>
					<div>
						<label htmlFor='passwordConfirm'>Confirm Password</label>
						<input
							type='password'
							id='passwordConfirm'
							name='passwordConfirm'
							value={passwordConfirm}
							autoComplete='new-password'
							onChange={(e) => setPasswordConfirm(e.target.value)}
						/>
					</div>
					<input type='submit' value='Login' className='btn' />
				</form>
				<p>
					Already have a account ?<Link href='/account/login'> Login</Link>
				</p>
			</div>
		</Layout>
	)
}

export default RegisterPage
