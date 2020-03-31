import React, { useEffect, useRef, useState } from 'react';
import { withRouter, useHistory } from 'react-router-dom';
import { setLocal } from '../../../Utils';
import {
	BackgroundDiv,
	LoginDiv,
	PasswordDiv,
	UsernameDiv,
	InputDiv,
	UsernameInput,
	PasswordInput,
	OrangeDiv,
	GreenDiv,
	HelperDiv,
	LoginButton,
} from './Styles';
import { useSpring, useChain, ReactSpringHook } from 'react-spring';
import { makeRequest } from '../../../Api';
import queryString from 'query-string';
import { color } from '../../../Styles/SharedStyles';

type LoginProps = {};

const Login: React.FC = () => {
	const [loginError, setLoginError] = useState(false);
	const history = useHistory();
	const next: any = queryString.parse(history.location.search)?.next
		? queryString.parse(history.location.search).next
		: '/resources';
	const requestLogin = async () => {
		if (password.length && username.length) {
			try {
				let resp = await makeRequest('auth/login', 'post', {
					username: username.toLowerCase(),
					password: password,
				});
				if (resp.data.success) {
					setLocal('token', resp.data);
					setAnimate(false);
					// In a hurry? fuck you, now enjoy these animations
					// I spent 6h creating
					console.log(next);
					setTimeout(() => history.push(next), 2000);
				}
			} catch (e) {
				setLoginError(true);
				setTimeout(() => {
					setLoginError(false);
				}, 1000);
			}
		}
	};

	const handleEnterPress = (e: React.KeyboardEvent) => {
		if (e.key === 'Enter') {
			e.preventDefault();
			requestLogin();
		}
	};

	const handleLoginClick = (e: React.SyntheticEvent) => {
		e.preventDefault();
		requestLogin();
	};

	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [animate, setAnimate] = useState(false);

	useEffect(() => {
		setTimeout(() => setAnimate(true), 300);
	}, []);

	const widthRef = useRef<ReactSpringHook>(null);
	const radiusRef = useRef<ReactSpringHook>(null);
	const greenTRRadiusRef = useRef<ReactSpringHook>(null);
	const greenBLRadiusRef = useRef<ReactSpringHook>(null);
	const moveRightRef = useRef<ReactSpringHook>(null);
	const moveLeftRef = useRef<ReactSpringHook>(null);
	const moveUpRef = useRef<ReactSpringHook>(null);
	const moveDownRef = useRef<ReactSpringHook>(null);
	const expandInputRef = useRef<ReactSpringHook>(null);
	const expandButtonRef = useRef<ReactSpringHook>(null);

	const moveRight = useSpring({
		ref: moveRightRef,
		from: { transform: 'translateX(max(0vw, 0px))' },
		to: { transform: !animate ? 'translateX(max(0vw, 0px))' : 'translateX(max(24vw, 192px))' },
	});

	const moveLeft = useSpring({
		ref: moveLeftRef,
		from: { transform: 'translateX(0vw)' },
		to: { transform: !animate ? 'translateX(0vw)' : 'translateX(0vw)' },
	});

	const moveUp = useSpring({
		ref: moveUpRef,
		from: { transform: 'translateY(min(0vw, 0px))' },
		to: { transform: !animate ? 'translateY(min(0vw, 0px))' : 'translateY(min(-16vw, -128px))' },
	});

	const moveDown = useSpring({
		ref: moveDownRef,
		from: { transform: 'translateY(max(0vw, 0px))' },
		to: { transform: !animate ? 'translateY(max(0vw, 0px))' : 'translateY(max(16vw, 128px))' },
	});

	const expandMain = useSpring({
		ref: widthRef,
		from: { width: 'max(16vw, 128px)' },
		to: { width: !animate ? 'max(16vw, 128px)' : 'max(40vw, 320px)' },
	});
	const expandBorderMain = useSpring({
		ref: radiusRef,
		from: {
			borderTopLeftRadius: 'max(8vw, 64px)',
			borderBottomRightRadius: 'max(8vw, 64px)',
		},
		to: {
			borderTopLeftRadius: !animate ? 'max(8vw, 64px)' : 'max(0vw, 0px)',
			borderBottomRightRadius: !animate ? 'max(8vw, 64px)' : 'max(0vw, 0px)',
		},
	});

	const expandBorderTRGreen = useSpring({
		ref: greenTRRadiusRef,
		from: {
			borderTopRightRadius: 'max(8vw, 64px)',
		},
		to: {
			borderTopRightRadius: !animate ? 'max(8vw, 64px)' : 'max(0vw, 0px)',
		},
	});

	const expandBorderBLGreen = useSpring({
		ref: greenBLRadiusRef,
		from: {
			borderBottomLeftRadius: 'max(8vw, 64px)',
		},
		to: {
			borderBottomLeftRadius: !animate ? 'max(8vw, 64px)' : 'max(0vw, 0px)',
		},
	});

	const expandInputs = useSpring({
		ref: expandInputRef,
		from: {
			width: '0px',
			paddingLeft: '0px',
			opacity: '0',
			borderRadius: '0px'
		},
		to: {
			width: !animate ? '0px' : '120px',
			paddingLeft: !animate ? '0px' : '10px',
			opacity: !animate ? '0' : '1',
			borderRadius: !animate ? '0' : '4px'
		},
	});

	const expandButtons = useSpring({
		ref: expandButtonRef,
		from: {
			height: '0px',
			padding: '0px',
			color: color.primary
		},
		to: {
			height: !animate ? '0px' : '30px',
			padding: !animate ? '0px' : '5px',
			color: !animate ? color.primary : '#eeeeee'
		},
	});

	useChain(
		animate
			? [
				radiusRef,
				widthRef,
				moveRightRef,
				moveLeftRef,
				moveDownRef,
				moveUpRef,
				greenTRRadiusRef,
				greenBLRadiusRef,
				expandInputRef,
				expandButtonRef
			  ]
			: [
				widthRef,
				radiusRef,
				moveRightRef,
				moveLeftRef,
				moveUpRef,
				moveDownRef,
				greenTRRadiusRef,
				greenBLRadiusRef,
				expandInputRef,
				expandButtonRef
			  ],
		animate ? [1, 0, 0, 0, 0.5, 0.5, 1, 1, 1, 1] : [1, 0, 1, 1, 0.5, 0.5, 0, 0, 0, 0],
	);

	return (
		<BackgroundDiv>

				{/*<button*/}
				{/*style={{ position: 'absolute' }}*/}
				{/*onClick={() => setAnimate(!animate)}*/}
				{/*>*/}
				{/*animate*/}
				{/*</button>*/}

			<LoginDiv style={{ ...expandMain, ...expandBorderMain }}>
				<InputDiv>
					<div style={{ position: 'relative', left: '-50%' }}>
						<form>
							<UsernameDiv>
								<UsernameInput

									style={expandInputs}
									type={'username'}
									value={username}
									onKeyDown={(e: React.KeyboardEvent) =>
										handleEnterPress(e)
									}
									onChange={(e: React.SyntheticEvent) => {
										let target = e.target as HTMLInputElement;
										setUsername(target.value);
									}}
								/>
							</UsernameDiv>
							<PasswordDiv>
								<PasswordInput

									style={expandInputs}
									type={'password'}
									autoComplete={'on'}
									value={password}
									onKeyDown={(e: React.KeyboardEvent) =>
										handleEnterPress(e)
									}
									onChange={(e: React.SyntheticEvent) => {
										let target = e.target as HTMLInputElement;
										setPassword(target.value);
									}}
								/>
							</PasswordDiv>

							<LoginButton style={expandButtons} loginError={loginError}>
								<button onClick={handleLoginClick}>
									Login
								</button>
								<button onClick={() => history.push('/signup')}>Sign up</button>
							</LoginButton>
						</form>
					</div>
				</InputDiv>
			<HelperDiv style={moveUp}>
				{/*the two transforms overwrite each other, so we need a helper div*/}
				<OrangeDiv style={moveRight} />
			</HelperDiv>
			<HelperDiv style={moveDown}>
				<OrangeDiv style={moveLeft} />
			</HelperDiv>
			<HelperDiv style={moveDown}>
				<GreenDiv style={{ ...moveRight, ...expandBorderTRGreen }} />
			</HelperDiv>
			<HelperDiv style={moveUp}>
				<GreenDiv style={{ ...moveLeft, ...expandBorderBLGreen }} />
			</HelperDiv>
						</LoginDiv>

		</BackgroundDiv>
	);
};

export default withRouter(Login);
