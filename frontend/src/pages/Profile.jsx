import React, { useState } from 'react'
import { useParams } from 'react-router';
import { isLogged, logout } from '../helpers/auth';
import { authCheck, deleteUser } from '../redux/actions/userActions';
import { Link } from 'react-router-dom';
import Follow from '../components/Follow';
import FollowComponent from '../components/FollowComponent';
import { useDispatch ,connect} from 'react-redux';
import { getUserPosts } from '../redux/actions/postActions';

function Profile({userSuccess,userError,userPosts}) {

    const dispatch=useDispatch();
    const {userId}=useParams();
    const[error,setError]=React.useState("");
    const[following,setFollowing]=React.useState(false);
    const [loading,setLoading]=React.useState(true);
    const[user,setUser]=React.useState(null);
    const jwt=isLogged();

    React.useEffect(()=>{
     async function getProfile(){
        const userData=await getUser(userId,jwt && jwt.token);
          if(userData.error){
            setError(userData.error);
          }
          else{
            setUser(userData.data);
            setFollowing(checkFollow(userData.data));
          }
     }
     function checkFollow(user){
      const match=user.folloers.find((follower)=>{
        return follower._id===jwt.user._id;
      })
        return match;
    }
     if(loading){
      getProfile();
     }
     return()=>{
      setLoading(false);
     }
    },[userId,jwt,loading]);

     React.useEffect(()=>{
            if(userSuccess){
              logout(()=>{
               return navigate('/');
            })
            dispatch({type:"TOGGLE_SUCCESS"});
         }
         if(userError){
            setError(userError);
         }
         function loadUserPosts(){
          dispatch(getUserPosts(jwt.token,userId));
         }
         loadUserPosts();
     },[userError,userSuccess,dispatch]);

    function showError(){
        return error && <div className="alert alert-danger">{error}</div>
      }
     
      function handleButtonClick(user){
        setUser(user);
        setFollowing(!following);
      }
      if(!jwt){
        return <div className="container">
          <div className="row my-5">
            <div className="col-md-8 mx-auto">
               <div className="alert alert-info">
                <Link to={'/login'}>Connectez vous pour voir le profile!</Link>
               </div>
            </div>
          </div>
        </div>
      }
  return (
    <div className='container'>
      <div className="row my-5">
        <div className="col-md-8 mx-auto">
        {error ?showError():(
        <div className="card p-2">
            <div className="list-group-item d-flex flex-row justify-content-between  aligns-items-center">
                <img src={`http://localhost/api/user/photo/${userId}${new Date.getTime()}`} alt={user && user.name} width={50} height={50} className='img-fluid rounded pr-2'/>
                <h4 className='mt-3'>{user  && user.name}</h4>
               {
                authCheck(userId)? <div className="d-flex flex-row justify-content-between  aligns-items-center">
                  <Link to={`/user/edit/${userId}`}>
                  <i className="fa fa-edit btn mr-2 btn-warning btn-sm"></i>
                  </Link>
                  <Link to='#' onClick={()=>
                    dispatch(deleteUser(userId,jwt.token))
                  }>
                  <i className="fa fa-trash btn btn-danger btn-sm"></i>
                  </Link>
                </div>
                :<Follow following={following} handleButtonClick={handleButtonClick}
                token={jwt && jwt.token}
                followId={jwt && user._id} 
                userId={jwt && jwt.user._id}
                 />
               }
                </div>
            </div>  
            )}
            <h3 className="text-primary">
              Abonnes
            </h3>
            <FollowComponent data={user && user.followers}/>
            <hr />
            <h3 className="text-primary">
              Abonnement
            </h3>
            <FollowComponent data={user && user.following}/>
            <h3 className="text-primary">
              Publications
            </h3>
            <PostList posts={userPosts}/>
        </div>
      </div>
    </div>
  )
}

const mapStateProps=({user:{userError,userSuccess},post:{userPosts}})=>({
  userError,
  userSuccess,
  userPosts
});
export default connect(mapStateProps,null)(Profile); 