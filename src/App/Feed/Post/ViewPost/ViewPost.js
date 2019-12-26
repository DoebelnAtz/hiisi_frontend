import React, {Component} from 'react';
import {connect} from 'react-redux';

class ViewPost extends Component {

    renderComments(comment=this.props.content.comments) {
        return(

        comment.map((child) => {
            return(
              <div className={'row'} key={child.id}>
                  <p>{child.comment}</p>
                  <div className={'container'}>
                      <div className={'row'}>
                        {this.renderComments(child.children)}
                      </div>
                  </div>
              </div>
            )
        }
        ))
    }

    render() {
        console.log(this.props.content);
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
                <div className={'container'}>
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
