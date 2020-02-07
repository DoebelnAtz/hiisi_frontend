import React, {useState} from 'react';
import {useRequest} from "../../../Hooks/Hooks";
import {
    ResourceComments,
    ResourceDescription,
    ResourceHeader,
    ResourcePage, ResourceTag, ResourceTags,
    ResourceTitle,
    AddTagInput, ResourceContent
} from "./Styles";
import  TextEditor  from "../../Components/TextEditor";
import ViewPost from '../../Feed/Post/ViewPost';

const ResourceInfoPage = (props) => {

    const [resource, setResource, isLoading] = useRequest(`resources/${props.match.params.rid}`, 'get');
    const [description, setDescription] = useState(resource.description);
    const [tagSearch, setTagSearch] = useState('');

    const [results, setResults, isLoadingResults] = useRequest(`resources/tags?q=${tagSearch}`, 'get');

    console.log(resource, isLoading);

    const handleDescriptionChange = (e) => {
        setDescription(e);
        setResource({...resource, description: e})
    };

    const renderSearchResults = () => {
        return (
            results.map(tag => {
                    return (
                        <div key={tag.tag_id}>{tag.title}</div>
                    )
                }
            )
        )
    };

    return (
        <ResourcePage>
            <ResourceHeader>
                <ResourceTitle>
                    <a href={`${resource.link}`}>{resource.title}</a>
                </ResourceTitle>
                <ResourceTags>
                    {!isLoading && resource.tags.map(tag => {return(
                        <ResourceTag key={tag.tag_id} color={tag.color}>
                            # {tag.title}
                        </ResourceTag>

                        )})
                    }

                </ResourceTags>
            </ResourceHeader>
            <ResourceContent>

            <ResourceDescription>
                {!isLoading &&
                    <TextEditor
                        state={resource.description}
                        setState={(e) => handleDescriptionChange(e)}
                    />
                }
            </ResourceDescription>
                {!!resource?.tags?.length < 3 && <AddTagInput
                    value={tagSearch}
                    onChange={(e) => {setTagSearch(e.target.value)}}
                    placeholder={'+ Add Tag'}
                />}
                {!isLoadingResults && renderSearchResults()}
            </ResourceContent>

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
