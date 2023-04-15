import React from 'react';
import {useDispatch} from 'react-redux';
import {isLogged} from '../helpers/auth';
import { addComment,deleteComment } from '../redux/actions/postActions';
import {Comment} from '../components/Comment';

export default function CommentList({postId,comments}) {
    const jwt=isLogged();
    const dispatch=useDispatch();
    const[text,setText]=React.useState("");
  return (
    <div>
       <div className="p-4 my-2 d-flex flex-row align-items-center">
       <img src={`http://localhost/api/user/photo/${jwt.user._id}${new Date.getTime()}`} alt={jwt && jwt.user.name} width={50} height={50} className='img-fluid rounded pr-2'/>
        <div className="form-group flex-grow-1">
        <textarea rows={2} cols={30} name='text' placeholder='Commenter' 
                    value={text}
                    required
                    onChange={(event)=>setText(event.target.value)}
                    className="form-control"
                    onKeyDown={(event)=>{
                        if(event.key===13 && event.target.value){
                            dispatch(addComment(jwt.token,jwt.user._id,postId,text));
                            setText('');
                        }
                    }}
        />
        </div>
       </div>
       {
        comments.map((item,index)=>(
            <Comment comment={item} key={index} postId={postId}/>
        ))
       }
    </div>
  )
}
