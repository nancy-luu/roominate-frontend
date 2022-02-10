import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from "../NavBar/NavBar";
import Landing from "../Landing/Landing";
import About from "../About/About";
import Listings from "../Listings/Listings"; 
import Roominators from "../Roominators/Roominators"; 
import Profile from "../Profile/Profile"; 
import Inbox from "../Inbox/Inbox"; 
import Footer from "../Footer/Footer"; 


import "./home.scss"
 

export default function Home ( { 
    onLogin, 
    user, setUser, 
    userList, setUserList,
    listing, setListing,
    loadingRequest, setLoadingRequest,
    isLoading, setIsLoading,
    token, currUser
}){

    console.log(currUser)    
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

    return (
        <Router>
            <div className="container">
                <NavBar setUser={setUser}/>
                <div className="content">
                    <Routes>
                        <Route exact path="/" element={
                            user ? 
                            <Listings
                                token={token}
                                user={user} 
                                setUser={setUser}
                                isLoading={isLoading} 
                                setIsLoading={setIsLoading} 
                                listing={listing} 
                                setListing={setListing}
                                categoryList={categoryList} 
                                locationList={locationList}
                            /> 
                            : 
                            <Landing 
                                user={user} 
                                onLogin={onLogin} 
                                loadingRequest={loadingRequest} 
                                setLoadingRequest={setLoadingRequest} 
                                isLoading={isLoading} 
                                setIsLoading={setIsLoading}
                            />
                        } />
                         <Route exact path="/about" element={
                            <About />
                        } />
                        <Route exact path="/roominators" element={
                            <Roominators 
                                token={token}
                                user={user} 
                                setUser={setUser}
                                userList={userList} 
                                setUserList={setUserList}
                                isLoading={isLoading} 
                                setIsLoading={setIsLoading}
                                userType={userType}
                                locationList={locationList}
                                isLoading={isLoading} 
                                setIsLoading={setIsLoading}
                            />
                        } />
                        <Route exact path="/profile" element={
                            <Profile 
                                currUser={currUser}
                                user={user} 
                                setUser={setUser} 
                                userList={userList}
                                isLoading={isLoading}
                                setIsLoading={setIsLoading} 
                                categoryList={categoryList} 
                                locationList={locationList}
                            /> 
                        } />
                        <Route exact path="/inbox" element={
                            <Inbox 
                                user={user} 
                                setUser={setUser} 
                                currUser={currUser}
                            /> 
                        } />
                    </Routes>
                </div>
                <Footer />
            </div>
        </Router>

    )

}