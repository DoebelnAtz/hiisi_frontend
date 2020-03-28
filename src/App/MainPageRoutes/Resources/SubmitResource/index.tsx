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
	TitleError,
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
import LoadingDots from '../../../Components/Loading';
import SaveButton from '../../../Components/Buttons/SaveButton';
const ResourcesSubmitResource: React.FC<SubmitResourceProps> = ({
	resources,
	setResources,
	setPopup,
}) => {
	const inside = useRef<HTMLDivElement>(null);
	// when state is updated react re-renders a component
	// to avoid re-rendering twice when two components are updated
	// we cant combine states like this. I should probably do this in other components
	// as well
	const [errorState, setErrorState] = useState({
		titleExistsError: false,
		titleError: false,
		descriptionError: false,
		linkError: false,
	});

	const [saving, setSaving] = useState(true);

	const [, isMobile] = useWidth();

	const [inputState, setInputState] = useState({
		descriptionVal: '',
		titleVal: '',
		linkVal: '',
	});
	const [type, setType] = useState('article');
	const close = () => {
		setPopup(false);
	};

	const handleDescriptionChange = (e: string) => {
		errorState.descriptionError &&
			setErrorState({ ...errorState, descriptionError: false });
		setInputState({ ...inputState, descriptionVal: e });
	};

	useDismiss(inside, close);

	const submitResource = async () => {
		if (
			!!inputState.descriptionVal.length &&
			!!inputState.linkVal.length &&
			!!inputState.titleVal.length
		) {
			try {
				new URL(validateUrl(inputState.linkVal));
			} catch (e) {
				setErrorState({ ...errorState, linkError: true });
			}
			try {
				let resp = await makeRequest('resources/add_resource', 'post', {
					title: inputState.titleVal,
					link: validateUrl(inputState.linkVal),
					description: inputState.descriptionVal,
					type: type,
				});
				setResources([resp.data, ...resources]);
				setPopup(false);
			} catch (e) {
				console.log(e.response, e);
				if (e.response.status === 400) {
					setErrorState({ ...errorState, titleExistsError: true });
				}
				return false;
			}
		} else {
			setErrorState({
				titleExistsError: false,
				titleError: !inputState.titleVal.length,
				descriptionError: !inputState.descriptionVal.length,
				linkError: !inputState.linkVal.length,
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
		(errorState.titleError || errorState.titleExistsError) &&
			setErrorState({
				...errorState,
				titleError: false,
				titleExistsError: false,
			});
		if (target.value.length <= 100) {
			setInputState({ ...inputState, titleVal: target.value });
		}
	};

	const handleLinkChange = (e: React.SyntheticEvent) => {
		let target = e.target as HTMLInputElement;
		errorState.linkError &&
			setErrorState({ ...errorState, linkError: false });
		setInputState({ ...inputState, linkVal: target.value });
	};

	return ReactDOM.createPortal(
		<OuterDiv>
			<SubmitResource isMobile={isMobile} ref={inside}>
				<RowDiv>
					<TitleLinkTypeCol>
						<TitleInputDiv>
							<span>Title: </span>
							<TitleInput
								error={errorState.titleError}
								value={inputState.titleVal}
								onChange={handleTitleChange}
								placeholder={'title'}
							/>
							{errorState.titleExistsError && (
								<TitleError>Title already exists</TitleError>
							)}
						</TitleInputDiv>

						<LinkInputDiv>
							<span>Link: </span>
							<LinkInput
								error={errorState.linkError}
								value={inputState.linkVal}
								onChange={handleLinkChange}
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

					<EditDescriptionCol error={errorState.descriptionError}>
						<span>Description: </span>
						<TextEditor
							editable
							state={inputState.descriptionVal}
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
