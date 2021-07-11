import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {Button} from './Button';
import {Input} from './Input';

export const TruckDetailsAndComments = ({firebase, truckId}) => {

  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');


  useEffect(() => {
    const unsubscribe = firebase.subscribeToTruckDetailsAndComments({
      truckId,
      onSnapshot: (snapshot) => {
        console.log("Snapshot data: ", snapshot)
        const snapshotComments = [];
        snapshot.forEach(doc => {
          snapshotComments.push({
            id:doc.id,
            ...doc.data()
          })
        })
        setComments(snapshotComments);
      }
    })
    return () => {
      if(unsubscribe){
        unsubscribe();
      }
    }
  },[])
  console.log("Comment data", comments);

  function handlePostCommentSubmit(e){
    e.preventDefault();
    console.log("Comment Text Data: ", commentText);
    firebase.postComment({
      text: commentText,
      truckId
    })
  }

  return(
    <div>
      <CommentForm
        onSubmit={handlePostCommentSubmit}
      >
        <Input value={commentText} onChange={e => {
          e.persist();
          setCommentText(e.target.value);
        } }/>
        <Button type="submit">
          Add Comment
        </Button>
      </CommentForm>
      {comments.map(comment => (
        <DetailsAndCommentsItem key={comment.id}>
          <strong>
            {comment.username}
          </strong>
          <div>
            {comment.text}
          </div>
        </DetailsAndCommentsItem>      
      ))}
      
    </div>
  )
}

const DetailsAndCommentsItem = styled.div`
border-bottom:1px solid #999999;
padding: 0.5em; 0;

strong {
  color:#989898;
}
`

const CommentForm = styled.form`
display:flex;
margin-top:2em;

${Input}{
  margin-right:0.8em;
  margin-top:auto;
  margin-bottom:auto;
  font-size:1em;
  padding:0.5em;
  background:#FFF;
  color:#999;
  border:1px solid #999;
}

${Button}{
  margin:auto 0;
}


`