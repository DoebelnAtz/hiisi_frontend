import React from 'react';

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
        <div id={'view_post_container'} className={'container pb-1'}>
            <div className={'comment_section'}>
                {renderComments()}
            </div>
        </div>
    );
};

export default ViewPost;
