export interface UserRegistrationReq {
	user: { password: string; email: string; username: string }
}
export interface LoginDetails {
	password: string
	email: string
}
export interface UserLoginErrorRes {
	status: number
	name: string
	message: string
	details: {}
}
export interface UserRegistrationRes {
	data: {} | null
	error?: UserLoginErrorRes | null
}
