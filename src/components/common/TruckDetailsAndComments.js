import React, {useEffect, useState} from 'react';

export const TruckDetailsAndComments = ({firebase, truckId}) => {

  const [comments, setComments] = useState([]);

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
  return(
    <div>
      {comments.map(comment => (
        <div>
          <div key={comment.id}>
            {comment.username}
          </div>
          <div>
            {comment.text}
          </div>
        </div>      
      ))}
      
    </div>
  )
}