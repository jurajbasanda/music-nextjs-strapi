import type { GetServerSideProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { FaPencilAlt, FaTimes } from 'react-icons/fa'
//styles
import Styles from '@/styles/Event.module.css'
//components
import Layout from '@/components/Layout'
import { API_URL } from '@/config/index'
import { Events } from '@/interfaces/index'
import Link from 'next/link'
import { MouseEventHandler } from 'react'
import moment from 'moment'

interface Props {
	event: Events
}

const EventPage: NextPage<Props> = ({ event }) => {
	const { attributes, id } = event
	const router = useRouter()
	const deleteEvent: MouseEventHandler<HTMLAnchorElement> = async (e) => {
		if (confirm('Are you sure ?')) {
			const res = await fetch(`${API_URL}/api/events/${id}`, { method: 'DELETE' })
			const data = await res.json()

			if (!res.ok) {
				toast.error(data.message)
			} else {
				router.push('/events')
			}
		}
	}

	return (
		<Layout>
			<div className={Styles.event}>
				<div>
					<Link href='/events'>
						<a href={Styles.back}>{'<'} Go back</a>
					</Link>
				</div>
				<div className=''>
					{event && (
						<span>
							<>
								{moment(attributes.date).format('ddd DD MMM yyyy')} at {attributes.time}
							</>
						</span>
					)}
					<ToastContainer
						position='top-right'
						autoClose={500}
						hideProgressBar={true}
						newestOnTop={false}
						closeOnClick
						rtl={false}
					/>
					<h1>{attributes.name}</h1>
					{attributes.image.data?.attributes && (
						<div className={Styles.image}>
							<Image
								src={attributes.image.data?.attributes?.formats.medium.url}
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
