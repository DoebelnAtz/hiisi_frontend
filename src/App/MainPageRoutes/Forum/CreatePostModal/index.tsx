import React, {
	useState,
	useRef,
	Dispatch,
	SetStateAction,
} from 'react';
import ReactDOM from 'react-dom';
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
	const [input, setInput] = useState({
		title: '',
		content: '',
	});
	const [error, setError] = useState({
		title: '',
		content: '',
	});
	const inside = useRef<HTMLDivElement>(null);

	useDismiss(inside, () => setPopup(false));
	const [, isMobile] = useWidth();

	const createPost = async () => {
		if (!!input.title.length && !!input.content.length) {
			try {
				let resp = await makeRequest('blogs/create_blog', 'post', {
					authorId: getLocal('token').user.u_id,
					content: input.content,
					title: input.title,
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
		setInput({
			...input,
			title: target.value,
		});
	};

	const handleContentChange = (e: string) => {
		error.content &&
			setError({
				...error,
				content: '',
			});
		setInput({
			...input,
			content: e,
		});
	};

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
									warning={input.title.length > 80}
								>
									<span>
										{input.title.length}/{80}
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
									warning={input.content.length > 500}
								>
									<span>
										{input.content.length}/{500}
									</span>
								</LengthCounter>
							</RowDiv>
							<ContentTextEditor>
								<TextEditor
									 error={!!error.content.length}
									editable={true}
									state={input.content}
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
