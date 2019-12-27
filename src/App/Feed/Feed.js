import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { fetchPosts } from "../../actions/Posts/fetchPosts";
import Post from './Post/Post'
import { makeRequest } from '../Api/Api'

const Feed = () => {

    const [posts, setPosts] = useState([]);

    const getPosts = async () => {
        const resp = await makeRequest('blogs', 'get', {});
        setPosts(resp.data)
    };

    useEffect(() => {
        getPosts();
    }, []);


    const renderList = () => {
            console.log(posts);
        return (
            posts.map((post) => {
                return (
                    <div id={'feed'} key={post.id}>
                        <Post content={post}/>
                    </div>
                )
            })
        )
    };

    if (posts)
        return (
            <div id={'feed ml-0'}>
                {renderList()}
            </div>
        );
    else{
        return (
            <div id={'feed'}>
                Loading..
            </div>
        )
    }

};

export default Feed