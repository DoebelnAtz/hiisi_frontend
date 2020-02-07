import React, {useState} from 'react';
import {useRequest} from "../../Hooks/Hooks";
import {ResourceCard, Resources, Tag, Tags, ResourceTitle, DeleteButton } from "./Styles";
import {withRouter} from "react-router-dom";
import SubmitResource from './SubmitResource'
import  Button  from '../Components/Buttons/Button'
import {makeRequest} from "../Api/Api";
import {getLocal} from "../../utils/utils";
const ResourcesHome = (props) => {

    const [resources, setResources, isLoading] = useRequest('resources', 'get');
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
                                {resource.tags.map(tag => <Tag color={tag.color}># {tag.title}</Tag>)}
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
            <Button onClick={() => setPopup(true)}>Submit Resource</Button>
            {!isLoading && renderResources()}
            {popup && <SubmitResource popup setResources={setResources} resources={resources} setPopup={setPopup}/>}
        </Resources>
    )
};

export default ResourcesHome;
