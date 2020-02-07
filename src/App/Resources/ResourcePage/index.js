import React, {useState} from 'react';
import {useRequest} from "../../../Hooks/Hooks";
import {
    ResourceComments,
    ResourceDescription,
    ResourceHeader,
    ResourcePage,
    ResourceTitle
} from "./Styles";
import  TextEditor  from "../../Components/TextEditor";
import ViewPost from '../../Feed/Post/ViewPost';
const ResourceInfoPage = (props) => {

    const [resource, setResource, isLoading] = useRequest(`resources/${props.match.params.rid}`, 'get');
    const [description, setDescription] = useState(resource.description);

    console.log(resource, isLoading);

    const handleDescriptionChange = (e) => {
        setDescription(e);
        setResource({...resource, description: e})
    };

    return (
        <ResourcePage>
            <ResourceHeader>
                <ResourceTitle>
                    <a href={`${resource.link}`}>{resource.title}</a>
                </ResourceTitle>
            </ResourceHeader>
            <ResourceDescription>
                {!isLoading &&
                    <TextEditor
                        state={resource.description}
                        setState={(e) => handleDescriptionChange(e)}
                    />
                }
            </ResourceDescription>
            <ResourceComments>
                {!isLoading &&
                    <ViewPost
                        focusList={{focus: [resource.username], title: 'author'}}
                        commentthread={resource.commentthread}
                    />
                }
            </ResourceComments>
        </ResourcePage>
    )
};

export default ResourceInfoPage;
