import React from 'react'
import style from './Posts.module.sass'

function Posts(props) {
  return (
    <div className={style.postsContainer}>
      <h1>Posts</h1>
      <div className={style.postsWrapper}>
        
      </div>
    </div>
  )
}

const mapStateToProps = state => state.posts;

const mapDispatchToProps = dispatch => {
  
}

export default Posts
