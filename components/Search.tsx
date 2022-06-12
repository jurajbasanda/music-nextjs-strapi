import { useState } from 'react'
import { useRouter } from 'next/router'
import styles from '@/styles/Search.module.css'

interface Props {}

const Search: React.FC<Props> = (props) => {
	const [term, setTerm] = useState<string>('')
	const router = useRouter()

	const handleSubmit = (e: any) => {
		e.preventDefault()
		router.push(`/events/search?term=${term}`)
		setTerm('')
	}
	return (
		<div className={styles.search}>
			<form onSubmit={handleSubmit}>
				<input
					value={term}
					type='text'
					onChange={(e) => setTerm(e.target.value)}
					placeholder='Search Event/Artist or Venue'
				/>
			</form>
		</div>
	)
}

export default Search
