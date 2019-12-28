import React from 'react';
import ReactDOM from 'react-dom'

import Button from '../Components/Buttons/Button'

const CreatePostPopup = (props) => {
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
                            <input placeholder={'title'}/>
                        </div>
                        <div className={'row justify-content-center'}>
                            <textarea placeholder={'content'}></textarea>
                        </div>
                        <div className={'row justify-content-center btn_row'}>
                            <Button
                                text={'Back'}
                                onClick={() => props.setPopup(false)}
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