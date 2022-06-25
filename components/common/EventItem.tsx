import Link from 'next/link'
import Image from 'next/image'
//styles
import styles from '@/styles/EventItem.module.css'
//components
import { Events, EventsAttributes } from '../../interfaces'
import moment from 'moment'

interface Props {
	event: Events
	attributes?: EventsAttributes
}

const EventItem: React.FC<Props> = ({ event }) => {
	const { attributes } = event
	return (
		<div className={styles.event}>
			<div className={styles.img}>
				{event.attributes.image.data && (
					<Image
						src={
							attributes.image
								? attributes.image.data.attributes.formats.thumbnail.url
								: '/images/gig-placeholder.jpeg'
						}
						alt={attributes.name}
						width='200'
						height='100'
					/>
				)}
			</div>
			<div className={styles.info}>
				<span>
					<>
						{event && moment(attributes.date).format(`ddd DD MMM`)} at{' '}
						{/* {event && moment(attributes.time).format(`HH:mm`)} */}
					</>
				</span>
				<h3>{attributes.name}</h3>
			</div>
			<div className={styles.link}>
				{event && (
					<Link href={`/events/${attributes.slug}`}>
						<a className='btn'>Details</a>
					</Link>
				)}
			</div>
		</div>
	)
}

export default EventItem
