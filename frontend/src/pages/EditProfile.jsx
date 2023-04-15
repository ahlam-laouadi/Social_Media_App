import React from 'react'
import { connect, useDispatch } from 'react-redux';
import { useParams,useNavigate } from 'react-router-dom';
import { isLogged } from '../helpers/auth';
import { authCheck, getUser, updateUser } from '../redux/actions/userActions';

 function EditProfile({userError,userSuccess}) {
    const [user,setUser]=React.useState({
        name:"",
        email:"",
        password:"",
        about:"",
        image:"",
    })
    const [error,setError]=React.useState(null);
    const [loading,setLoading]=React.useState(true);
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const jwt=isLogged();
    const {userId}=useParams();
    const userData=new FormData();
     
    React.useEffect(()=>{
        async function getProfile(){
            const userData=await getUser(userId,jwt && jwt.token);
              if(userData.error){
                setError(userData.error);
              }
              else{
                setUser(userData.data);
              }
              
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
            navigate(`/user/${user && user._id}`);
            dispatch({type:"TOGGLE_SUCCESS"})
         }
         if(userError){
            setError(userError);
         }
     },[userError,userSuccess,navigate,user,dispatch]);

    function handleInputChange(event){
        const value=event.target.name==="image" ?event.target.files[0]:event.target.value;
       setUser({...user,[event.target.name]:value});
    }
    function handelFormSubmit(event){
      event.preventDefault();
      user.name && userData.append("name",user.name);
      user.email && userData.append("email",user.email);
      user.password && userData.append("password",user.password);
      user.about && userData.append("about",user.about);
      user.image && userData.append("image",user.image);
      dispatch(updateUser(userData,jwt.token,userId));
    }
    function showError(){
      return error && <div className="alert alert-danger">{error}</div>
    }
    
    if(!authCheck(userId)){
        navigate(`/user/${userId}`);
    }
  return (
    <div className="container">
        <div className="row-my-5">
            <div className="col-md-6 mx-auto">
               {showError()}
                <div className="card-title">Modifier mon profile</div>
                <form onSubmit={handelFormSubmit} className='card p-2'>
                    <div className="form-group">
                        <img width={200} height={200} src={`http://localhost/api/user/photo/${userId}`}  alt={user && user.name} className='img-fluid rounded' />
                    </div>
                     <div className="form-group">
                        <input type="text" name='name' placeholder='nom et prenom' 
                        value={user.name}
                        required
                        onChange={(event)=>handleInputChange(event)}
                        className="form-control"
                        />
                     </div>
                     <div className="form-group">
                        <input type="file" 
                        accept='image/*'
                        name='image'
                        onChange={(event)=>handleInputChange(event)}
                        className="form-control"
                        />
                     </div>
                     <div className="form-group">
                        <input type="email" name='email' placeholder='email' 
                        value={user.email}
                        required
                        onChange={(event)=>handleInputChange(event)}
                        className="form-control"
                        />
                     </div>
                     <div className="form-group">
                        <input type="password" name='password' placeholder='mot de passe ' 
                        value={user.password || ""}
                        required
                        onChange={(event)=>handleInputChange(event)}
                        className="form-control"
                        />
                     </div>
                     <div className="form-group">
                        <textarea rows={5} cols={30} name='about' placeholder='Bio...' 
                        value={user.about}
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

const mapStateProps=({user:{userError,userSuccess}})=>({
    userError,
    userSuccess,
 });
 export default connect(mapStateProps,null)(EditProfile); 