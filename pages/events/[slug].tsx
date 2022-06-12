import type { GetServerSideProps, NextPage } from 'next'
import Image from 'next/image'
import { FaPencilAlt, FaTimes } from 'react-icons/fa'
//styles
import Styles from '@/styles/Event.module.css'
//components
import Layout from '@/components/Layout'
import { API_URL } from '@/config/index'
import { Events } from '@/interfaces/index'
import Link from 'next/link'

interface Props {
	event: Events
}
const deleteEvent = () => {
	alert('Delete')
}

const EventPage: NextPage<Props> = ({ event }) => {
	const { attributes } = event
	return (
		<Layout>
			<div className={Styles.event}>
				<div className=''>
					<span>
						{event && new Date(attributes.date).toLocaleDateString('en-GB')} at{' '}
						{attributes.time}{' '}
					</span>
					<h1>{attributes.name}</h1>
					{attributes.image && (
						<div className={Styles.image}>
							<Image
								src={attributes.image.data.attributes.formats.medium.url}
								alt={attributes.name}
								width='960'
								height='500'
							/>
						</div>
					)}
					<h3>Performers:</h3>
					<p>{attributes.performers}</p>
					<h3>Description:</h3>
					<p>{attributes.description}</p>
					<h3>Venue: {attributes.venue}</h3>
					<p>{attributes.address}</p>
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
	const res = await fetch(`${API_URL}/api/events?filters[slug]slug=${slug}&populate=*`)
	const eventsData = await res.json()
	const events = eventsData.data

	if (!events) {
		return {
			notFound: true,
		}
	}
	return {
		props: { event: events[0] },
	}
}
