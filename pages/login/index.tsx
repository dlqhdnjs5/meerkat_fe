import { NextPage } from 'next';
import { memberApi } from '../../api/member-api';
import { useDispatch } from 'react-redux';
import { resetMemberProfile, setMemberProfile } from '@/store/member/slice';
import {useRouter} from "next/router";
import {deleteCookie, setCookie} from "@/utils/cookieUtils";



const Login: NextPage = () => {
	window.onload = () => {
		const pattern = /status=([^&]+)/;
		const result = router.asPath.match(pattern);
		let loginStatus = ''

		if (result) {
			loginStatus = result[1];
		}

		if (loginStatus === 'NONE') {
			kakaoLogout(true)
		}
	};

	const router = useRouter()
	const dispatch = useDispatch()

	const kakaoLogin = async () => {
		if (await isKakaoUserConnected()) {
			alert('이미 로그인 되어있습니다.')
			return
		}

		window.Kakao.Auth.login({
			scope: 'profile_nickname, account_email, profile_image',
			success: (auth: any) => {
				console.log('auth :', auth)
				window.Kakao.API.request({
					url:'/v2/user/me',
					success: async (response: any) => {
						if (!response.kakao_account.email) {
							alert('해당 계정의 이메일이 존재하지 않습니다.\n원활한 서비스 사용을 위해 이메일 수집을 체크해 주세요.')
							await kakaoRemoval()
							setKakaoAccessToken(null)
						}

						const kakaoAccount = response.kakao_account
						const loginParam = {
							email: kakaoAccount.email,
							name: kakaoAccount.profile.nickname,
							imgPath: kakaoAccount.profile.thumbnail_image_url
						}

						const memberResponse = await memberApi.loginMember(loginParam).catch(reason => {
							alert('로그인중 오류가 발생하였습니다.')
							kakaoLogout(false)
						})

						if (memberResponse) {
							dispatch(setMemberProfile(memberResponse))
							setCookie('access_token', memberResponse.jwtToken, 1)
							// TODO 대시보드나 다른곳으로 가게 할것. router.push('/');
						}
					}
				})
			},
			fail: (error: any) => {
				alert('로그인중 오류가 발생하였습니다.')
			}
		})
	}

	const kakaoInfo = () => {
		console.log(window.Kakao.Auth.getAccessToken())
		console.log(window.Kakao.Auth.getStatusInfo((response: any) => {
			console.log('status: ', response)
		}))
	}

	const isKakaoUserConnected = async () => {
		return await getKakaoStatusInfo()
			.then((connectedStatus: any) => {
				return connectedStatus
			})
	}

	const getKakaoStatusInfo = () => {
		return new Promise(resolve => {
			window.Kakao.Auth.getStatusInfo((response: any) => {
				resolve(response.status === 'connected')
			})
		})
	}

	const kakaoLogout = async (isAlert?: boolean) => {
		const isConnected = await isKakaoUserConnected()

		if (!isConnected) {
			if (isAlert) {
				alert('로그인이 되어있지 않습니다.')
			}

			return
		}

		window.Kakao.Auth.logout()
		removeJwtAccessToken()
		dispatch(resetMemberProfile())
	}

	const apiTest = async () => {
		await memberApi.testMember()
	}

	const kakaoRemoval = async () => {
		const isConnected = await isKakaoUserConnected()

		if (!isConnected) {
			alert('로그인이 되어있지 않습니다.')
			return
		}

		window.Kakao.API.request({
			url: '/v1/user/unlink',
			success: () => {
				alert('성공적으로 카카오 계정과의 연결을 종료하였습니다.')
				setKakaoAccessToken(null)
				removeJwtAccessToken()
				dispatch(resetMemberProfile())
			},
			fail: (error: any) => {
				alert('카카오 계정 연결 종료 처리중 오류가 발생하였습니다.\n관리자에게 문의 바랍니다.')
				console.log(error)
			}
		})
	}

	const setKakaoAccessToken = (token: string | null) => {
		window.Kakao.Auth.setAccessToken(token)
	}

	const removeJwtAccessToken = () => {
		deleteCookie('access_token')
	}

	const containerStyle: React.CSSProperties = {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		textAlign: 'center',
		padding: '20px',
		border: '1px solid #ccc',
		borderRadius: '8px',
		boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
		backgroundColor: 'rgba(255, 255, 255, 0.8)',
		maxWidth: '400px',
		width: '100%',
		margin: 'auto',
	};

	const buttonStyle: React.CSSProperties = {
		backgroundColor: '#FFEB00',
		color: '#000',
		padding: '10px 20px',
		fontSize: '16px',
		border: 'none',
		borderRadius: '4px',
		cursor: 'pointer',
		transition: 'background-color 0.3s ease',
	};

	const fullPageStyle: React.CSSProperties = {
		minHeight: '100vh',
		background: 'linear-gradient(45deg, #FF6B8B, #56CCF2)',
	};


	return (
		<>
			<div style={fullPageStyle}>
				{/*<KakaoLogin/>*/}
				<div style={containerStyle}>
					<h2 style={{ color: '#333' }}>Welcome to Kakao Login</h2>
					<button style={buttonStyle}>Login with Kakao</button>
					<button onClick={kakaoLogin}>
						로그인
					</button>
					<button onClick={kakaoInfo}>
						정봏
					</button>
					<button onClick={() => kakaoLogout(true)}>
						로그아웃
					</button>
					<button onClick={kakaoRemoval}>
						완전 로그아웃
					</button>
					<button onClick={apiTest}>
						api 테스트
					</button>
				</div>
			</div>
		</>
	)
}


export default Login