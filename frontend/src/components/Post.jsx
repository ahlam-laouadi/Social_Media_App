import React from 'react';
import { isLogged } from '../helpers/auth';
import {useDispatch} from 'react-redux';
import { deletePost, likePost,unlikePost } from '../redux/actions/postActions';
import CommentList from './CommentList';

export default function Post({post}) {
    const [likes,setLikes]=React.useEffect([]);
    const [like,setLike]=React.useEffect(false);
    const [comments,setComments]=React.useEffect([]);
    const date=new Date(post.createdAt);
    const jwt=isLogged();
    const dispatch=useDispatch();
    const postedBy=post.postedBy._id||post.postedBy;

    React.useEffect(()=>{
    setLikes(post && post.likes)
    setComments(post && post.comments)
    checkLike(post && post.likes);
    },[post.likes,post.comments]);
    function checkLike(likes){
    let match=likes.indexOf(jwt.user._id)!==-1;
    setLike(match);
    }
  return (
    <div className='card mb-2 border border-primary'>
     <div className="card-header bg-light">
       <div className="post-image d-flex flex-row justify-content-start">
       <img src={`http://localhost/api/user/photo/${postedBy}${new Date.getTime()}`} alt={post.postedBy.name} width={50} height={50} className='img-fluid rounded pr-2'/>        <div className="post-by">
            <h5 className="text-dark">
                {post.postedBy.name || jwt.user.name}
            </h5>
            <h5 className="text-danger">
                {date.toLocaleDateString()}
            </h5>
            {
               postedBy===jwt.user._id && 
               (
                  <div className="align-self-end">
                     <i className="fa fa-trash btn btn-danger float-right"onClick={()=>dispatch(deletePost(jwt.token,post._id))}></i>
                 </div>
               )
            
            }
        </div>
        </div>       
     </div>
     <div className="card-body">
        {post.text}
     </div>
     <div className="card-footer">
        <div className="d-flex flex-row justify-content-center aligns-items-center">
            { 
                like ?            
               <>
                  <h5 className="mr-2">
                  <span className="badge badge-danger p-2 mr-2">
                  {" "}
                  {likes.length}{" "}
                  </span>
                  </h5>
                  <i className="fa fa-heart text-danger mr-2" onClick={()=>dispatch(unlikePost(jwt.token,jwt.user._id,post._id))}></i>
               </>
               :
                <>
                  <h5 className="mr-2">
                  <span className="badge badge-danger p-2 mr-2">
                  {" "}
                  {likes.length}{" "}
                     </span>
                  </h5>
                  <i className="far fa-heart text-danger mr-2" onClick={()=>dispatch(likePost(jwt.token,jwt.user._id,post._id))}></i>
               </>
            }
             <h5 className="mr-2">
                <span className="badge badge-primary p-2 mr-2">
                 {" "}
                 {comments.length}{" "}
                </span>
             </h5>
             <i className="fa fa-comment text-primary"></i>
        </div>
     </div>
     <CommentList postId={post._id} comments={comments && comments}/>
    </div>
  )
}
