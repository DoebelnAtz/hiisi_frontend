import React from 'react';

import './viewpost.css'
import {Reply} from "./Reply";

const ViewPost = (props) => {

    const renderComments = (comment=props.content.comments) => {
        return(
        comment.map((child) => {
            return(
              <li className={'comment_item'} key={child.id}>
                  <p>{child.comment}</p>
                  <Reply comment_id={child.id} blog_id={null}/>
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
            <Reply comment_id={null} blog_id={props.content.id} />
            <ul className={'comment_section'}>
                {renderComments()}
            </ul>
        </div>
    );
};

export default ViewPost;
