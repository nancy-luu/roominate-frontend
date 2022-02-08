import React, { useEffect, useState } from "react";
import Landing from "./components/Landing/Landing";
import Home from './components/Home/Home';
import "./app.scss"
const API = 'http://localhost:3000'

export default function App() {
  const [user, setUser] = useState({username:"", email:"" , Listings:[]});
  const [userList, setUserList] = useState([])
  const [listings, setListings] = useState([])
  const [isLoading, setIsLoading] = useState(false);
  const [loadingRequest, setLoadingRequest] = useState(0)
  const token = localStorage.getItem("token");


  useEffect(() => {
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


  useEffect(() => {
    setIsLoading(true)
    fetch(`${API}/users`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    .then((r) => {
      if (r.ok){
        console.log("users fetched!")
        r.json().then((userList) => setUserList(userList));
        setIsLoading(false)
      }
    })
  }, [loadingRequest])



  useEffect(() => {
    setIsLoading(true)
    fetch(`${API}/listings`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      }, })
    .then((r) => {
      if (r.ok){
        console.log("listings fetched!")
        r.json().then((listings) => setListings(listings));
        setIsLoading(false)
      }
    })
  }, [loadingRequest])



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