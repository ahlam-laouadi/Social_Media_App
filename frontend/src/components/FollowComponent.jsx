import React from 'react'
import { useNavigate } from 'react-router'

export default function FollowComponent({data}) {
    const navigate=useNavigate();
  return (
 <div className="row my-4">
    <div className="col-md-8 mx-auto">
        <div className="row">

            {
               data && data.length>0 ?
                 data && data.map((user)=>(
                    <div className="col-md-3" key={user._id}
                    onClick={()=>navigate(`/user/${user._id}`)}
                    >
                    <img src={`http://localhost/api/user/photo/${user._id}`} 
                    alt={user.name}  width={50} height={50} 
                    className='img-fluid rounded pr-2'/>
                     <h4 className='mt-3'>{user.name}</h4>
                    </div>
                ))
                :
                <div className="alert alert-info">
                <h4 className="alert-heading">Aucun donnee</h4>
                </div>
            }
        </div>
    </div>
 </div>
  )
}
