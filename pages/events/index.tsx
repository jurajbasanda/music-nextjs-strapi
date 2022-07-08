import Layout from '@/components/Layout'
import { API_URL } from '@/config/index'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next/types'
import type { NextPage } from 'next'
import { Events, MetaPagination } from '@/interfaces/events'
import EventItem from '@/components/common/EventItem'
import Link from 'next/link'

interface Props {
	events?: Array<Events>
	metaPagination: MetaPagination
}
const EventsPage: NextPage<Props> = ({ events, metaPagination }) => {
	return (
		<Layout>
			<h1>Upcomming Events</h1>
			{events?.length === 0 && <h2>No new events</h2>}
			{events?.map((e: Events) => (
				<EventItem key={e.id} event={e} />
			))}
			<div className='display-flex-row-spaceBetween'>
				{metaPagination?.page > 1 && (
					<Link href={`/events?page=${metaPagination?.page - 1}`}>
						<a className='btn-secondary'>{`<`}</a>
					</Link>
				)}
				{metaPagination?.pageCount > 1 &&
					metaPagination?.page < metaPagination?.pageCount && (
						<Link href={`/events?page=${metaPagination?.page + 1}`}>
							<a className='btn-secondary'>{`>`}</a>
						</Link>
					)}
			</div>
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
				pageSize: 2,
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
	const metaPagination = eventsData.meta.pagination

	if (!events) {
		return {
			notFound: true,
		}
	}
	return {
		props: { events, metaPagination },
	}
}
