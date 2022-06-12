import Link from 'next/link'
import React from 'react'
import styles from '@/styles/Header.module.css'
import Search from './Search'

interface Props {}

const Header: React.FC<Props> = (props) => {
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
					<li>
						<Link href='/artists'>Artists</Link>
					</li>
					<li>
						<Link href='/events'>Events</Link>
					</li>
					<li>
						<Link href='/locations'>Locations</Link>
					</li>
				</ul>
			</nav>
		</header>
	)
}

export default Header
