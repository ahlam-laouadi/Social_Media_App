import React from 'react'
import {useDispatch} from 'react-redux';
import {isLogged} from '../helpers/auth';
import {Post} from "../components/Post";
export default function PostList({posts}) {
    const [data,setData]=React.useState([]);
    const jwt=isLogged();
    const dispatch=useDispatch();
    React.useEffect(()=>{
        setData(posts);
    },[posts]);

  return (
    <div className='row my-5'>
    <div className="col-md-8 mx-auto">
        {data && data.map((item,i)=>{
            return <Post post={item} key={item._id}/>
        })}
    </div>
    </div>
  )
}
