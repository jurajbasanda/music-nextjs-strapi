import { useState } from 'react'
import { useRouter } from 'next/router'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Link from 'next/link'
import { API_URL } from '@/config/index'
import type { NextPage } from 'next'
import { EventsAttributes } from '@/interfaces/index'
import Layout from '@/components/Layout'
//styles
import styles from '@/styles/Form.module.css'

const AddPage: NextPage = () => {
	const router = useRouter()
	const [values, setValues] = useState<any>({
		name: '',
		venue: '',
		address: '',
		date: '',
		time: '',
		performers: '',
		description: '',
	})
	const handleSubmit = async (e: any) => {
		const isEmpty = Object.values(values).some((value): any => value === '')
		const data = { data: { ...values } }

		e.preventDefault()
		if (isEmpty) {
			toast.error('Please fill all fields')
		} else {
			const res = await fetch(`${API_URL}/api/events`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(data),
			})
			if (!res.ok) {
				toast.error('Something Went Wrong')
			} else {
				const ev = await res.json()

				router.push(`/events/${ev.data.attributes.slug}`)
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
			<h2>Add</h2>
			<ToastContainer
				position='top-right'
				autoClose={500}
				hideProgressBar={true}
				newestOnTop={false}
				closeOnClick
				rtl={false}
			/>
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
						<label htmlFor='name'>Date:</label>
						<input
							type='date'
							name='date'
							id='date'
							value={values.date}
							onChange={handleInputChange}
						/>
					</div>
					<div>
						<label htmlFor='name'>Time:</label>
						<input
							type='time'
							name='time'
							id='time'
							value={values.time}
							onChange={handleInputChange}
						/>
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
				</div>
				<input type='submit' value='Add New Event' className='btn' />
			</form>
		</Layout>
	)
}

export default AddPage
