import React from 'react'
//styles
import type { NextPage } from 'next'
import Layout from '@/components/Layout'
import styles from '@/styles/Locations.module.css'

interface Props {
	artists?: Array<String>
}

const ArtistsPage: NextPage<Props> = ({ artists }) => {
	return (
		<Layout>
			<div className={styles.locationsContainer}>
				<ul>
					{artists?.map((artist: any) => (
						<li key={artist}>{artist}</li>
					))}
				</ul>
			</div>
		</Layout>
	)
}

ArtistsPage.defaultProps = {
	artists: ['Slipknot', 'A day to remember', 'Metalica', 'AC/DC'],
}

export default ArtistsPage
