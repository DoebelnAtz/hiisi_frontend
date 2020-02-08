import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { useSpring, useTransition } from 'react-spring';
import { makeRequest } from '../../Api/Api';
import Button from '../../Components/Buttons/Button';
import { getLocal } from '../../../utils/utils';
import { useDismiss } from '../../../Hooks/Hooks';
import { CreatePostModalProps } from '../Types';
import {
	ModalDiv,
	OutsideDiv,
	TitleInput,
	TitleText,
	LengthCounter,
	ContentInput,
	ContentText,
	ButtonRow,
	SubmitButton,
	BackButton,
} from './Style';

const CreatePostModal: React.FC<CreatePostModalProps> = ({
	setPosts,
	posts,
	setPopup,
	popup,
	isMounted,
}) => {
	const [title, setTitle] = useState<string>('');
	const [content, setContent] = useState<string>('');
	const [submitDisabled, setSubmitDisabled] = useState<boolean>(true);
	const inside = useRef<any>(); // any because animated.div is causing issues

	useDismiss(inside, () => setPopup(false));

	const createPost = async (title: string, content: string) => {
		let now = new Date().toISOString();
		console.log(now);
		let resp = await makeRequest('blogs/create_blog', 'post', {
			authorId: getLocal('token').user.u_id,
			content,
			title,
			published_date: now,
		});
		console.log(posts);

		if (isMounted) {
			console.log('updating');
			setPosts([resp.data, ...posts]);
			setPopup(false);
		}
		setTitle('');
		setContent('');
	};

	useEffect(() => {
		if (isMounted) {
			validateInput(); // eslint-disable-next-line
		}
	}, [title.length, content.length]);

	const handleChange = (e: React.SyntheticEvent, func: any) => {
		let target = e.target as HTMLInputElement;
		func(target.value);
	};

	const validateInput = () => {
		if (
			title.length &&
			content.length &&
			title.length <= 80 &&
			content.length <= 500
		) {
			setSubmitDisabled(false);
		} else {
			setSubmitDisabled(true);
		}
	};

	const slideIn = useTransition(popup, null, {
		from: { transform: 'translateY(100%)' },
		enter: { transform: 'translateY(0%)' },
		leave: { transform: 'translateY(-200px)' },
	});

	const fadeIn = useSpring({ opacity: popup ? 1 : 0 });

	return ReactDOM.createPortal(
		slideIn.map(
			({ item, key, props }, i) =>
				item && (
					<OutsideDiv key={i} style={fadeIn} id={'popup_background'}>
						<ModalDiv style={props} id={'popup_cont'} ref={inside}>
							<TitleText>Title</TitleText>
							<TitleInput
								placeholder={'Title'}
								onChange={(e: React.SyntheticEvent) =>
									handleChange(e, setTitle)
								}
							/>
							<LengthCounter warning={title.length > 80}>
								<span>
									{title.length}/{80}
								</span>
							</LengthCounter>
							<ContentText>Content</ContentText>
							<ContentInput
								placeholder={'Content'}
								onChange={(e: React.SyntheticEvent) =>
									handleChange(e, setContent)
								}
							/>
							<LengthCounter warning={content.length > 500}>
								<span>
									{content.length}/{500}
								</span>
							</LengthCounter>
							<ButtonRow>
								<BackButton onClick={() => setPopup(false)}>
									Back
								</BackButton>
								<SubmitButton
									disabled={submitDisabled}
									onClick={() => createPost(title, content)}
								>
									Submit Post
								</SubmitButton>
							</ButtonRow>
						</ModalDiv>
					</OutsideDiv>
				),
		),
		document.querySelector('#modal') as Element,
	);
};
export default CreatePostModal;
