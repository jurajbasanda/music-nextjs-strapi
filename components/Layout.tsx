import Head from 'next/head'
import React from 'react'
import { useRouter } from 'next/router'
//style
import Footer from './Footer'
import Header from './Header'
import Showcase from './Showcase'
import styles from '@/styles/Layout.module.css'

interface Props {
	title?: String
	keywords?: any
	description?: any
	children: React.ReactNode
}

const Layout: React.FC<Props> = ({ title, keywords, description, children }) => {
	const router = useRouter()
	return (
		<>
			<Head>
				<title>{title}</title>
				<meta name='description' content={description} />
				<meta name='keywords' content={keywords} />
			</Head>
			<Header />
			{router.asPath === '/' && <Showcase />}
			<div className={styles.container}>{children}</div>
			<Footer />
		</>
	)
}

Layout.defaultProps = {
	title: 'Title',
	description: 'description',
	keywords: 'music, events',
}

export default Layout
