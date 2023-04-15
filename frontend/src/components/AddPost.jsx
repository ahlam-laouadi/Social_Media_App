import React from 'react';
import {useDispatch} from 'react-redux';
import {Link} from 'react-router-dom';
import {isLogged} from '../helpers/auth';
import { addPost } from '../redux/actions/postActions';

export default function AddPost() {
    const jwt=isLogged();
    const dispatch=useDispatch();
    const [post,setPost]=React.useState(({
        text:" ",
   }))
    function handleInputChange(event){
        setPost({...post,[event.target.name]:event.target.value});
     }
     function handelFormSubmit(event){
        event.preventDefault();
        dispatch(addPost(jwt.token,jwt.user_id,post));
        setPost({...post,text:""});
      }
   
  return (
    <div className="container">
    <div className="row-my-5">
        <div className="col-md-6 mx-auto">
            <div className="card-title">Publier</div>
            <form onSubmit={handelFormSubmit} className='card p-2'>
                 <div className="form-group">
                    <textarea rows={5} cols={30} name='text' placeholder='Publier' 
                    value={post.text}
                    required
                    onChange={(event)=>handleInputChange(event)}
                    className="form-control"
                    />
                 </div>
                 <div className="form-group">
                    <button type="submit" className='btn btn-outline-primary'>Valider</button>
                 </div>
            </form>
        </div>
    </div>
</div>
  )
}
