import React from 'react'

import { formatDate} from "../../../utils/utils";
import PostTitle from './PostTitle'
import PostContent from './PostContent'
import ButtonRow from './PostButtonRow'
import ViewPost from './ViewPost/ViewPost'

class Post extends React.Component {



    constructor(props) {
        super(props);
        this.state = {expanded: 0};
        this.content = this.props.content;

    }

    expand = () => {
        if (this.state.expanded){
            this.setState({expanded:0})
        }
        else {
            this.setState({expanded:1})
        }
    };

    render() {
        if (this.state.expanded === 1) {
            return (
                <div>
                    <button
                    onClick={this.expand}
                    >Back</button>
                    <ViewPost content={this.content}/>
                </div>

            );
        } else {
            return (
                <div className={'container feed_item'}
                onClick={this.expand}>
                    <div className={'col'}>
                        <PostTitle title={this.content.title}
                                   author={(this.content.creator) ? this.content.creator.username : 'Event'}
                                   date={formatDate(this.content.published_date)}/>
                        <PostContent content={this.content.post}/>
                        <ButtonRow content={this.content}/>
                    </div>
                </div>
            );
        }
    }

};

export default Post