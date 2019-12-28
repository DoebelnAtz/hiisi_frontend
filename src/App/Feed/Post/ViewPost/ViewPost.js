import React from 'react';

import PostTitle from '../PostTitle'
import PostContent from '../PostContent'
import PostButtonRow from '../PostButtonRow'
import './viewpost.css'
import {formatDate} from "../../../../utils/utils";

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
            <div className={'container-fluid comment_section'}>
                {renderComments()}
            </div>
        </div>
    );
};

export default ViewPost;
