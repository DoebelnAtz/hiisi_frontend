import React from 'react'
import { withRouter } from "react-router-dom";

import { useNav, useRequest } from "../../Hooks/Hooks";
import {CollaboratorList, ProjectItem, ProjectList} from "./Style";

const Projects = (props) => {

    const [projects, setProjects, isLoading] = useRequest('projects', 'get');

    useNav('Open Hive');

    const renderProjects = () => {
        return (
            projects.map(project => {
                return (
                    <ProjectItem
                        key={project.project_id}
                        onClick={() => props.history.push(`/projects/${project.project_id}`)}
                    >
                        {project.title}
                        <CollaboratorList>
                            {project.collaborators.map((collaborator) => {
                                return (
                                    <img
                                        key={collaborator.u_id}
                                        src={collaborator.profile_pic}
                                    />
                                );
                            })}
                        </CollaboratorList>
                    </ProjectItem>
                )
            })
        )
    };

    return (
        <ProjectList>
            {renderProjects()}
        </ProjectList>
    )
};

export default withRouter(Projects)