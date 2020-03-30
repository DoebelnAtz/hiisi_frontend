import React, { Dispatch, SetStateAction, useRef, useState } from 'react';
import {
	InsideDiv,
	OutsideDiv,
	TitleInput,
	LinkInput,
	Description,
	ButtonRow,
	SubmitButton,
	TitleAndLinkRow,
	ErrorSpan,
	CancelButton,
} from './Styles';
import { useDismiss, useWidth } from '../../../../Hooks';
import { Project, ProjectCardType } from '../Types';
import TextEditor from '../../../Components/TextEditor';
import { makeRequest } from '../../../../Api';
import { validateUrl } from '../../../../Utils';
import ToggleButton from '../../../Components/Buttons/ToggleButton';
import { RowDiv } from '../../../../Styles/LayoutStyles';
import SaveButton from '../../../Components/Buttons/SaveButton';
type CreateProjectModalProps = {
	setShowModal: Dispatch<SetStateAction<boolean>>;
	projects: ProjectCardType[] | undefined;
	setProjects: Dispatch<SetStateAction<ProjectCardType[] | undefined>>;
};

const CreateProjectModal: React.FC<CreateProjectModalProps> = ({
	setShowModal,
	setProjects,
	projects,
}) => {
	const inside = useRef<HTMLDivElement>(null);
	const [privateProject, setPrivateProject] = useState(false);
	const [input, setInput] = useState({
		title: '',
		link: '',
		description: '',
	});
	const [error, setError] = useState({
		title: '',
		link: '',
		description: '',
	});
	const close = () => {
		setShowModal(false);
	};
	const [width, isMobile] = useWidth();

	useDismiss(inside, close);

	const createProject = async () => {
		let url = validateUrl(input.link);
		if (
			!input.title.length ||
			!input.link.length ||
			!input.description.length
		) {
			setError({
				title: !input.title.length ? 'required' : '',
				link: !input.link.length ? 'required' : '',
				description: !input.description.length
					? 'required'
					: '',
			});
			return false;
		} else {
			if (url) {
				try {
					let resp = await makeRequest(
						'projects/create_project',
						'post',
						{
							title: input.title,
							link: input.link,
							private: privateProject,
							description: input.description,
						},
					);
					if (resp.data && projects) {
						setProjects([...projects, resp.data]);
						setShowModal(false);
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
					...error,
					link: 'invalid link',
				});
				return false;
			}
		}
		return true;
	};

	const handleTitleChange = (e: React.SyntheticEvent) => {
		setError({
			...error,
			title: '',
		});
		const target = e.target as HTMLInputElement;
		setInput({
			...input,
			title: target.value,
		});
	};

	const handleLinkChange = (e: React.SyntheticEvent) => {
		const target = e.target as HTMLInputElement;
		setError({
			...error,
			link: '',
		});
		setInput({
			...input,
			link: target.value,
		});
	};

	const handleDescriptionChange = (e: string) => {
		setError({
			...error,
			description: '',
		});
		setInput({
			...input,
			description: e,
		});
	};

	const handlePrivacyToggle = () => {
		setPrivateProject(!privateProject);
	};

	return (
		<OutsideDiv>
			<InsideDiv isMobile={isMobile} ref={inside}>
				<TitleAndLinkRow>
					<label>
						Title:
						{!!error.title.length && (
							<ErrorSpan>{error.title}</ErrorSpan>
						)}
						<TitleInput
							value={input.title}
							error={!!error.title.length}
							onChange={handleTitleChange}
							placeholder={'title'}
						/>
					</label>
					<label>
						Link:
						{!!error.link.length && (
							<ErrorSpan>{error.link}</ErrorSpan>
						)}
						<LinkInput
							value={input.link}
							error={!!error.link.length}
							onChange={handleLinkChange}
							placeholder={'project link'}
						/>
					</label>
				</TitleAndLinkRow>
				<span>Description</span>
				{!!error.description.length && (
					<ErrorSpan>{error.description}</ErrorSpan>
				)}
				<Description>
					<TextEditor
						editable={true}
						state={input.description}
						setState={handleDescriptionChange}
					/>
				</Description>
				<RowDiv margin={'10px 0'}>
					<span style={{ margin: 'auto 10px auto 0' }}>
						Private:{' '}
					</span>
					<ToggleButton
						state={privateProject}
						onClick={handlePrivacyToggle}
					/>
				</RowDiv>
				<ButtonRow>
					<CancelButton onClick={() => close()}>Cancel</CancelButton>
					<SaveButton onClick={() => createProject()}>
						Submit
					</SaveButton>
				</ButtonRow>
			</InsideDiv>
		</OutsideDiv>
	);
};

export default CreateProjectModal;
