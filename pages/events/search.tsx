import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import Layout from '@/components/Layout'
import { API_URL } from '@/config/index'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next/types'
import { Events } from '@/interfaces/index'
import EventItem from '@/components/EventItem'
//styles
import styles from '@/styles/SearchPage.module.css'
import Link from 'next/link'

interface Props {
	events?: Array<Events>
}
const SearchPage: NextPage<Props> = ({ events }) => {
	const router = useRouter()
	return (
		<Layout title='Search Results'>
			<Link href='/'>
				<a>{`<`} Go Back</a>
			</Link>
			<h3>
				Search results for: <i className={styles.term}>{router.query.term}</i>
			</h3>
			{events?.length === 0 && <h2>No new events</h2>}
			{events?.map((e: Events) => (
				<EventItem key={e.id} event={e} />
			))}
		</Layout>
	)
}

SearchPage.defaultProps = {
	events: [],
}

export default SearchPage

export const getServerSideProps: GetServerSideProps = async ({ query: { term } }) => {
	const qs = require('qs')
	const pagination = qs.stringify(
		{
			pagination: {
				page: 1,
				pageSize: 10,
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
	const query = qs.stringify(
		{
			filters: {
				$or: [
					{
						name: {
							$containsi: `${term}`,
						},
					},
					{
						venue: {
							$containsi: `${term}`,
						},
					},
					{
						performers: {
							$containsi: `${term}`,
						},
					},
				],
			},
		},
		{
			encodeValuesOnly: true,
		}
	)
	const res = await fetch(
		`${API_URL}/api/events?${query}&populate=*&${sortByDate}&${pagination}`
	)
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
