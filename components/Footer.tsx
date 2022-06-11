import React from 'react'
import styles from '@/styles/Footer.module.css'

interface Props {}

const Footer: React.FC<Props> = (props) => {
	return (
		<footer className={styles.footer}>
			<p>Copyright &copy; {new Date().getFullYear()} </p>
		</footer>
	)
}

export default Footer
