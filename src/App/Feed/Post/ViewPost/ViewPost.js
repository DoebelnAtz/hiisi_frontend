import React, {Component} from 'react';
import {connect} from 'react-redux';


import './viewpost.css'

class ViewPost extends Component {

    renderComments(comment=this.props.content.comments) {
        return(

        comment.map((child) => {
            return(
              <li className={'comment_item'} key={child.id}>
                  <p>{child.comment}</p>
                  <ul className={'comment_thread'}>
                        {this.renderComments(child.children)}
                  </ul>
              </li>
            )
        }
        ))
    }

    render() {
        return (
            <div id={'view_post_container'} className={'container'}>
                <div className={'row'}>
                    {this.props.content.title}
                </div>
                <div className={'row'}>
                    {this.props.content.post}
                </div>
                <div className={'row'}>
                    {this.props.content.author}
                </div>
                <div className={'container-fluid comment_section'}>
                    {this.renderComments()}
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {};
}

export default connect(
    mapStateToProps,
)(ViewPost);
