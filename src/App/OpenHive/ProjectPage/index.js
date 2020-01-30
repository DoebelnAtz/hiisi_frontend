import React, {useEffect, useState} from 'react'
import {useNav, useRequest} from "../../../Hooks/Hooks";
import {withRouter} from "react-router-dom";

import Board from "../../Board";
import Messages from "../../Messages/Messages";
import ViewPost from "../../Feed/Post/ViewPost";
import {capitalizeFirst} from "../../../utils/utils";
import
{
    ProjectPage, ProjectInfo,
    ProjectCollaborators, ProjectDashBoard,
    ProjectTitle, ProjectDashboardNav, ProjectDashBoardNavItem
} from "./Style";

const OpenHiveProjectPage = (props) => {
    const [pid, setPid] = useState(props.match.params.pid);
    const [dashState, setDashState] = useState('board');
    const [project, setProject, isLoading] = useRequest('projects/' + pid, 'get');
    useNav('Open Hive');

    console.log(isLoading);
    useEffect(() => {
        setPid(props.match.params.pid)
    }, [props.match.params.pid]);

    const mapCollaborators = () => {
        if (!isLoading) {
            return (
                project.collaborators.map((collaborator) => {
                return (
                    <img
                        key={collaborator.u_id}
                        className={'collaborator_avatar'}
                        src={collaborator.profile_pic}
                    />
                );
            })
            )
        } else {
            return(<div>Loading...</div>)
        }
    };

    const renderDash = () => {
        console.log(project);
        switch(dashState) {
            case('board'):
                return (<Board board_id={project.board_id}/>);
            case('chat'):
                return (<Messages tid={project.t_id}/>);
            default:
                return (<ViewPost focusList={{focus: project.collaborators.map(user => user.username), title: 'collaborator'}} commentthread={project.commentthread}/>)
        }
    };

    return (
        <ProjectPage>
            <ProjectInfo>
                <ProjectTitle>{!isLoading ? capitalizeFirst(project.title) : 'Loading...'}</ProjectTitle>
            </ProjectInfo>
            <ProjectCollaborators>
                <span className={'project_collaborators'}>Collaborators: </span>{mapCollaborators()}
            </ProjectCollaborators>
            <ProjectDashBoard>
                <ProjectDashboardNav>
                    <ProjectDashBoardNavItem
                        onClick={() => setDashState('board')}
                    >
                        <span>Board</span>
                    </ProjectDashBoardNavItem>
                    <ProjectDashBoardNavItem
                        onClick={() => setDashState('comments')}
                    >
                        <span>Comments</span>
                    </ProjectDashBoardNavItem>
                    {project.contributor &&
                    <ProjectDashBoardNavItem
                        onClick={() => props.history.push(`/messages/${project.t_id}`)}
                    >
                        <span>Chat</span>
                    </ProjectDashBoardNavItem>}
                </ProjectDashboardNav>
                {!isLoading && renderDash()}
            </ProjectDashBoard>
        </ProjectPage>
    )
};

export default withRouter(OpenHiveProjectPage);