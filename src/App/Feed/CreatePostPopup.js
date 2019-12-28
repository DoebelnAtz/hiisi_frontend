import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom'
import {useSpring, useTransition, animated} from 'react-spring'
import { makeRequest } from '../Api/Api'
import Button from '../Components/Buttons/Button'
import TextArea from '../Components/TextArea'

const CreatePostPopup = (props) => {

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [submitDisabled, setSubmitDisabled] = useState(true);

    const createPost = async (title, content) => {
        let now = new Date().toISOString();
        console.log(now);
        let resp = await makeRequest('blogs/', 'post', {
            creator: JSON.parse(localStorage.getItem('token')).id,
            post: content,
            title: title,
            event: false,
            published_date: now,
        });
        console.log(props.posts);
        resp.data['comments'] = [];
        resp.data['likes'] = 0;
        props.setPosts([...(props.posts), resp.data]);
        props.setPopup(false);
        setTitle('');
        setContent('');
    };

    useEffect(() => {
        validateInput();
    }, [title.length, content.length]);


    const handleChange = (e, func) => {
        func(e.target.value);

    };

    const validateInput = () => {
        if ((title.length && content.length) && title.length <= 30 && content.length <= 300) {
            setSubmitDisabled(false)
        } else {
            setSubmitDisabled(true)
        }
    };

    const fadeIn = useTransition(props.popup, null, {
        from: {opacity: 0},
        enter: {opacity: 1},
        leave: {opacity: 0}
    });

    const slideIn = useSpring({transition: props.popup ? 'translateY(100)' : 'translateY(100)'});

    const propHolder = props; // react-springs overwrites props? temporary fix

    return ReactDOM.createPortal(
        fadeIn.map(({ item, key, props }) => item &&
        <animated.div id={'popup_background'}
                      key={key}
                      style={props}
        >
            <animated.div style={slideIn} id={'popup_cont'}>
                <div className={'container'}>
                    <div className={'row justify-content-center my-2'}>
                        Create Post
                    </div>
                    <div className={'row justify-content-center'}>
                        <TextArea
                            customStyle={{maxHeight: '5vh', height: '3vh'}}
                            id={'title_input'}
                            placeholder={'Title'}
                            onChange={(e) => handleChange(e, setTitle)}
                            count={title.length}
                            max={30}
                        />
                    </div>
                    <div className={'row justify-content-center'}>
                        <TextArea
                            customStyle={{maxHeight: '25vh', height: '20vh'}}
                            id={'content_input'}
                            placeholder={'Content'}
                            onChange={(e) => handleChange(e, setContent)}
                            count={content.length}
                            max={500}
                        />
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
export default CreatePostPopup;