import type { NextPage } from 'next'
import Layout from '@/components/Layout'
import styles from '@/styles/Locations.module.css'

interface Props {
	locations?: Array<String>
}

const LocationsPage: NextPage<Props> = ({ locations }) => {
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
