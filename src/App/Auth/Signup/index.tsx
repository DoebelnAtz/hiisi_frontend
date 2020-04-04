import React, { useState } from 'react';
import {
	UsernameInput,
	SignupButton,
	BackgroundDiv,
	InputDiv,
	TitleDiv, BackToLoginButton, PasswordInput,
} from './Styles';
import { makeRequest } from '../../../Api';
import { useHistory } from 'react-router';
import { RowDiv } from '../../../Styles/LayoutStyles';
import LoadingDots from '../../Components/Loading';

const Signup: React.FC = () => {

	const history = useHistory();
	const [input, setInput] = useState({
		username: '',
		password1: '',
		password2: '',
	});
	const [errors, setErrors] = useState({
		usernameError: '',
		password1Error: '',
		password2Error: '',
	});
	const [isLoading, setIsLoading] = useState(false);

	const handleSignup = async () => {
		if (!!input.username.length && !!input.password2.length && !!input.password1.length) {
			if (input.password1 === input.password2) {
				if (input.password1.length > 7) {
					setIsLoading(true);
					try {
						let resp = await makeRequest('auth/signup', 'POST', {
						username: input.username,
						password: input.password1,
					});
						if (resp.data) {
					history.push('/login');
				}
						setIsLoading(false);
					} catch (e) {
						setIsLoading(false)
					}

				} else {
					setErrors({
						...errors,
						password1Error: 'Password has to be minimum 8 characters long'
					})
				}
			} else {
				setErrors({
					...errors,
					password1Error: 'Passwords do not match',
					password2Error: 'Passwords do not match'
				})
			}

		} else {
			setErrors({
				usernameError: !input.username.length ? 'Username required' : '',
				password1Error: !input.password1.length ? 'Password required': '',
				password2Error: !input.password2.length ? 'Password required': ''
			})
		}
	};

	const handleUsernameChange = (e: React.SyntheticEvent) => {
		let target = e.target as HTMLInputElement;
		setInput({
			...input,
			username: target.value,
		});
	};

	const handlePassword1Change = (e: React.SyntheticEvent) => {
		let target = e.target as HTMLInputElement;
		setInput({
			...input,
			password1: target.value,
		});
	};

	const handlePassword2Change = (e: React.SyntheticEvent) => {
		let target = e.target as HTMLInputElement;
		setInput({
			...input,
			password2: target.value,
		});
	};

	return (
		<BackgroundDiv>
			<InputDiv>
				<TitleDiv>
					Hivemind
				</TitleDiv>
				<UsernameInput>
					<input value={input.username} onChange={(e: React.SyntheticEvent) => handleUsernameChange(e)} placeholder={'intra username'}/>
					<span>{errors.usernameError} </span>
				</UsernameInput>
				<PasswordInput>
					<input type={'password'}  value={input.password1} onChange={(e: React.SyntheticEvent) => handlePassword1Change(e)}  placeholder={'password'}/>
					<span>{errors.password1Error} </span>
				</PasswordInput>
				<PasswordInput>
					<input type={'password'}  value={input.password2} onChange={(e: React.SyntheticEvent) => handlePassword2Change(e)}  placeholder={'confirm password'}/>
					<span>{errors.password2Error} </span>
				</PasswordInput>
				<RowDiv>
					<BackToLoginButton onClick={() => history.push('/login')}>Login</BackToLoginButton>
					<SignupButton onClick={handleSignup}>
						{isLoading ? <LoadingDots height={14} color={'#323232'} cycleSpeed={200}/> : 'Signup'}
					</SignupButton>
				</RowDiv>
			</InputDiv>
		</BackgroundDiv>
	);
};

export default Signup;