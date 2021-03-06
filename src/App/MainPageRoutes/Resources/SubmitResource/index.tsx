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
	ErrorMessage,
} from './Styles';
import { OuterDiv } from './Styles';
import { useDismiss, useWidth } from '../../../../Hooks';
import TextEditor from '../../../Components/TextEditor';
import { ButtonRow } from './Styles';
import { makeRequest } from '../../../../Api';
import { SubmitResourceProps } from '../Types';
import DropDownComponent from '../../../Components/DropDown';
import { validateUrl } from '../../../../Utils';
import { RowDiv } from '../../../../Styles/LayoutStyles';
import SaveButton from '../../../Components/Buttons/SaveButton';
const ResourcesSubmitResource: React.FC<SubmitResourceProps> = ({
	resources,
	setResources,
	setPopup,
}) => {
	const inside = useRef<HTMLDivElement>(null);
	// when state is updated react re-renders a component
	// to avoid re-rendering twice when two components are updated
	// we can combine states like this. I should probably do this in other components
	// as well
	const [error, setError] = useState({
		title: '',
		description: '',
		link: '',
	});
	const [input, setInput] = useState({
		description: '',
		title: '',
		link: '',
	});
	const [, isMobile] = useWidth();

	const [type, setType] = useState('article');
	const close = () => {
		setPopup(false);
	};

	useDismiss(inside, close);

	const submitResource = async () => {
		if (
			!!input.description.length &&
			!!input.link.length &&
			!!input.title.length
		) {
			try {
				new URL(validateUrl(input.link));

			} catch (e) {
					setError({ ...error, link: 'invalid link' });
			}
			if (!validateUrl(input.link)) {
					setError({ ...error, link: 'invalid link' });

			} else {
				try {
					let resp = await makeRequest('resources/add_resource', 'post', {
						title: input.title,
						link: validateUrl(input.link),
						description: input.description,
						type: type,
					});
					setResources([resp.data, ...resources]);
					setPopup(false);
				} catch (e) {

					if (e.response.status === 400) {
						setError({ ...error, title: 'title exists' });
					}
					return false;
				}
			}
		} else {
			setError({
				title: !input.title.length ? 'required' : '',
				description: !input.description.length? 'required' : '',
				link: !input.link.length? 'required' : '',
			});
			return false;
		}
		return true;
	};

	const handleTypeChange = (newType: string) => {
		setType(newType);
	};

	const handleTitleChange = (e: React.SyntheticEvent) => {
		let target = e.target as HTMLInputElement;
		if (!!error.title.length) {
			setError({
				...error,
				title: '',
			});
		}
		if (target.value.length <= 100) {
			setInput({ ...input, title: target.value });
		}
	};

	const handleLinkChange = (e: React.SyntheticEvent) => {
		let target = e.target as HTMLInputElement;
		if (!!error.link.length) {
			setError({
				...error,
				link: '',
			});
		}
		setInput({ ...input, link: target.value });
	};

	const handleDescriptionChange = (e: string) => {
		error.description.length &&
			setError({ ...error, description: '' });
		setInput({ ...input, description: e });
	};

	return ReactDOM.createPortal(
		<OuterDiv>
			<SubmitResource isMobile={isMobile} ref={inside}>
				<RowDiv>
					<TitleLinkTypeCol>
						<TitleInputDiv>
							<span>Title: </span>
							{!!error.title.length && (
								<ErrorMessage>{error.title}</ErrorMessage>
							)}
							<TitleInput
								error={!!error.title.length}
								value={input.title}
								onChange={handleTitleChange}
								placeholder={'title'}
							/>

						</TitleInputDiv>

						<LinkInputDiv>
							<span>Link: </span>
							{!!error.link.length && (
								<ErrorMessage>{error.link}</ErrorMessage>
							)}
							<LinkInput
								error={!!error.link.length}
								value={input.link}
								onChange={handleLinkChange}
								placeholder={'link'}
							/>
						</LinkInputDiv>
						<TypeDropDownSpan>Resource type:</TypeDropDownSpan>
						<TypeDropDown>
							<DropDownComponent
								state={type}
								setSelect={handleTypeChange}
								optionList={['article', 'video', 'course', 'documentation', 'other']}
								width={'140px'}
								height={'34px'}
							/>
						</TypeDropDown>
					</TitleLinkTypeCol>

					<EditDescriptionCol>
						<RowDiv><span>Description: </span>
						{!!error.description.length && (
								<ErrorMessage>{error.description}</ErrorMessage>
							)}
						</RowDiv>
						<TextEditor
							 error={!!error.description.length}
							editable
							state={input.description}
							setState={(e: string) => handleDescriptionChange(e)}
						/>
					</EditDescriptionCol>
				</RowDiv>
				<ButtonRow>
					<button style={{ marginRight: 'auto' }} onClick={close}>
						Cancel
					</button>
					<SaveButton onClick={submitResource}>Submit</SaveButton>
				</ButtonRow>
			</SubmitResource>
		</OuterDiv>,
		document.querySelector('#modal') as Element,
	);
};

export default ResourcesSubmitResource;
