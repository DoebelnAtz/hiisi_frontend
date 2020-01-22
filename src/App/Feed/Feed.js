import React, { useState, useRef, useEffect } from 'react'
import Post from './Post/Post'
import {useFetch, useRequest} from '../../Hooks/Hooks'
import {useTrail, animated} from 'react-spring'
import CreatePostPopup from './CreatePostPopup'
import Button from "../Components/Buttons/Button";
import {makeRequest} from "../Api/Api";
import {getLocal} from "../../utils/utils";

const Feed = (prop) => {

    const [popup, setPopup] = useState(false);

    const isMounted = useRef(true);

    const [posts, setPosts, isLoading] = useRequest('blogs', 'get');

    const config = { mass: 5, tension: 2000, friction: 200 };

    const trail = useTrail(posts.length, {
        config,
        opacity: !isLoading ? 1 : 0,
        x: !isLoading ? 0 : 20,
        height: !isLoading ? 80 : 0,
        from: {opacity: 0, x: 50, height: 0},
    });

    const renderList = () => {
        return (
            trail.map(({ x, height, ...rest }, i) => {
                return (
                    <animated.div
                        style={{ ...rest, transform: x.interpolate(x => `translate3d(0,${x}px,0)`) }}
                        id={'feed'} key={posts[i].b_id}>
                        <Post content={posts[i]}/>
                    </animated.div>
                )
            })
        )
    };


    return (
        <div id={'feed_container'} className={'ml-0'}>
            <Button text={'Create Post'}
                    customStyle={{margin: 'var(--viewMargin)'}}
                    onClick={() => setPopup(true)}
            >
            </Button>
            <CreatePostPopup popup={popup} setPopup={setPopup}
                             setPosts={setPosts} posts={posts}
                             isMounted={isMounted}
            />
            {!isLoading ? renderList() : null}
        </div>
    );


};

export default Feed