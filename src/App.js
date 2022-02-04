import React, { useEffect, useState } from "react";
import Landing from "./components/Landing/Landing";
import Home from './components/Home/Home';
import "./app.scss"

export default function App() {
  const [user, setUser] = useState({username:"", email:"" , vacations:[]})
  // const [userList, setUserList] = useState([])
  const [isLoading, setIsLoading] = useState(false);
  const [loadingRequest, setLoadingRequest] = useState(0)


  // useEffect(() => {
  //   // auto-login
  //   setIsLoading(true)
  //   fetch("/me").then((r) => {
  //     if (r.ok) {
  //       r.json().then((user) => setUser(user));
  //       setIsLoading(false)
  //     } else {
  //       setIsLoading(false)
  //     }
  //   });
  // }, [loadingRequest]);

  
  // useEffect(() => {
  //   fetch("/users").then((r) => {
  //     if (r.ok) {
  //       r.json().then((userList) => setUserList(userList));
  //     }
  //   });
  // }, [loadingRequest]);


  // if (!user.username && !isLoading) return (
  //   <div className="App">
  //     <Landing onLogin={setUser} loadingRequest={loadingRequest} setLoadingRequest={setLoadingRequest}/>
  //   </div>
  // )
  
  return (
    <div className="app">
      <Home 
        setUser={setUser} 
        user={user} 
        // userList={userList}
        // setUserList={setUserList}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        loadingRequest={loadingRequest}
        setLoadingRequest={setLoadingRequest}
        onLogin={setUser}
      />
      {/* <Landing onLogin={setUser} loadingRequest={loadingRequest} setLoadingRequest={setLoadingRequest}/> */}
    </div>
  )

}