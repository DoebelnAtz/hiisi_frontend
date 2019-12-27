import React, {Component} from 'react';
import {connect} from 'react-redux';


import './viewpost.css'

const ViewPost = (props) => {

    const renderComments = (comment=props.content.comments) => {
        return(
        comment.map((child) => {
            return(
              <li className={'comment_item'} key={child.id}>
                  <p>{child.comment}</p>
                  <ul className={'comment_thread'}>
                        {renderComments(child.children)}
                  </ul>
              </li>
            )
        }
        ))
    };

    return (
        <div id={'view_post_container'} className={'container'}>
            <div className={'row'}>
                {props.content.title}
            </div>
            <div className={'row'}>
                {props.content.post}
            </div>
            <div className={'row'}>
                {props.content.author}
            </div>
            <div className={'container-fluid comment_section'}>
                {renderComments()}
            </div>
        </div>
    );
};

export default ViewPost;
