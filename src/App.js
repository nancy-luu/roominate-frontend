import React, { useEffect, useState, useLayoutEffect } from "react";
import Landing from "./components/Landing/Landing";
import Home from './components/Home/Home';
import "./app.scss"
const API = 'http://localhost:3000'


export default function App() {
  const [currUser, setCurrUser] = useState({username:"", email:"" , Listings:[]});
  const [userList, setUserList] = useState([])
  const [listings, setListings] = useState([])
  const [isLoading, setIsLoading] = useState(false);
  const [loadingRequest, setLoadingRequest] = useState(0)
  const token = localStorage.getItem("token");

  const categoryList = [ 
    { value: "Furniture", label: "Furniture" }, 
    { value: "Design", label: "Design" },
    { value: "Build", label: "Build" }, 
    { value: "Plumbing", label: "Plumbing" },
    { value: "Electrical", label: "Electrical" },
    { value: "Other", label: "Other" }
  ]

const userType = [ 
    { value: "Home Owner", label: "Home Owner" }, 
    { value: "Designer", label: "Designer" },
    { value: "Builder", label: "Builder" }, 
    { value: "Plumber", label: "Plumber" },
    { value: "Electrician", label: "Electrician" },
    { value: "Other", label: "Other" }
  ]

const locationList = [ 
    { value: "San Francisco", label: "San Francisco" }, 
    { value: "Los Angeles", label: "Los Angeles" }, 
    { value: "Seattle", label: "Seattle" },
    { value: "New York", label: "New York" }, 
    { value: "Boston", label: "Boston" }, 
    { value: "Chicago", label: "Chicago" }
  ]

  useEffect(() => {
    setIsLoading(true)
    fetch(`${API}/listings`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      }, })
    .then((r) => { 
      if (r.ok){
        r.json().then((listings) => setListings(listings));
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
      }).then(resp => resp.json())
      .then(user => {
        setCurrUser(user);
        setIsLoading(false)
      });
    } else { // user never logged in
      setIsLoading(false);
    }
  }, [loadingRequest]);

  useEffect(() => {
    setIsLoading(true);
    if (token) {
        fetch(`${API}/users`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then(resp => resp.json())
        .then((userList) => {
                setUserList(userList);  
                setIsLoading(false);
        });   
    }
  }, [loadingRequest])

  if (currUser.username === "") return (
    <div className="App">
      <Landing 
        onLogin={setCurrUser}
        setCurrUser={setCurrUser} 
        setLoadingRequest={setLoadingRequest}
        loadingRequest={loadingRequest}
        categoryList={categoryList}
        userType={userType}
        locationList={locationList}
      />
    </div>
  )
  
  return (
    <div className="app">
      <Home
        token={token} 
        onLogin={setCurrUser}
        user={currUser} 
        currUser={currUser}
        setCurrUser={setCurrUser}
        setUser={setCurrUser}
        listings={listings} 
        setListings={setListings}
        userList={userList} 
        setUserList={setUserList}
        isLoading={isLoading} 
        setIsLoading={setIsLoading}
        loadingRequest={loadingRequest} 
        setLoadingRequest={setLoadingRequest}
        categoryList={categoryList}
        userType={userType}
        locationList={locationList}
      />
    </div>
  )
}