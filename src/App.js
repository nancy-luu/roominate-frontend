import React, { useEffect, useState, useLayoutEffect } from "react";
import Landing from "./components/Landing/Landing";
import Home from './components/Home/Home';
import "./app.scss"
const API = 'http://localhost:3000'

// utils.js
const useBeforeRender = (callback, deps) => {
  const [isRun, setIsRun] = useState(false);

  if (!isRun) {
      callback();
      setIsRun(true);
  }

  useEffect(() => () => setIsRun(false), deps);
};

export default function App() {
  const [user, setUser] = useState({username:"", email:"" , Listings:[]});
  const [currUser, setCurrUser] = useState({username:"", email:"" , Listings:[]});
  const [userList, setUserList] = useState([])
  const [listing, setListing] = useState([])
  const [isLoading, setIsLoading] = useState(false);
  const [loadingRequest, setLoadingRequest] = useState(0)
  const token = localStorage.getItem("token");

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
        console.log(token)
        fetch(`${API}/users`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((r) => {
          if (r.ok){
            r.json()
              .then((userList) => {
                setUserList(userList);
                
                let newCurrentUser = userList.filter((n) => {
                  if (n.id == data.user.id) {
                      return true
                  }
                  
                })
                let blah = {
                   ...data.user,
                   ...newCurrentUser[0]
                } 
                setCurrUser(blah)
                console.log(currUser)
                //  console.log(newCurrentUser[0])
                //  console.log(data.user)
                
              
                setIsLoading(false);

              })      
            console.log(user)
          }
        })
        setUser(data.user)
        
        console.log(data)
      })
    } else { // user never logged in
      setIsLoading(false);
    }
  }, [loadingRequest]);
  // console.log(JSON.stringify(user))
  // console.log(user.username)


  // useEffect(() => {
  //   console.log(token)
  //   setIsLoading(true)
  //   fetch(`${API}/users`, {
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${token}`,
  //     },
  //   })
  //   .then((r) => {
  //     if (r.ok){
  //       r.json().then((userList) => setUserList(userList));

  //       // let newCurrentUser = userList.filter((n) => {
  //       //     if (n.id == user.id) {
  //       //         return true
  //       //     }
  //       // })
  //       // console.log(userList)
  
  //       // setCurrUser({
  //       //     ...user,
  //       //     ...newCurrentUser[0]
  //       // })
  //       // console.log(user)
  //     // console.log(profileUser)
  //       setIsLoading(false)
  //     }
  //   })
  // }, [loadingRequest])
  // console.log(userList)

  

  if (user.username === "") return (
    <div className="App">
      <Landing 
        onLogin={setUser}
        setCurrUser={setCurrUser} 
        setLoadingRequest={setLoadingRequest}
        loadingRequest={loadingRequest}
      />
    </div>
  )
  
  return (
    <div className="app">
      <Home
        token={token} 
        onLogin={setUser}
        user={user} 
        currUser={currUser}
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