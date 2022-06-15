import React from 'react'

interface Props {
	name: string
	title: string
}

const LabelUI: React.FC<Props> = ({ name, title }) => {
	return <label htmlFor={name}>{title}:</label>
}

export default LabelUI
