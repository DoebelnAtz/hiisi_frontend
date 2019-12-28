import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom'

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
        let arr = [...(props.posts), resp.data]
        props.setPosts(arr);
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

    if (props.popup) {
        return ReactDOM.createPortal(
            <div id={'popup_background'}
            >
                <div id={'popup_cont'}>
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
                                onClick={() => props.setPopup(false)}
                            />
                            <Button
                                customStyle={{marginLeft: '1rem'}}
                                text={'Submit Post'}
                                disabled={submitDisabled}
                                onClick={() => createPost(title, content)}
                            />
                        </div>

                    </div>
                </div>
            </div>,
            document.querySelector('#modal')
        );
    } else {
        return (
            <Button text={'Create Post'}
                    onClick={() => props.setPopup(true)}
            >

            </Button>
        );
    }
};

export default CreatePostPopup