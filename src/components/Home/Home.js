import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from "../NavBar/NavBar";
import Landing from "../Landing/Landing";
import About from "../About/About";
import Community from "../Community/Community";
import Listings from "../Listings/Listings"; 
import Roominators from "../Roominators/Roominators"; 
import Profile from "../Profile/Profile"; 
import Inbox from "../Inbox/Inbox"; 
import Footer from "../Footer/Footer"; 
import ScrollToTop from '../ScrollToTop';


import "./home.scss"
 

export default function Home ( { 
    onLogin, 
    user, setUser, 
    userList, setUserList,
    listings, setListings,
    loadingRequest, setLoadingRequest,
    isLoading, setIsLoading,
    token, currUser,
    categoryList, userType,locationList
}){


    return (
        <Router>
            <ScrollToTop />
            <div className="content white-background">
            <div className="page-container">
                <div className="content-wrap">
                    <NavBar setUser={setUser}/>
                    <div className="content">
                        <Routes>
                            <Route exact path="/community" element={ <Community/> }/>
                            <Route exact path="/listings" element={
                                user ? 
                                <Listings
                                    userList={userList}
                                    currUser={currUser}
                                    token={token}
                                    user={user} 
                                    setUser={setUser}
                                    isLoading={isLoading} 
                                    setIsLoading={setIsLoading} 
                                    listings={listings} 
                                    setListings={setListings}
                                    categoryList={categoryList} 
                                    locationList={locationList}
                                    loadingRequest={loadingRequest}
                                    setLoadingRequest={setLoadingRequest}
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
                            <Route exact path="/" element={
                                <About currUser={currUser}/>
                            } />
                            <Route exact path="/roominators" element={
                                <Roominators 
                                    token={token}
                                    user={user} 
                                    currUser={currUser}
                                    setUser={setUser}
                                    userList={userList} 
                                    setUserList={setUserList}
                                    isLoading={isLoading} 
                                    setIsLoading={setIsLoading}
                                    userType={userType}
                                    locationList={locationList}
                                    loadingRequest={loadingRequest}
                                    setLoadingRequest={setLoadingRequest}
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
                                    token={token}
                                    loadingRequest={loadingRequest} 
                                    setLoadingRequest={setLoadingRequest} 
                                    listings={listings}
                                    userType={userType}
                                /> 
                            } />
                            <Route exact path="/inbox" element={
                                <Inbox 
                                    user={user} 
                                    userList={userList}
                                    currUser={currUser}
                                    sLoading={isLoading}
                                    setIsLoading={setIsLoading}
                                    loadingRequest={loadingRequest}
                                    setLoadingRequest={setLoadingRequest}
                                /> 
                            } />
                        </Routes>
                    </div>
                </div>
                <Footer />
            </div>
            </div>
        </Router>

    )

}