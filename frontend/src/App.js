import { BrowserRouter ,Route,Routes} from "react-router-dom";
import React from "react";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { useDispatch,connect } from "react-redux";
import { authCheck } from "./redux/actions/userActions";
import Users from "./pages/Users";
import Profile from "./pages/Profile";
import Room from "./pages/Room";
import { io } from "socket.io-client";
import Header from "./components/Header";
import { Outlet } from "react-router-dom";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

function App({currentUser}) {
  const [socket, setSocket] = useState(null);
  const [userId, setUserId] = useState(null);
  const dispatch=useDispatch();

  useEffect(() => {
    setSocket(io("http://localhost:8080"));
    const _userId = Cookies.getItem("userId");
    if (_userId) setUserId(_userId);
  }, []);

  React.useEffect(()=>{
   dispatch(authCheck());
  },[dispatch]);
  return (
    <div>
    <Container>
      <Header socket={socket} userId={userId} setUserId={setUserId} />
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Outlet context={{ socket, userId }} />
      </Box>
    </Container>
    <BrowserRouter>
    <Navbar currentUser={currentUser}/>
  <Routes>
    <Route path="/" exact element={<Home/>}/>
    <Route path="/register" exact element={<Register/>}/>
    <Route path="/login" exact element={<Login/>}/>
    <Route path="/users" exact element={<Users/>}/>
    <Route path="/user/:userId" exact  element={<Profile/>}/>
    <Route path="/user/edit/:userId" exact  element={<EditProfile/>}/>
    <Route path="/room/:roomId" exact  element={<Room/>}/>
  </Routes>
  </BrowserRouter>
  </div>
  );
}

const mapStateProps=({user:{currentUser}})=>({
  currentUser
});
export default connect(mapStateProps)(App); 
