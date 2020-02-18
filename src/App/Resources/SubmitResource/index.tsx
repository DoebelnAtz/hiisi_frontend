import React, { useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import {
	EditDescription,
	LinkInput,
	LinkInputDiv,
	SubmitResource,
	TitleAndLinkRow,
	TitleInput,
	TitleInputDiv,
} from './Styles';
import { OuterDiv } from './Styles';
import { useDismiss } from '../../../Hooks';
import TextEditor from '../../Components/TextEditor';
import Button from '../../Components/Buttons/Button';
import { ButtonRow } from './Styles';
import { makeRequest } from '../../../Api/Api';
import { SubmitResourceProps } from '../Types';
import { string } from 'prop-types';

const ResourcesSubmitResource: React.FC<SubmitResourceProps> = ({
	resources,
	setResources,
	setPopup,
}) => {
	const inside = useRef<HTMLDivElement>(null);

	const [description, setDescription] = useState<string>('');
	const [titleInput, setTitleInput] = useState<string>('');
	const [linkInput, setLinkInput] = useState<string>('');

	const close = () => {
		setPopup(false);
	};

	const handleDescriptionChange = (e: string) => {
		setDescription(e);
	};

	useDismiss(inside, close);

	const submitResource = async () => {
		if (!!titleInput.length && !!linkInput.length && !!description.length) {
			let resp = await makeRequest('resources/add_resource', 'post', {
				title: titleInput,
				link: linkInput,
				description: description,
			});



			setResources([...resources, resp.data]);
			setPopup(false);
		}
	};

	return ReactDOM.createPortal(
		<OuterDiv>
			<SubmitResource ref={inside}>
				<TitleAndLinkRow>
					<TitleInputDiv>
						<span>Title: </span>
						<TitleInput
							value={titleInput}
							onChange={(e: React.SyntheticEvent) => {
								let target = e.target as HTMLInputElement;
								setTitleInput(target.value);
							}}
							placeholder={'title'}
						/>
					</TitleInputDiv>
					<LinkInputDiv>
						<span>Link: </span>
						<LinkInput
							value={linkInput}
							onChange={(e: React.SyntheticEvent) => {
								let target = e.target as HTMLInputElement;
								setLinkInput(target.value);
							}}
							placeholder={'link'}
						/>
					</LinkInputDiv>
				</TitleAndLinkRow>
				<EditDescription>
					<span>Description: </span>
					<TextEditor
						editable
						state={description}
						setState={(e: string) => handleDescriptionChange(e)}
					/>
				</EditDescription>
				<ButtonRow>
					<Button onClick={submitResource}>Submit</Button>
				</ButtonRow>
			</SubmitResource>
		</OuterDiv>,
		document.querySelector('#modal') as Element,
	);
};

export default ResourcesSubmitResource;
