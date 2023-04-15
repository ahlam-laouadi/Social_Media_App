import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch,connect } from 'react-redux';
import { getAllUsers } from '../redux/actions/userActions';
import { isLogged } from '../helpers/auth';

function Users({users,userError}) {
  console.log(users);
    const dispatch=useDispatch();
    const [error,setError]=React.useState(null);
    const jwt=isLogged();
    React.useEffect(()=>{
      if(userError && userError!==null){
         setError(userError);
      }
      dispatch(getAllUsers(jwt &&  jwt.token));
   },[dispatch,jwt,userError]);
   function showError(){
    return error && <div className="alert alert-danger">{error}</div>
  }
  if(!jwt){
    return <div className="container">
      <div className="row my-5">
        <div className="col-md-8 mx-auto">
           <div className="alert alert-info">
            <Link to={'/login'}>Connectez vous pour voir les profiles!</Link>
           </div>
        </div>
      </div>
    </div>
  }
  return (
    <div className='container'>
      <div className="row my-5">
        <div className="col-md-8 mx-auto">
          {showError()}
            <div className="card p-2">
                  <div className="card-header bg-white">
                        <h3 className="card-title">
                            Profiles
                        </h3>
                  </div>
                  <div className="card-body">
                    <ul className="list-group">
                           {
                            users && users.map((user,index)=>(
                          <Link  to={`/user/${user._id}`} style={{textDecoration:'none'}} key={user._id}>
                           <li className="list-group-item d-flex flex-row justify-content-center aligns-items-center" >
                           <div className="list-group-item d-flex flex-row justify-content-between  aligns-items-center">
                         <img src={`http://localhost/api/user/photo/${user._id}`} alt={user && user.name}  width={50} height={50} className='img-fluid rounded pr-2'/>
                           <h4 className='mt-3'>{user.name}</h4>
                           </div>
                           </li>
                           </Link>
                            ))
                           }{" "}
                    </ul>
                  </div>
                              </div>
        </div>
      </div>
    </div>
  )
}

const mapStateProps=({user:{users,userError}})=>({
   users,
   userError,
 });
 export default connect(mapStateProps,null)(Users); 