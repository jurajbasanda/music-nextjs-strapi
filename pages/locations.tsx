import React from 'react'
//styles
import styles from '@/styles/Locations.module.css'
//components
import Layout from '@/components/Layout'
interface Props {
	locations?: Array<String>
}

const LocationsPage: React.FC<Props> = ({ locations }) => {
	return (
		<Layout>
			<div className={styles.locationsContainer}>
				<ul>
					{locations?.map((location: any) => (
						<li key={location}>{location}</li>
					))}
				</ul>
			</div>
		</Layout>
	)
}

LocationsPage.defaultProps = {
	locations: ['London', 'Glasgow'],
}

export default LocationsPage
