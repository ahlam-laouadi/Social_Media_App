import React from 'react'
import {Link, useNavigate} from 'react-router-dom';
import { logout } from '../helpers/auth';
export default function Navbar({currentUser}) {
  const navigate=useNavigate();
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <div className="container-fluid">
      <Link className="navbar-brand" to="/">Social Media App</Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <Link className="nav-link active" aria-current="page" to="/home">Home</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/users">Users</Link>
          </li>
          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Compte
            </a>
            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
              {
                !currentUser ?
                <>
                <li><Link className="dropdown-item" to="/register">Inscription</Link></li>
                <li><Link className="dropdown-item" to="/login">Connexion</Link></li>
                </>
                :
              <>
              <li><Link className="dropdown-item" to={`/user/${currentUser && currentUser.user._id}`}>{ currentUser && currentUser.user.name}</Link></li>
              <li><Link className="dropdown-item" to="" onClick={()=>{
                logout(()=>{
                navigate('/login')
                })
              }}>Deconnection</Link></li>
              </>
              }
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  )
}
