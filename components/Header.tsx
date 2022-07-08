import Link from 'next/link'
import React, { useContext } from 'react'
import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa'
import styles from '@/styles/Header.module.css'
import AuthContext from '@/context/AuthContext'
import Search from './Search'

interface Props {}

const Header: React.FC<Props> = (props) => {
	const { user, logout, login } = useContext(AuthContext)
	return (
		<header className={styles.header}>
			<div className={styles.logo}>
				<Link href='/'>
					<a className=''>MusicEvent</a>
				</Link>
			</div>
			<Search />
			<nav>
				<ul>
					{/* <li>
						<Link href='/artists'>Artists</Link>
					</li> */}
					{/* <li>
						<Link href='/locations'>Locations</Link>
					</li> */}
					<li>
						<Link href='/events'>Events</Link>
					</li>

					{user ? (
						<>
							<li>
								<Link href='/events/add'>Add event</Link>
							</li>
							<li>
								<Link href='/account/dashboard'>Dashboard</Link>
							</li>
							<li>
								<button className='btn-secondary btn-icon' onClick={() => logout()}>
									<FaSignOutAlt />
									Log out
								</button>
							</li>
						</>
					) : (
						<li>
							<Link href='/account/login'>
								<a className='btn-secondary btn-icon'>
									<FaSignInAlt />
									Log in
								</a>
							</Link>
						</li>
					)}
				</ul>
			</nav>
		</header>
	)
}

export default Header
