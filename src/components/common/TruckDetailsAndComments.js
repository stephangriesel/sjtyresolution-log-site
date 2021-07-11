import React, {useEffect} from 'react';

export const TruckDetailsAndComments = ({firebase, truckId}) => {

  useEffect(() => {
    const unsubscribe = firebase.subscribeToTruckDetailsAndComments({
      truckId,
      onSnapshot: (snapshot) => {
        console.log("Snapshot data: ", snapshot)
      }
    })
    return () => {
      if(unsubscribe){
        unsubscribe();
      }
    }
  },[])
  return(
    <div>
      Comment Test
    </div>
  )
}