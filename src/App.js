import React, { useEffect, useState } from "react";
import Landing from "./components/Landing/Landing";
import Home from './components/Home/Home';
import "./app.scss"
const API = 'http://localhost:3000'

export default function App() {
  const [user, setUser] = useState({username:"", email:"" , Listings:[]});
  const [userList, setUserList] = useState([])
  const [listing, setListing] = useState([])
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
        setUser(data.user)
        // console.log(data)
      })
      setIsLoading(false);
    } else { // user never logged in
      setIsLoading(false);
    }
  }, []);
  // console.log(JSON.stringify(user))
  // console.log(user.username)


  useEffect(() => {
    console.log(token)
    setIsLoading(true)
    fetch(`${API}/users`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    .then((r) => {
      if (r.ok){
        r.json().then((userList) => setUserList(userList));
        setIsLoading(false)
      }
    })
  }, [loadingRequest])
  // console.log(userList)



  useEffect(() => {
    setIsLoading(true)
    fetch(`${API}/listings`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      }, })
    .then((r) => {
      if (r.ok){
        r.json().then((listing) => setListing(listing));
        setIsLoading(false)
      }
    })
  }, [loadingRequest])



  if (user.username === "") return (
    <div className="App">
      <Landing 
        onLogin={setUser} 
        loadingRequest={loadingRequest}
        setLoadingRequest={setLoadingRequest}
      />
    </div>
  )
  
  return (
    <div className="app">
      <Home
        token={token} 
        onLogin={setUser}
        user={user} 
        setUser={setUser}
        listing={listing} 
        setListing={setListing}
        userList={userList} 
        setUserList={setUserList}
        isLoading={isLoading} 
        setIsLoading={setIsLoading}
        loadingRequest={loadingRequest} 
        setLoadingRequest={setLoadingRequest}
      />
    </div>
  )
}