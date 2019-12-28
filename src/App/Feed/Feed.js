import React, { useState, useEffect, useRef } from 'react'
import Post from './Post/Post'
import { makeRequest, useFetch } from '../Api/Api'
import {useSprings, useTransition, useTrail, animated} from 'react-spring'
import CreatePostPopup from './CreatePostPopup'
import Button from "../Components/Buttons/Button";

const Feed = (prop) => {

    const [posts, setPosts] = useState([]);
    const [popup, setPopup] = useState(false);

    const isMounted = useRef(true);

    const getPosts = async () => {
        console.log(prop.renderCount.current);
        const resp = await makeRequest('blogs', 'get', {});
        if(isMounted.current) // make sure we aren't updating an unmounted component
            setPosts(resp.data);};

    (useFetch( 'blogs', setPosts ));

    const config = { mass: 5, tension: 2000, friction: 200 };

    const trail = useTrail(posts.length, {
        config,
        opacity: posts.length ? 1 : 0,
        x: posts.length ? 0 : 20,
        height: posts.length ? 80 : 0,
        from: {opacity: 0, x: 50, height: 0},
    });

    const renderList = () => {
        return (
            trail.map(({ x, height, ...rest }, i) => {
                return (
                    <animated.div
                        style={{ ...rest, transform: x.interpolate(x => `translate3d(0,${x}px,0)`) }}
                        id={'feed'} key={posts[i].id}>
                        <Post content={posts[i]}/>
                    </animated.div>
                )
            })
        )
    };

    if (posts.length) {
        return (
            <div id={'feed ml-0'}>
                <Button text={'Create Post'}
                        onClick={() => setPopup(true)}
                >
                </Button>
                <CreatePostPopup popup={popup} setPopup={setPopup}
                                 setPosts={setPosts} posts={posts}
                                 isMounted={isMounted}
                />
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