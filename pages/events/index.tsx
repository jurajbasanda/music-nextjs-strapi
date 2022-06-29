import Layout from '@/components/Layout'
import { API_URL } from '@/config/index'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next/types'
import type { NextPage } from 'next'
import { Events } from '@/interfaces/index'
import EventItem from '@/components/common/EventItem'
import { useRouter } from 'next/router'

interface Props {
	events?: Array<Events>
}
const EventsPage: NextPage<Props> = ({ events }) => {
	const route = useRouter()

	const { query } = route

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

export const getServerSideProps: GetServerSideProps = async ({ query: { page } }) => {
	const qs = require('qs')
	const pagination = qs.stringify(
		{
			pagination: {
				page: page,
				pageSize: 1,
			},
		},
		{
			encodeValuesOnly: true,
		}
	)
	const sortByDate = qs.stringify(
		{
			sort: ['date'],
		},
		{
			encodeValuesOnly: true,
		}
	)
	const res = await fetch(`${API_URL}/api/events?populate=*&${sortByDate}&${pagination}`)
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
