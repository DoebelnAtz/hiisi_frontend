import React, {useEffect, useState} from 'react'
import {useNav, useRequest} from "../../../Hooks/Hooks";
import {withRouter} from "react-router-dom";

import './project_page.css'
import Boards from "../../Boards/Boards";
import Messages from "../../Messages/Messages";

const ProjectPage = (props) => {
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
        if (dashState === 'board') {
            return (
                <Boards board_id={project.board_id}/>
        )
        } else if (dashState === 'chat') {
            return (
                <Messages tid={project.t_id}/>
            )
        }
    };

    return (
        <div id={'project_container'}>
            <div className={'row_div'}>
                <span className={'center'}>{project.title}</span>
            </div>
            <div className={'row_div'}>
                {mapCollaborators()}
            </div>
            <div className={'project_dashboard'}>
                <div className={'project_dashboard_nav row_div'}>
                    <div
                        className={'dashboard_nav_board row_div'}
                        onClick={() => setDashState('board')}
                    >
                        <span className={'center'}>Board</span>
                    </div>
                    <div
                        className={'dashboard_nav_chat row_div'}
                        onClick={() => setDashState('chat')}
                    >
                        <span className={'center'}>Chat</span>
                    </div>
                </div>
                {!isLoading && renderDash()}
            </div>
        </div>
    )
};

export default withRouter(ProjectPage);