import { API_URL } from '@/config/index'

const Login = async (req: any, res: any) => {
	if (req.method === 'POST') {
		const { identifier, password } = req.body
		const strapiRes = await fetch(`${API_URL}/api/auth/local`, {
			method: 'POST',
			headers: { 'Content-type': 'application/json' },
			body: JSON.stringify({ identifier, password }),
		})
		const data = await strapiRes.json()
		if (strapiRes.ok) {
			res.status(200).json({ user: data.user })
		} else {
			res.status(data.error.status).json({ error: data.error })
		}
	} else {
		res.setHeader('Allow', ['POST'])
		res.status(405).json({ message: `Method ${req.method} not allowed!` })
	}
}
export default Login
