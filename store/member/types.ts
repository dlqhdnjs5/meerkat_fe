export interface MemberState {
	memberProfile: MemberProfile
}

export interface MemberProfile {
	memberNo: string
	email: string
	notificationEmail: string
	name: string
	imgPath: string
	statusCode: 'USER' | 'ADMIN'
	typeCode: 'ACTIVE' | 'BLOCK'
	lastLoginTime: string
	jwtToken: string
}