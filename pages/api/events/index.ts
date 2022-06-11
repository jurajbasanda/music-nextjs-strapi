// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

const { events } = require('./data.json')

type Data = {
	name?: String
	message: any
}

const Handler = (req: NextApiRequest, res: NextApiResponse<Data>) => {
	if (req.method === 'GET') {
		res.status(200).json(events)
	} else {
		res.setHeader('Allow', ['GET'])
		res.status(405).json({ message: `Method ${req.method} is not allowed!` })
	}
}

export default Handler
