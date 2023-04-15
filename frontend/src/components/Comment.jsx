import React from 'react'
import { deleteComment } from '../redux/actions/postActions';
import { isLogged } from '../helpers/auth';
import { useDispatch } from 'react-redux';
export default function Comment({comment,postId}) {
    const date=new Date(comment.created);
    const jwt=isLogged();
    const dispatch=useDispatch();
  return (
    <div className='mb-2 col-12'>
   <div className="card-header bg-danger text-white rounded">
     <div className="d-flex flex-row justify-content-start">
     <img src={`http://localhost/api/user/photo/${postedBy}${new Date.getTime()}`} alt={comment.postedBy.name} width={50} height={50} className='img-fluid rounded pr-2'/>
     </div>
     <div>
        <h5 className="text-white">
            {comment.postedBy.name}
        </h5>
        <h5 className="text-white">
            {date.toLocaleDateString()}
        </h5>
     </div>
     {
        postedBy===jwt.user._id && 
        (
            <div className="align-self-end">
                <i className="fa fa-trash btn btn-danger float-right"onClick={()=>dispatch(deleteComment(jwt.token,jwt.uer._id,postId,comment))}></i>
            </div>
        )
            
    }
   </div>
   <div className="card-body">
    <div className="card-text">
        {comment.text}
    </div>
   </div>
    </div>
  )
}
