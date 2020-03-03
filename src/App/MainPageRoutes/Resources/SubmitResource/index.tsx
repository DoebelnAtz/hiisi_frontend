import React, { useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import {
	EditDescriptionCol,
	LinkInput,
	LinkInputDiv,
	SubmitResource,
	TitleLinkTypeCol,
	TitleInput,
	TitleInputDiv,
	TypeDropDown,
	TypeDropDownSpan,
} from './Styles';
import { OuterDiv } from './Styles';
import { useDismiss } from '../../../../Hooks';
import TextEditor from '../../../Components/TextEditor';
import { ButtonRow } from './Styles';
import { makeRequest } from '../../../../Api';
import { SubmitResourceProps } from '../Types';
import DropDownComponent from '../../../Components/DropDown';

const ResourcesSubmitResource: React.FC<SubmitResourceProps> = ({
	resources,
	setResources,
	setPopup,
}) => {
	const inside = useRef<HTMLDivElement>(null);

	const [description, setDescription] = useState<string>('');
	const [titleInput, setTitleInput] = useState<string>('');
	const [linkInput, setLinkInput] = useState<string>('');
	const [type, setType] = useState('article');
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
				type: type,
			});

			setResources([resp.data, ...resources]);
			setPopup(false);
		}
	};

	const handleTypeChange = (newType: string) => {
		setType(newType);
	};

	return ReactDOM.createPortal(
		<OuterDiv>
			<SubmitResource ref={inside}>
				<TitleLinkTypeCol>
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
					<TypeDropDownSpan>Resource type:</TypeDropDownSpan>
					<TypeDropDown>
						<DropDownComponent
							state={type}
							setSelect={handleTypeChange}
							optionList={['article', 'video', 'course']}
							width={'140px'}
							height={'34px'}
						/>
					</TypeDropDown>
				</TitleLinkTypeCol>
				<EditDescriptionCol>
					<span>Description: </span>
					<TextEditor
						editable
						state={description}
						setState={(e: string) => handleDescriptionChange(e)}
					/>
				</EditDescriptionCol>
				<ButtonRow>
					<button onClick={submitResource}>Submit</button>
				</ButtonRow>
			</SubmitResource>
		</OuterDiv>,
		document.querySelector('#modal') as Element,
	);
};

export default ResourcesSubmitResource;
