import React, {useState} from 'react';
import {useRequest} from "../../Hooks";

import {
    ResourceCard,
    Resources,
    Tag,
    Tags,
    ResourceTitle,
    DeleteButton,
    SubmitResourceButton,
    FilterButton, ResourcePageHead
} from "./Styles";
import SubmitResource from './SubmitResource'
import  Button  from '../Components/Buttons/Button'
import {makeRequest} from "../Api/Api";
import {getLocal} from "../../utils/utils";

const ResourcesHome = (props) => {

    const filterResources = (resourceList) => {
        return (resourceList
            .filter(resource => !filter || !!resource.tags.find(tag => tag.title === filter)))
    };

    const [filter, setFilter] = useState(false);
    const [resources, setResources, isLoading] = useRequest(`resources?page=1&filter=${filter}`, 'get');
    const [popup, setPopup] = useState(false);
    console.log(resources);

    const deleteResource = async (rId) => {
        let deleted = await makeRequest('resources/delete_resource', 'delete', {
            userId: getLocal('token').user.u_id,
            resourceId: rId
        });
        if (deleted?.data?.success) {
            setResources(resources.filter(resource => resource.r_id !== rId));
        }
    };

    const renderResources = () => {
        return (

                resources.map(resource => {
                return (
                    <ResourceCard
                        key={resource.r_id}

                    >
                        <ResourceTitle
                            onClick={() => {props.history.push(`/resources/${resource.r_id}`)}}
                        >
                             {resource.title}
                        </ResourceTitle>
                        <Tags>
                                {resource.tags.map((tag, index) =>
                                    <Tag
                                    color={resource.colors[index]}
                                    key={index}
                                    onClick={() => setFilter(tag)}
                                >
                                        # {tag}
                                </Tag>
                                )}
                        </Tags>
                        <DeleteButton>
                            {resource.owner && <Button onClick={() => deleteResource(resource.r_id)}>X</Button>}
                        </DeleteButton>
                    </ResourceCard>
                )
            })
        )
    };

    return (
        <Resources >
            <ResourcePageHead>
                <SubmitResourceButton onClick={() => setPopup(true)}>Submit Resource</SubmitResourceButton>
                <FilterButton onClick={() => setFilter(false)}>Filter: {!filter ? 'None' : filter}</FilterButton>
            </ResourcePageHead>
            {!isLoading && renderResources()}
            {popup && <SubmitResource popup setResources={setResources} resources={resources} setPopup={setPopup}/>}
        </Resources>
    )
};

export default ResourcesHome;
