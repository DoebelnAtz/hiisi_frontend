import React, {useEffect, useState} from 'react'
import {useNav, useRequest} from "../../../Hooks/Hooks";
import {withRouter} from "react-router-dom";

import './project_page.css'
import Board from "../../Board";
import Messages from "../../Messages/Messages";
import ViewPost from "../../Feed/Post/ViewPost";
import {capitalizeFirst} from "../../../utils/utils";

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
        <div id={'project_container'}>
            <div className={'row_div'}>
                <span className={'center project_title'}>{!isLoading ? capitalizeFirst(project.title) : 'Loading...'}</span>
            </div>
            <div className={'row_div'}>
                <span className={'project_collaborators'}>Collaborators: </span>{mapCollaborators()}
            </div>
            <div className={'project_dashboard'}>
                <div className={'project_dashboard_nav row_div'}>
                    <div
                        className={'dashboard_nav_board row_div col_div'}
                        onClick={() => setDashState('board')}
                    >
                        <span className={'center'}>Board</span>
                    </div>
                    <div
                        className={'dashboard_nav_comments row_div col_div'}
                        onClick={() => setDashState('comments')}

                    >
                        <span className={'center'}>Comments</span>
                    </div>
                    {project.contributor &&
                    <div
                        className={'dashboard_nav_chat row_div col_div'}
                        onClick={() => props.history.push(`/messages/${project.t_id}`)}
                    >
                        <span className={'center'}>Chat</span>
                    </div>}
                </div>
                {!isLoading && renderDash()}
            </div>
        </div>
    )
};

export default withRouter(OpenHiveProjectPage);