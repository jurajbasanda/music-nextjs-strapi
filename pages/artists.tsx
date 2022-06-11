import React from 'react'
//styles
import styles from '@/styles/Locations.module.css'
//components
import Layout from '@/components/Layout'
interface Props {
	artists?: Array<String>
}

const ArtistsPage: React.FC<Props> = ({ artists }) => {
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
