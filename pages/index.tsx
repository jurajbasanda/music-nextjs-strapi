import type { NextPage } from 'next'
import { GetServerSideProps } from 'next/types'
//componets
import Link from 'next/link'
import { API_URL } from '@/config/index'
import Layout from '@/components/Layout'
import EventItem from '@/components/EventItem'
import { Event } from '@/interfaces/index'

interface Props {
	events?: Array<Event>
}
const Home: NextPage<Props> = ({ events }) => {
	return (
		<Layout>
			<h1>Upcomming Events</h1>
			{events?.length === 0 && <h2>No new events</h2>}
			{events?.map((e: Event) => (
				<EventItem key={e.id} event={e} />
			))}
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
	const res = await fetch(`${API_URL}/api/events`)
	const events: [Event] = await res.json()

	if (!events) {
		return {
			notFound: true,
		}
	}
	return {
		props: { events: events.slice(0, 4) },
	}
}
