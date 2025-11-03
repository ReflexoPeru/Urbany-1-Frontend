import React from 'react'
import CommentForm from '../components/CommentForm'

function CommentsPage() {
  return (
    <div style={{
      position: 'relative',
      width: '100%',
      height: 'calc(100vh - 140px)',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      paddingLeft: '5px'
    }}>
      <CommentForm />
    </div>
  )
}

export default CommentsPage