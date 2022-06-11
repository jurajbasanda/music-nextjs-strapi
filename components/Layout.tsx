import Head from 'next/head'
import React from 'react'

interface Props {
	title: String
	keywords: any
	description: any
	children: React.ReactNode
}

const Layout: React.FC<Props> = ({ title, keywords, description, children }) => {
	return (
		<>
			<Head>
				<title>{title}</title>
				<meta name='description' content={description} />
				<meta name='keywords' content={keywords} />
			</Head>
			{children}
		</>
	)
}
