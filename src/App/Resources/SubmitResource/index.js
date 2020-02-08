import React, {useRef, useState} from 'react';
import ReactDOM from 'react-dom'
import {
    EditDescription,
    LinkInput,
    LinkInputDiv,
    SubmitResource,
    TitleAndLinkRow,
    TitleInput,
    TitleInputDiv
} from "./Styles";
import { OuterDiv } from "./Styles";
import {useDismiss} from "../../../Hooks";
import TextEditor from "../../Components/TextEditor";
import Button from "../../Components/Buttons/Button";
import { ButtonRow } from "./Styles";
import {makeRequest} from "../../Api/Api";

const ResourcesSubmitResource = ({resources, setResources, setPopup}) => {

    const inside = useRef();

    const [description, setDescription] = useState('');
    const [titleInput, setTitleInput] = useState('');
    const [linkInput, setLinkInput] = useState('');

    const close = () => {
        setPopup(false)
    };

    const handleDescriptionChange = (e) => {
        setDescription(e);
    };

    useDismiss(inside, close);

    const submitResource = async () => {
        if (!!titleInput.length && !!linkInput.length && !!description.length) {
            let resp = await makeRequest('resources/add_resource', 'post', {
                title: titleInput,
                link: linkInput,
                description: description
            });

            console.log(resp.data);
            console.log(resources);
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
                        <TitleInput value={titleInput} onChange={(e) => setTitleInput(e.target.value)} placeholder={'title'}/>
                    </TitleInputDiv>
                    <LinkInputDiv>
                        <span>Link: </span>
                        <LinkInput value={linkInput} onChange={(e) => setLinkInput(e.target.value)} placeholder={'link'}/>
                    </LinkInputDiv>
                </TitleAndLinkRow>
                <EditDescription>
                    <span>Description: </span>
                    <TextEditor
                        editable
                        state={description}
                        setState={(e) => handleDescriptionChange(e)}
                    />
                </EditDescription>
                <ButtonRow>
                    <Button onClick={submitResource}>Submit</Button>
                </ButtonRow>
            </SubmitResource>
        </OuterDiv>
    , document.querySelector('#modal'))
};

export default ResourcesSubmitResource