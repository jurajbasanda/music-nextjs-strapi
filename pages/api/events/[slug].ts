// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

const { events } = require('./data.json')

type Data = {
	name?: string
	message: any
}

const Handler = (req: NextApiRequest, res: NextApiResponse<Data>, slug: string) => {
	const item = events.filter((event: { slug: string }) => event.slug === req.query.slug)
	const show = item == ![] ? { message: `Event ${req.query.slug} doesn't exist!` } : item

	if (req.method === 'GET') {
		res.status(200).json(show)
	} else {
		res.setHeader('Allow', ['GET'])
		res.status(405).json({
			message: `Method ${req.method} is not allowed!`,
		})
	}
}

export default Handler
