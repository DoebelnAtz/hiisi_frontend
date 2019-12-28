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
        if (props.isMounted) {
            console.log('updating');
            props.setPosts([...(props.posts), resp.data]);
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

    const propHolder = props; // react-springs overwrites props? temporary fix

    return ReactDOM.createPortal(
        slideIn.map(({ item, key, props }, i) => item &&
        <animated.div key={i} style={fadeIn} id={'popup_background'}
        >
            <animated.div
                          style={props} id={'popup_cont'}>
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
                            max={80}
                        />
                    </div>
                    <div className={'row justify-content-center'}>
                        <TextArea
                            customStyle={{maxHeight: '15vh', height: '15vh'}}
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