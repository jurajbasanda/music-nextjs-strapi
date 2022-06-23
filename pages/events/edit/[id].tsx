import { FormEventHandler, useState } from 'react'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import moment from 'moment'
import { FaImage } from 'react-icons/fa'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Link from 'next/link'
import { API_URL } from '@/config/index'
import type { NextPage } from 'next'
import { Events } from '@/interfaces/index'
import Layout from '@/components/Layout'
//styles
import styles from '@/styles/Form.module.css'
import Image from 'next/image'

interface Props {
	event: Events
}

const EditEventPage: NextPage<Props> = ({ event }) => {
	const router = useRouter()
	const { query } = router
	const { attributes } = event

	const [values, setValues] = useState<any>({
		name: attributes?.name,
		venue: attributes?.venue,
		address: attributes?.address,
		date: attributes?.date,
		time: attributes?.time,
		performers: attributes?.performers,
		description: attributes?.description,
	})
	const [imagePreview, setImagePreview] = useState<any>(
		attributes.image.data ? attributes.image.data.attributes.formats.thumbnail : null
	)

	const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
		const isEmpty = Object.values(values).some((value): any => value === '')
		const checkIfTimeChanged =
			values.time !== attributes.time ? `${values.time}:00:000` : values.time
		const data = {
			data: {
				...values,
				time: checkIfTimeChanged,
			},
		}

		e.preventDefault()
		if (isEmpty) {
			toast.error('Please fill all fields')
		} else {
			const res = await fetch(`${API_URL}/api/events/${query.id}`, {
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(data),
			})
			if (!res.ok) {
				toast.error('Something Went Wrong')
			} else {
				const ev = await res.json()

				router.push(`/events/${attributes.slug}`)
			}
		}
	}

	const handleInputChange = (e: any) => {
		const { name, value } = e.target
		setValues({ ...values, [name]: value })
	}
	return (
		<Layout title='New Event'>
			<Link href='/'>
				<a>{`<`}Go Back</a>
			</Link>
			<h2>Edit</h2>
			<ToastContainer
				position='top-right'
				autoClose={500}
				hideProgressBar={true}
				newestOnTop={false}
				closeOnClick
				rtl={false}
			/>
			{attributes && (
				<>
					<form className={styles.form} onSubmit={handleSubmit}>
						<div className={styles.grid}>
							<div>
								<label htmlFor='name'>Event Name:</label>
								<input
									type='text'
									name='name'
									id='name'
									value={values.name}
									onChange={handleInputChange}
								/>
							</div>
							<div>
								<label htmlFor='name'>Performers:</label>
								<input
									type='text'
									name='performers'
									id='performers'
									value={values.performers}
									onChange={handleInputChange}
								/>
							</div>
							<div>
								<label htmlFor='name'>Event Venue:</label>
								<input
									type='text'
									name='venue'
									id='venue'
									value={values.venue}
									onChange={handleInputChange}
								/>
							</div>
							<div>
								<label htmlFor='name'>Address:</label>
								<input
									type='text'
									name='address'
									id='address'
									value={values.address}
									onChange={handleInputChange}
								/>
							</div>

							<div>
								<label htmlFor='date'>Date:</label>
								<input
									type='date'
									name='date'
									id='date'
									value={moment(values.date).format('yyyy-MM-DD')}
									onChange={handleInputChange}
								/>
							</div>
							<div>
								<label htmlFor='time'>Time:</label>
								<input
									type='time'
									name='time'
									id='time'
									value={moment(`2000-01-01T${values.time}`).format('HH:mm')}
									onChange={handleInputChange}
								/>
							</div>
						</div>
						<div>
							<label htmlFor='name'>Description:</label>
							<textarea
								name='description'
								id='description'
								value={values.description}
								onChange={handleInputChange}
							/>
						</div>
						<input type='submit' value='Update Event' className='btn' />
					</form>
					<div>
						{imagePreview ? (
							<div>
								<p>Event Image:</p>
								<Image
									src={imagePreview.url}
									width={245}
									height={138}
									alt={imagePreview.hash}
									id='image'
								/>
							</div>
						) : (
							<p>No image uploaded</p>
						)}
						<button className='btn-secondary'>
							<FaImage /> Set Image
						</button>
					</div>
				</>
			)}
		</Layout>
	)
}

export default EditEventPage

export const getServerSideProps: GetServerSideProps = async ({ params: { id } }: any) => {
	const res = await fetch(`${API_URL}/api/events?filters[id]id=${id}&populate=*`)
	const ev = await res.json()

	return { props: { event: ev.data[0] } }
}
