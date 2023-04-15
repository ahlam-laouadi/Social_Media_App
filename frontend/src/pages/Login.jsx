import React from 'react'
import { useDispatch,connect } from 'react-redux';
import { login } from '../redux/actions/userActions';
import { useNavigate } from 'react-router-dom';

 function Login({userError,userSuccess}) {
   const navigate=useNavigate();
    const [user,setUser]=React.useState({
        email:"",
        password:"",
    })
    const [error,setError]=React.useState(null);
    const [success,setSuccess]=React.useState(false);
    const dispatch=useDispatch();
      React.useEffect(()=>{
         if(userError && userError!==null){
            setError(userError);
         }
         if(userSuccess){
            setSuccess(userSuccess);
            dispatch({type:"TOGGLE_SUCCESS"});
         }
         return()=>{
            dispatch({type:"HIDE_USER_ERROR"});
         }
      },[userError,userSuccess,dispatch]);

    function handleInputChange(event){
       setError("");
       setUser({...user,[event.target.name]:event.target.value});
    }
    function handelFormSubmit(event){
      event.preventDefault();
      dispatch(login(user));
    }
    function showError(){
      return error && <div className="alert alert-danger">{error}</div>
    }
    function redirectUser(){
      return success &&  navigate('/');
    }
  return (
    <div className="container">
        <div className="row-my-5">
            <div className="col-md-6 mx-auto">
               {showError()}
               {redirectUser()}
                <div className="card-title">Connexion</div>
                <form onSubmit={handelFormSubmit} className='card p-2'>
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
                        value={user.password}
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
export default connect(mapStateProps,null)(Login); 