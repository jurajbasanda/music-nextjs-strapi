import { NextPage } from 'next/types'
import Link from 'next/link'
import { FormEventHandler, useState, useEffect, useContext } from 'react'
import { FaUser } from 'react-icons/fa'
import { ToastContainer, toast } from 'react-toastify'

import Layout from '@/components/Layout'
import styles from '@/styles/AuthForm.module.css'
import AuthContext from '@/context/AuthContext'

interface Props {}

const LoginPage: NextPage<Props> = () => {
	const [email, setEmail] = useState<string>('')
	const [password, setPassword] = useState<string>('')
	const { login, user, error } = useContext(AuthContext)

	useEffect(() => {
		error &&
			toast.error(error.message, {
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			})
	})

	const handleSubmit = (e: any) => {
		e.preventDefault()
		if (password === '' || email === '') {
			toast.error('Passwords do not match !')
		}
		login({ email: email, password: password })
	}
	return (
		<>
			<Layout title='User Login'>
				<div className={styles.auth}>
					<h1>
						<FaUser /> Log in
					</h1>
					<ToastContainer
						position='top-right'
						autoClose={500}
						hideProgressBar={true}
						newestOnTop={false}
						closeOnClick
						rtl={false}
					/>
					<form onSubmit={handleSubmit}>
						<div>
							<label htmlFor='email'>Email</label>
							<input
								type='email'
								id='email'
								name='email'
								autoComplete='current-email'
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
						</div>
						<div>
							<label htmlFor='password'>Password</label>
							<input
								type='password'
								id='password'
								name='password'
								autoComplete='current-password'
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
						</div>
						<input type='submit' value='Login' className='btn' />
					</form>
					<p>
						I you don{"'"}t have account ?{' '}
						<Link href='/account/register'>Register here</Link>
					</p>
				</div>
			</Layout>
		</>
	)
}

export default LoginPage
