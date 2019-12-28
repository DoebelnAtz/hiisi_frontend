import React, { useState, useEffect } from 'react'
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
        if (posts.length) {
            return (
                posts.map((post) => {
                    return (
                        <div id={'feed'} key={post.id}>
                            <Post content={post}/>
                        </div>
                    )
                })
            )
        }
        else{
            return(<div>Loading...</div>)
        }
    };

    return (
        <div id={'feed ml-0'}>
            <button id={'create_post_btn'} className={'mt-2'}>Create Post</button>
            {renderList()}
        </div>
    );
}

export default Feed