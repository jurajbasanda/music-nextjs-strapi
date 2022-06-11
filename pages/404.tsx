import { FaExclamationTriangle } from 'react-icons/fa'
import Link from 'next/link'
import React from 'react'
import Layout from '@/components/Layout'
import styles from '@/styles/404.module.css'

interface Props {}

const NotFoundPage: React.FC<Props> = (props) => {
	return (
		<Layout>
			<div className={styles.error}>
				<h1>
					<FaExclamationTriangle /> 404
				</h1>
				<h3>Page not found</h3>
				<Link href='/'>Go back</Link>
			</div>
		</Layout>
	)
}

export default NotFoundPage
