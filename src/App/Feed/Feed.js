import React from 'react'
import { connect } from 'react-redux'
import { fetchPosts } from "../../actions/Posts/fetchPosts";
import Post from './Post/Post'

class Feed extends React.Component {
    componentDidMount() {
        this.props.fetchPosts();
    }
    renderList() {
        return (
            this.props.posts.map((post) => {
                return (
                    <div id={'feed'} key={post.id}>
                        <Post content={post}/>
                    </div>
                )
            })
        )
    }
    render() {
        if (this.props.posts)
            return (
                <div id={'feed'}>
                    {this.renderList()}
                </div>
            );
        else{
            return (
                <div id={'feed'}>
                    Loading..
                </div>
            )
        }
    }

}

const mapStateToProps = (state) => {
    return {
        posts: state.posts,
    };
};

export default connect(mapStateToProps, { fetchPosts })(Feed)