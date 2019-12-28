import React, { useState, useEffect } from 'react'
import Post from './Post/Post'
import { makeRequest } from '../Api/Api'

import CreatePostPopup from './CreatePostPopup'

const Feed = () => {

    const [posts, setPosts] = useState([]);
    const [popup, setPopup] = useState(true);

    const getPosts = async () => {
        const resp = await makeRequest('blogs', 'get', {});
        setPosts(resp.data)
    };

    const renderPopup = () => {
        return (
            <CreatePostPopup popup={popup} setPopup={setPopup}/>
        )
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
            {renderPopup()}

            {renderList()}
        </div>
    );
}

export default Feed