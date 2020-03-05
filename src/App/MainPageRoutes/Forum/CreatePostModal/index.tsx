import React, {
	useState,
	useEffect,
	useRef,
	Dispatch,
	SetStateAction,
} from 'react';
import ReactDOM from 'react-dom';
import { useSpring, useTransition } from 'react-spring';
import { makeRequest } from '../../../../Api';
import { getLocal } from '../../../../Utils';
import { useDismiss } from '../../../../Hooks';
import {
	ModalDiv,
	OutsideDiv,
	TitleInput,
	TitleText,
	LengthCounter,
	ContentTextEditor,
	ContentText,
	ButtonRow,
	SubmitButton,
	BackButton,
} from './Styles';
import TextEditor from '../../../Components/TextEditor';
import { PostType } from '../Types';

type CreatePostModalProps = {
	setPopup: any;
	popup: boolean;
	isMounted: any;
	setPosts: Dispatch<SetStateAction<PostType[] | undefined>>;
	posts: PostType[] | undefined;
};

const CreatePostModal: React.FC<CreatePostModalProps> = ({
	setPopup,
	popup,
	setPosts,
	posts,
	isMounted,
}) => {
	const [inputVal, setInputVal] = useState({
		titleVal: '',
		contentVal: '',
	});
	const [errors, setErrors] = useState({
		titleError: false,
		contentError: false,
	});
	const inside = useRef<HTMLDivElement>(null);

	useDismiss(inside, () => setPopup(false));

	const createPost = async () => {
		if (!!inputVal.titleVal.length && !!inputVal.contentVal.length) {
			let now = new Date().toISOString();
			let resp = await makeRequest('blogs/create_blog', 'post', {
				authorId: getLocal('token').user.u_id,
				content: inputVal.contentVal,
				title: inputVal.titleVal,
				published_date: now,
			});

			if (isMounted && posts && resp.data) {
				setPosts([resp.data, ...posts]);
				setPopup(false);
			}
		} else {
			setErrors({
				titleError: !inputVal.titleVal.length,
				contentError: !inputVal.contentVal.length,
			});
		}
	};

	const handleTitleChange = (e: React.SyntheticEvent) => {
		let target = e.target as HTMLInputElement;
		errors.titleError &&
			setErrors({
				...errors,
				titleError: false,
			});
		setInputVal({
			...inputVal,
			titleVal: target.value,
		});
	};

	const handleContentChange = (e: string) => {
		errors.contentError &&
			setErrors({
				...errors,
				contentError: false,
			});
		setInputVal({
			...inputVal,
			contentVal: e,
		});
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
					<OutsideDiv key={i} style={fadeIn}>
						<ModalDiv style={props}>
							<div
								ref={inside}
								style={{
									width: '100%',
									height: '100%',
									display: 'inherit',
									flexDirection: 'inherit',
								}}
							>
								<TitleText error={errors.titleError}>
									Title
								</TitleText>
								<TitleInput
									placeholder={'Title'}
									onChange={(e: React.SyntheticEvent) =>
										handleTitleChange(e)
									}
								/>
								<LengthCounter
									warning={inputVal.titleVal.length > 80}
								>
									<span>
										{inputVal.titleVal.length}/{80}
									</span>
								</LengthCounter>
								<ContentText error={errors.contentError}>
									Content
								</ContentText>
								<ContentTextEditor>
									<TextEditor
										editable={true}
										state={inputVal.contentVal}
										setState={handleContentChange}
									/>
								</ContentTextEditor>
								<ButtonRow>
									<BackButton onClick={() => setPopup(false)}>
										Back
									</BackButton>
									<SubmitButton
										disabled={
											errors.contentError ||
											errors.titleError
										}
										onClick={() => createPost()}
									>
										Submit Post
									</SubmitButton>
								</ButtonRow>
							</div>
						</ModalDiv>
					</OutsideDiv>
				),
		),
		document.querySelector('#modal') as Element,
	);
};
export default CreatePostModal;
