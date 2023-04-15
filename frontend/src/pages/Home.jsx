import React from 'react'
import {useDispatch,connect} from 'react-redux';
import {Link, useNavigate} from 'react-router-dom';
import {isLogged} from '../helpers/auth';
import { getAllPosts } from '../redux/actions/postActions';
import {PostList} from '../components/PostList';
import AddPost from '../components/AddPost';

function Home({posts}) {
  const navigate = useNavigate();
  const jwt=isLogged();
  const dispatch=useDispatch();
  
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    if (user) navigate("/chats");
  }, [navigate]);

  React.useEffect({
    if(jwt){
      function loadPosts(){
        dispatch(getAllPosts(jwt.token,jwt.user._id));
      }
      loadPosts();
    }
  },[]);
  if(!jwt){
    return <div className="container">
      <div className="row my-5">
        <div className="col-md-8 mx-auto">
           <div className="alert alert-info">
            <Link to={'/login'}>Connectez vous pour voir les tweets!</Link>
           </div>
        </div>
      </div>
    </div>
  }
  return (
    <div className='container'>
        <AddPost />
        <PostList posts={posts && posts}/>
    </div>
  )
}

const mapStateProps=({post:{posts}})=>({
      posts,
});
export default connect(mapStateProps,null)(Home); 