import React, { useState , useEffect } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/login";
import MyProfile from "./pages/profile";
import MyHome from "./pages/home";
import ProtectedRoute from "./components/protectedRoute";
import MySubgreddit from "./pages/subgreddit";
import CreateSubForm from "./pages/createsub";
import AllSub from "./pages/allsub";
import MySubPage from "./pages/mysubpage";
import SubUser from "./pages/subusers";
import SubRequests from "./pages/subrequests";
import SubPage from "./pages/subpostspage";
import SavedPosts from "./pages/savedposts";


//login page


function MyOldApp() {

  const user = {}
const followingList = []
const followerList = []
const [userdata , setUserdata] = useState({})



  
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  
 
  
  return (
   <div>
      
              <div>
      <BrowserRouter>
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route exact path="/" element={<MyHome />}></Route>
            <Route
              exact
              path="/profile"
              element={
                <MyProfile
                  user={user}
                  followers={followerList}
                  following={followingList}
                />
              }
            ></Route>
            <Route exact path="/mysubgreddits" element = { <MySubgreddit></MySubgreddit>}>
              
            
            </Route>
            
            <Route exact path="/createsub" element={<CreateSubForm user = {userdata }/>}></Route>
            <Route exact path="/allsubs" element={<AllSub/>}></Route>
            <Route exact path="/allsubs/search" element = {<AllSub search = {true}/>}></Route>
            <Route exact path="/mysubgreddits/:username" element={<MySubPage/>}></Route>
            <Route exact path="/mysubgreddits/:username/users" element={<SubUser/>}></Route>
            <Route exact path="/mysubgreddits/:username/requests" element={<SubRequests/>}></Route> 
            <Route exact path="/allsubs/:username" element={<SubPage/>}></Route>    
            <Route exact path='/savedposts' element={<SavedPosts/>}   />    

          </Route>
          <Route exact path="login" element={<LoginPage />}></Route>
        </Routes>
      </BrowserRouter>
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<MyOldApp />);
