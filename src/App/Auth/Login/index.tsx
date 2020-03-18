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

type LoginProps = {};

const Login: React.FC = () => {
	const [loginError, setLoginError] = useState(false);
	const history = useHistory();
	const next: any = queryString.parse(history.location.search)?.next ? queryString.parse(history.location.search).next : '/openhive';
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

	const moveRight = useSpring({
		ref: moveRightRef,
		from: { transform: 'translateX(2vw)' },
		to: { transform: !animate ? 'translateX(2vw)' : 'translateX(14vw)' },
	});

	const moveLeft = useSpring({
		ref: moveLeftRef,
		from: { transform: 'translateX(2vw)' },
		to: { transform: !animate ? 'translateX(2vw)' : 'translateX(-10vw)' },
	});

	const moveUp = useSpring({
		ref: moveUpRef,
		from: { transform: 'translateY(0vw)' },
		to: { transform: !animate ? 'translateY(0vw)' : 'translateY(-16vw)' },
	});

	const moveDown = useSpring({
		ref: moveDownRef,
		from: { transform: 'translateY(0vw)' },
		to: { transform: !animate ? 'translateY(0vw)' : 'translateY(16vw)' },
	});

	const expandMain = useSpring({
		ref: widthRef,
		from: { width: '16vw' },
		to: { width: !animate ? '16vw' : '40vw' },
	});
	const expandBorderMain = useSpring({
		ref: radiusRef,
		from: {
			borderTopLeftRadius: '8vw',
			borderBottomRightRadius: '8vw',
		},
		to: {
			borderTopLeftRadius: !animate ? '8vw' : '0',
			borderBottomRightRadius: !animate ? '8vw' : '0',
		},
	});

	const expandBorderTRGreen = useSpring({
		ref: greenTRRadiusRef,
		from: {
			borderTopRightRadius: '8vw',
		},
		to: {
			borderTopRightRadius: !animate ? '8vw' : '0',
		},
	});

	const expandBorderBLGreen = useSpring({
		ref: greenBLRadiusRef,
		from: {
			borderBottomLeftRadius: '8vw',
		},
		to: {
			borderBottomLeftRadius: !animate ? '8vw' : '0',
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
			  ],
		animate ? [1, 0, 0, 0, 0.5, 0.5, 1, 1] : [0, 0.5, 0.5, 0.5, 1, 1, 0, 0],
	);

	return (
		<BackgroundDiv>
			{
				//<button
				//style={{ position: 'absolute' }}
				//onClick={() => setAnimate(!animate)}
				//>
				//animate
				//</button>
			}
			<LoginDiv style={{ ...expandMain, ...expandBorderMain }}>
				<InputDiv>
					<div style={{ position: 'relative', left: '-50%' }}>
						<form>
						<UsernameDiv>
							<UsernameInput
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
								type={'password'}
								autocomplete={'on'}
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
						<LoginButton loginError={loginError}>
							<button onClick={handleLoginClick}>Login</button>
						</LoginButton>
						</form>
					</div>
				</InputDiv>
			</LoginDiv>
			<HelperDiv style={moveUp}>
				{' '}
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
		</BackgroundDiv>
	);
};

export default withRouter(Login);
