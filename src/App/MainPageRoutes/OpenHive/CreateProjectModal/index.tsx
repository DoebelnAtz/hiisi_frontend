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
} from './Styles';
import { useDismiss } from '../../../../Hooks';
import { Project, ProjectCardType } from '../Types';
import TextEditor from '../../../Components/TextEditor';
import { makeRequest } from '../../../../Api';
import { validateUrl } from '../../../../Utils';

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
	const [titleVal, setTitleVal] = useState('');
	const [linkVal, setLinkVal] = useState('');
	const [description, setDescription] = useState('');
	const close = () => {
		setShowModal(false);
	};

	useDismiss(inside, close);
	const createProject = async () => {
		let url = await validateUrl(linkVal);

		if (url) {
			let resp = await makeRequest('projects/create_project', 'post', {
				title: titleVal,
				link: linkVal,
				description: description,
			});
			if (resp.data && projects) {
				setProjects([...projects, resp.data]);
				setShowModal(false);
			}
		}
	};

	return (
		<OutsideDiv>
			<InsideDiv ref={inside}>
				<TitleAndLinkRow>
					<label>
						Title:
						<TitleInput
							value={titleVal}
							onChange={(e: React.SyntheticEvent) => {
								let target = e.target as HTMLInputElement;
								setTitleVal(target.value);
							}}
							placeholder={'title'}
						/>
					</label>
					<label>
						Link:
						<LinkInput
							value={linkVal}
							onChange={(e: React.SyntheticEvent) => {
								let target = e.target as HTMLInputElement;
								setLinkVal(target.value);
							}}
							placeholder={'project link'}
						/>
					</label>
				</TitleAndLinkRow>
				<span>Description</span>
				<Description>
					<TextEditor
						editable={true}
						state={description}
						setState={(e: string) => setDescription(e)}
					/>
				</Description>
				<ButtonRow>
					<SubmitButton onClick={() => createProject()}>
						Submit
					</SubmitButton>
				</ButtonRow>
			</InsideDiv>
		</OutsideDiv>
	);
};

export default CreateProjectModal;
