import type { NextPage } from 'next'
import { GetServerSideProps } from 'next/types'
//componets
import Link from 'next/link'
import { API_URL } from '@/config/index'
import Layout from '@/components/Layout'
import EventItem from '@/components/EventItem'
import { Events } from '@/interfaces/index'

interface Props {
	events?: Array<Events>
}
const Home: NextPage<Props> = ({ events }) => {
	return (
		<Layout>
			<h1>Upcomming Events</h1>
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
	const res = await fetch(`${API_URL}/api/events?populate=*&_sort=date:ASC&_limit=3`)
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
