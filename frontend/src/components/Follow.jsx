import React from 'react'
import { subscribe, unsubscribe } from '../redux/actions/userActions';

export default function Follow({
    handleButtonClick,
    following,
    userId,
    token,
    followId
});
async function followUser(){
     const userData=await subscribe(userId,followId,token);
    if(userData.error){
      setError(userData.error);
    }
    else{
      handleButtonClick(userData.data);
    }
}
async function unFollowUser(){
    const userData=await unsubscribe(userId,followId,token);
    if(userData.error){
      setError(userData.error);
    }
    else{
      handleButtonClick(userData.data);
    }
}
{
  return (
    <div>
        <div className="row my-4">
            <div className="col-md-8 mx-auto">
                {
                    following ? 
                    <button className="btn btn-danger" onClick={()=>unFollowUser()}>
                          Se desabonner
                    </button>
                    :
                    <button className="btn btn-primary" onClick={()=>followUser()}>
                    Suivre
                    </button>
                }
            </div>
        </div>
    </div>
  )
}
