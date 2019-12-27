import React from 'react'

import './post.css'

const PostTitle = props => {

  return (
      <div className={'row feed_title'}>
          <span className={'post_title'}>{props.title}</span>
          <span className={'post_author'}>{props.author}</span>
          <span className={'post_date'}>{props.date}</span>
      </div>
  )
};

export default PostTitle