import React, { useEffect, useState } from "react";
import Landing from "./components/Landing/Landing";
import Home from './components/Home/Home';
import "./app.scss"
const API = 'http://localhost:3000'

export default function App() {
  const [user, setUser] = useState({username:"", email:"" , Listings:[]});
  // const [userList, setUserList] = useState([])
  const [listing, setListing] = useState(null)
  const [isLoading, setIsLoading] = useState(false);
  const [loadingRequest, setLoadingRequest] = useState(0)


  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoading(true);

    if (token) {
      fetch(`${API}/auto_login`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(resp => resp.json())
      .then(data => {
        setUser(data)
        // console.log(data)
      })
      setIsLoading(false);
    } else { // user never logged in
      setIsLoading(false);
    }
  }, []);

  
  // useEffect(() => {
  //   fetch("/users").then((r) => {
  //     if (r.ok) {
  //       r.json().then((userList) => setUserList(userList));
  //     }
  //   });
  // }, [loadingRequest]);


  useEffect(() => {
    setIsLoading(true)
    fetch(`${API}/listings`,).then((r) => {
      if (r.ok) {
        r.json().then((listing) => setListing(listing));
        setIsLoading(false)
        console.log("Listings Fetched!")
      }
    });
    console.log(listing)
  }, []);


  if (user.username === "") return (
    <div className="App">
      <Landing onLogin={setUser} loadingRequest={loadingRequest} setLoadingRequest={setLoadingRequest}/>
    </div>
  )
  
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