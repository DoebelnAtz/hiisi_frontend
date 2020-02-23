import React, { useEffect, useRef, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { setLocal } from '../../../Utils';
import axios from 'axios';
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
import Button from '../../Components/Buttons/Button';
import { useSpring, useChain } from 'react-spring';
import { makeRequest } from '../../../Api/Api';
const Login = (props) => {
	const requestLogin = async (e) => {
		e.preventDefault();
		if (password.length && username.length) {
			let resp = await makeRequest('auth/login', 'post', {
				username: username.toLowerCase(),
				password: password,
			});

			if (resp.data.success) {
				setLocal('token', resp.data);
				setAnimate(false);
				// In a hurry? fuck you, now enjoy these animations
				// I spent 6h creating
				setTimeout(() => props.history.push('/openhive'), 2000);
			} else {
				props.history.push('/login');
			}
		}
	};

	const handleEnterPress = (e) => {
		if (e.key === 'Enter') {
			requestLogin(e);
		}
	};

	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [animate, setAnimate] = useState(false);

	useEffect(() => {
		setTimeout(() => setAnimate(true), 300);
	}, []);

	const widthRef = useRef();
	const radiusRef = useRef();
	const greenTRRadiusRef = useRef();
	const greenBLRadiusRef = useRef();
	const moveRightRef = useRef();
	const moveLeftRef = useRef();
	const moveUpRef = useRef();
	const moveDownRef = useRef();

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
			<button
				style={{ position: 'absolute' }}
				onClick={() => setAnimate(!animate)}
			>
				animate
			</button>
			<LoginDiv style={{ ...expandMain, ...expandBorderMain }}>
				<InputDiv>
					<div style={{ position: 'relative', left: '-50%' }}>
						<UsernameDiv>
							<UsernameInput
								type={'text'}
								value={username}
								onKeyDown={(e) => handleEnterPress(e)}
								onChange={(e) => setUsername(e.target.value)}
							/>
						</UsernameDiv>
						<PasswordDiv>
							<PasswordInput
								type={'password'}
								value={password}
								onKeyDown={(e) => handleEnterPress(e)}
								onChange={(e) => setPassword(e.target.value)}
							/>
						</PasswordDiv>
						<LoginButton>
							<Button onClick={requestLogin}>Login</Button>
						</LoginButton>
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
