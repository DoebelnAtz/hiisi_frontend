import React, {useState, useEffect, useRef} from 'react';
import ReactDOM from 'react-dom'
import {useSpring, useTransition, animated} from 'react-spring'
import { makeRequest } from '../Api/Api'
import Button from '../Components/Buttons/Button'
import TextArea from '../Components/TextArea'
import {getLocal} from "../../utils/utils";
import {useDismiss} from "../../Hooks/Hooks";

const CreatePostModal = (props) => {

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [submitDisabled, setSubmitDisabled] = useState(true);
    const inside = useRef();

    useDismiss(inside, () => props.setPopup(false));

    const createPost = async (title, content) => {
        let now = new Date().toISOString();
        console.log(now);
        let resp = await makeRequest('blogs/create_blog', 'post', {
            authorId: getLocal('token').user.u_id,
            content,
            title,
            published_date: now
        });
        console.log(props.posts);

        if (props.isMounted) {
            console.log('updating');
            props.setPosts([resp.data, ...(props.posts)]);
            props.setPopup(false);
        }
        setTitle('');
        setContent('');

    };

    useEffect(() => {
        if (props.isMounted) {
            validateInput(); // eslint-disable-next-line
        }
    }, [title.length, content.length]);


    const handleChange = (e, func) => {
        func(e.target.value);
    };

    const validateInput = () => {
        if ((title.length && content.length) && title.length <= 80 && content.length <= 500) {
            setSubmitDisabled(false)
        } else {
            setSubmitDisabled(true)
        }
    };

    const slideIn = useTransition(props.popup, null, {
        from: {transform: 'translateY(100%)'},
        enter: {transform: 'translateY(0%)'},
        leave: {transform: 'translateY(-200px)'}
    });

    const fadeIn = useSpring({opacity: props.popup ? 1 : 0});

    const propHolder = props; // react-springs overwrites props? temporary fix cant rename props in map func..

    return ReactDOM.createPortal(
        slideIn.map(({ item, key, props }, i) => item &&
        <animated.div
            key={i}
            style={fadeIn}
            id={'popup_background'}
        >
            <animated.div
                          style={props}
                          id={'popup_cont'}
                          ref={inside}
            >
                <div className={'container'}>
                    <div className={'row justify-content-center my-2'}>
                        Create Post
                    </div>
                    <div className={'row justify-content-center'}>
                        <div className={'textarea_div'}>
                            <div className={'row justify-content-center area_div'}>
                                <textarea style={{maxHeight: '5vh', height: '3vh'}}
                                          className={'textarea_cont'}
                                          placeholder={'Title'}
                                          onChange={(e) => handleChange(e, setTitle)}
                                >
                                        </textarea>
                                </div>
                                <div className={'row justify-content-center counter'}>
                                    <p style={{color: title.length > 80 ? 'red' : 'var(--logoMain)'}}>{title.length}/{80}</p>
                                </div>
                        </div>
                    </div>
                    <div className={'row justify-content-center'}>
                        <div className={'textarea_div'}>
                            <div className={'row justify-content-center area_div'}>
                                <textarea style={{maxHeight: '15vh', height: '15vh'}}
                                          className={'textarea_cont'}
                                          placeholder={'Content'}
                                          onChange={(e) => handleChange(e, setContent)}
                                >
                                </textarea>
                            </div>
                            <div className={'row justify-content-center counter'}>
                                <p style={{color: content.length > 500 ? 'red' : 'var(--logoMain)'}}>{content.length}/{500}</p>
                            </div>
                        </div>
                    </div>

                    <div className={'row justify-content-center btn_row mt-2'}>
                        <Button
                            text={'Back'}
                            onClick={() => propHolder.setPopup(false)}
                        />
                        <Button
                            customStyle={{marginLeft: '1rem'}}
                            text={'Submit Post'}
                            disabled={submitDisabled}
                            onClick={() => createPost(title, content)}
                        />
                    </div>

                </div>
            </animated.div>
        </animated.div>),
        document.querySelector('#modal')
    );

};
export default CreatePostModal;