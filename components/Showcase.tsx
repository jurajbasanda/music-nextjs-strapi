import React from 'react'
import styles from '@/styles/Showcase.module.css'

interface Props {}

const Showcase: React.FC<Props> = (props) => {
	return (
		<div className={styles.showcase}>
			<h1>Welcome</h1>
			<h2>Find gig for you</h2>
		</div>
	)
}

export default Showcase
