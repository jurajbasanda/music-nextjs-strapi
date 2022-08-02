import type { NextPage } from 'next'
import { GetServerSideProps } from 'next/types'
import Link from 'next/link'
import { API_URL } from '@/config/index'
import Layout from '@/components/Layout'
import EventItem from '@/components/common/EventItem'
import { Events } from '@/interfaces/events'

interface Props {
	events?: Array<Events>
}
const Home: NextPage<Props> = ({ events }) => {
	return (
		<Layout title='Home'>
			<h2>Upcomming Events</h2>
			{events?.length === 0 && <h2>No new events</h2>}
			{events && events?.map((e: Events) => <EventItem key={e.id} event={e} />)}
			{events && (
				<Link href='/events'>
					<a className='btn-secondary'>View more</a>
				</Link>
			)}
		</Layout>
	)
}

Home.defaultProps = {
	events: [],
}

export default Home

export const getServerSideProps: GetServerSideProps = async (context) => {
	const qs = require('qs')
	const pagination = qs.stringify(
		{
			pagination: {
				page: 1,
				pageSize: 3,
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
	const json = await res.json()
	const events = json.data

	if (!events) {
		return {
			notFound: true,
		}
	}
	return {
		props: { events },
	}
}
