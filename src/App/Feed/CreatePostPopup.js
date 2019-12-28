import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom'

import { makeRequest } from '../Api/Api'
import Button from '../Components/Buttons/Button'

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
                        <div className={'row justify-content-center'}>
                            Create Post
                        </div>
                        <div className={'row justify-content-center'}>
                            <textarea id={'title_input'} placeholder={'title'}
                                   onChange={(e) => handleChange(e, setTitle)}
                                   value={title}/>
                        </div>
                        <div className={'row counter'}>
                            <p style={{color: title.length > 30 ? 'red' : 'black'}}>{title.length}/30</p>
                        </div>
                        <div className={'row justify-content-center'}>
                            <textarea id={'content_input'} placeholder={'content'}
                                      onChange={(e) => handleChange(e, setContent)}
                                      value={content} />
                        </div>
                        <div className={'row counter'}>
                            <p style={{color: content.length > 300 ? 'red' : 'black'}}>{content.length}/300</p>
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