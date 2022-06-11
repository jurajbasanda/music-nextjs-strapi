import type { GetServerSideProps, NextPage } from 'next'
import Image from 'next/image'
import { FaPencilAlt, FaTimes } from 'react-icons/fa'
//styles
import Styles from '@/styles/Event.module.css'
//components
import Layout from '@/components/Layout'
import { API_URL } from '@/config/index'
import { Event } from '@/interfaces/index'
import Link from 'next/link'

interface Props {
	event: Event
}
const deleteEvent = () => {
	alert('Delete')
}

const EventPage: NextPage<Props> = ({ event }) => {
	return (
		<Layout>
			<div className={Styles.event}>
				<div className=''>
					<span>
						{event.date} at {event.time}
					</span>
					<h1>{event.name}</h1>
					{event.image && (
						<div className={Styles.image}>
							<Image src={event.image} alt={event.name} width='960' height='600' />
						</div>
					)}
					<h3>Performers:</h3>
					<p>{event.performers}</p>
					<h3>Description:</h3>
					<p>{event.description}</p>
					<h3>Venue: {event.venue}</h3>
					<p>{event.address}</p>
				</div>
			</div>
			<div className={Styles.controls}>
				<Link href={`/events/edit/${event.id}`}>
					<a>
						<FaPencilAlt /> Edit Event
					</a>
				</Link>
				<a href='#' onClick={deleteEvent} className={Styles.delete}>
					<FaTimes /> Delete Event
				</a>
			</div>
			<div>
				<Link href='/events'>
					<a href={Styles.back}>{'<'} Go back</a>
				</Link>
			</div>
		</Layout>
	)
}

export default EventPage

export const getServerSideProps: GetServerSideProps = async ({ query: { slug } }) => {
	const res = await fetch(`${API_URL}/api/events/${slug}`)
	const events: [Event] = await res.json()

	if (!events) {
		return {
			notFound: true,
		}
	}
	return {
		props: { event: events[0] },
	}
}
