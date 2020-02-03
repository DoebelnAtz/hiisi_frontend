import React from 'react'

import { Avatar } from './Styles'

const ComponentAvatar = (props) => {
    return (
        <Avatar src={props.src} size={props.size}/>
    )
};

export default ComponentAvatar;