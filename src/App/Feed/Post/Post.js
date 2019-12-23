import React from 'react'

import { formatDate} from "../../../utils/utils";
import PostTitle from './PostTitle'
import PostContent from './PostContent'
import ButtonRow from './PostButtonRow'

const Post = props => {

    return (
            <div className={'container feed_item'}>
                <div className={'col'}>
                    <PostTitle title={props.content.title}
                               author={(props.content.creator) ? props.content.creator.username : 'Event'}
                               date={formatDate(props.content.published_date)}/>
                    <PostContent content={props.content.post}/>
                    <ButtonRow content={props.content}/>
                </div>
            </div>
        );
};

export default Post