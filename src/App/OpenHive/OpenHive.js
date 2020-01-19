import React, {Component, useEffect, useState} from 'react'
import {makeRequest} from "../Api/Api";

const Projects = (props) => {


    const [projects, setProjects] = useState([]);

    useEffect(() => {
        getProjects();
    }, []);




    const getProjects = async () => {
        let resp = await makeRequest('projects', 'get');
        if (resp)
            setProjects(resp.data);
    };

    const renderProjects = () => {
        return (
            projects.map(project => {
                return (
                    <div
                        key={project.project_id}
                        className={'project_item'}
                    >
                        {project.title}
                    </div>
                )
            })
        )
    };

    return (
        <div className={'project_list'}>
            {renderProjects()}
        </div>
    )
};

export default Projects