import type { NextPage } from 'next'
import Layout from '@/components/Layout'
import { API_URL } from '@/config/index'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next/types'
import { Events } from '@/interfaces/index'
import EventItem from '@/components/EventItem'

interface Props {
	events?: Array<Events>
}
const EventsPage: NextPage<Props> = ({ events }) => {
	return (
		<Layout>
			<h1>Upcomming Events</h1>
			{events?.length === 0 && <h2>No new events</h2>}
			{events?.map((e: Events) => (
				<EventItem key={e.id} event={e} />
			))}
		</Layout>
	)
}

EventsPage.defaultProps = {
	events: [],
}

export default EventsPage

export const getServerSideProps: GetServerSideProps = async (context) => {
	const res = await fetch(`${API_URL}/api/events?populate=*&_sort=date:ASC`)
	const eventsData = await res.json()
	const events = eventsData.data

	if (!events) {
		return {
			notFound: true,
		}
	}
	return {
		props: { events },
	}
}
