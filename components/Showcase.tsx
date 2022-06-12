import React from 'react'
import styles from '@/styles/Showcase.module.css'

interface Props {}

const Showcase: React.FC<Props> = (props) => {
	return (
		<div className={styles.showcase}>
			<h2>Find your perfect concert wherever you are</h2>
			<h3>Discover the best live music, tailored to your music taste.</h3>
		</div>
	)
}

export default Showcase
