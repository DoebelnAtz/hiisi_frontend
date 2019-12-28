import React, { useState, useEffect } from 'react'
import Post from './Post/Post'
import { makeRequest } from '../Api/Api'

import CreatePostPopup from './CreatePostPopup'
import Button from "../Components/Buttons/Button";

const Feed = () => {

    const [posts, setPosts] = useState([]);
    const [popup, setPopup] = useState(false);

    const getPosts = async () => {
        const resp = await makeRequest('blogs', 'get', {});
        setPosts(resp.data)
    };

    const renderPopup = () => {
        return (
            <CreatePostPopup popup={popup} setPopup={setPopup}
                             setPosts={setPosts} posts={posts}/>
        )
    };

    useEffect(() => {
        getPosts();
    }, []);

    const renderList = () => {
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
            return(
                <div>

                </div>
            )
        }
    };
    if (posts.length) {
        return (
            <div id={'feed ml-0'}>
                <Button text={'Create Post'}
                        onClick={() => setPopup(true)}
                >
                </Button>
                {renderPopup()}
                {renderList()}
            </div>
        );
    } else {
        return(
            <div>

            </div>
        )
    }
};

export default Feed