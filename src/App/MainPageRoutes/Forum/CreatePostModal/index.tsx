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
import { useDismiss, useWidth } from '../../../../Hooks';
import {
	ModalDiv,
	OutsideDiv,
	TitleInput,
	TitleText,
	LengthCounter,
	ContentTextEditor,
	ContentText,
	ButtonRow,
	TitleError,
	ContentError,
	BackButton,
} from './Styles';
import TextEditor from '../../../Components/TextEditor';
import { PostType } from '../Types';
import { RowDiv } from '../../../../Styles/LayoutStyles';
import SaveButtonComponent from '../../../Components/Buttons/SaveButton';

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
	const [error, setError] = useState({
		title: '',
		content: '',
	});
	const inside = useRef<HTMLDivElement>(null);

	useDismiss(inside, () => setPopup(false));
	const [width, isMobile] = useWidth();

	const createPost = async () => {
		if (!!inputVal.titleVal.length && !!inputVal.contentVal.length) {
			try {
				let resp = await makeRequest('blogs/create_blog', 'post', {
					authorId: getLocal('token').user.u_id,
					content: inputVal.contentVal,
					title: inputVal.titleVal,
				});

				if (isMounted && posts && resp.data) {
					setPosts([resp.data, ...posts]);
					setTimeout(() => {
						setPopup(false);
					}, 300);
					return true;
				}
			} catch (e) {
				if (e.response.status === 400) {
					setError({
						...error,
						title: 'Title already exists',
					});
				}
				return false;
			}
		} else {
			setError({
				title: 'required',
				content: 'required',
			});
			return false;
		}
		return true;
	};

	const handleTitleChange = (e: React.SyntheticEvent) => {
		let target = e.target as HTMLInputElement;
		error.title &&
			setError({
				...error,
				title: '',
			});
		setInputVal({
			...inputVal,
			titleVal: target.value,
		});
	};

	const handleContentChange = (e: string) => {
		error.content &&
			setError({
				...error,
				content: '',
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

	return ReactDOM.createPortal((
					<OutsideDiv>
						<ModalDiv
							ref={inside}
							isMobile={isMobile}
						>
							<RowDiv margin={'0 0 10px 0'}>
								<TitleText>
									Title:
								</TitleText>
								<TitleError error={!!error.title.length}>
									{error.title}
								</TitleError>
								<LengthCounter
									warning={inputVal.titleVal.length > 80}
								>
									<span>
										{inputVal.titleVal.length}/{80}
									</span>
								</LengthCounter>
							</RowDiv>
							<TitleInput
								error={!!error.title.length}
								placeholder={'Title'}
								onChange={(e: React.SyntheticEvent) =>
									handleTitleChange(e)
								}
							/>
							<RowDiv margin={'10px 0 10px 0'}>
								<ContentText>
									Content:
								</ContentText>
								<ContentError error={!!error.content.length}>
									{error.content}
								</ContentError>
								<LengthCounter
									warning={inputVal.contentVal.length > 500}
								>
									<span>
										{inputVal.contentVal.length}/{500}
									</span>
								</LengthCounter>
							</RowDiv>
							<ContentTextEditor>
								<TextEditor
									 error={!!error.content.length}
									editable={true}
									state={inputVal.contentVal}
									setState={handleContentChange}
								/>
							</ContentTextEditor>
							<ButtonRow>
								<BackButton onClick={() => setPopup(false)}>
									Cancel
								</BackButton>
								<SaveButtonComponent
									onClick={() => createPost()}
								>
									Submit Post
								</SaveButtonComponent>
							</ButtonRow>
						</ModalDiv>
					</OutsideDiv>),
		document.querySelector('#modal') as Element,
	);
};
export default CreatePostModal;
