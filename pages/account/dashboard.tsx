import React from 'react'
import type { NextPage } from 'next'
import { ToastContainer } from 'react-toastify'
import Layout from '@/components/Layout'

interface Props {}

const Dashboard: NextPage<Props> = (props) => {
	return (
		<Layout title='User Dashboard'>
			<ToastContainer
				position='top-right'
				autoClose={500}
				hideProgressBar={true}
				newestOnTop={false}
				closeOnClick
				rtl={false}
			/>
			Dashboard
		</Layout>
	)
}

export default Dashboard
