import Link from 'next/link'
import Image from 'next/image'
//styles
import styles from '@/styles/EventItem.module.css'
//components
import { Event } from '../interfaces'

interface Props {
	event: Event
}

const EventItem: React.FC<Props> = ({ event }) => {
	return (
		<div className={styles.event}>
			<div className={styles.img}>
				<Image
					src={event.image ? event.image : '/images/gig-placeholder.jpeg'}
					alt={event.performers}
					width='200'
					height='110'
				/>
			</div>
			<div className={styles.info}>
				<span>
					{event.date} at {event.time}
				</span>
				<h3>{event.name}</h3>
			</div>
			<div className={styles.link}>
				<Link href={`/events/${event.slug}`}>
					<a className='btn'>Details</a>
				</Link>
			</div>
		</div>
	)
}

export default EventItem
