import { Link } from 'react-router-dom';

import "./navbar.scss"

export default function NavBar( {setUser} ) {

  function handleLogoutClick() {
    localStorage.removeItem("token");
    setUser({username:"", email:"" , Listings: []});
  }

  return (
    <nav className="navBar">
        <div className="wrapper">
              <div className="left">
                <Link className="logo" to="/about" ><img src="images/RoomLogo.png" style={{ width: '3.5rem', height: '3rem' }}
                /></Link> 
              </div>
              <div className="right">
                <Link className="navlink" to="/community" ><span>community</span></Link> 
                <Link className="navlink" to="/listings" ><span>listings</span></Link> 
                <Link className="navlink" to="/roominators" ><span>roominators</span></Link> 
                <Link className="navlink" to="/profile"><span>profile</span></Link>
                <Link className="navlink" to="/inbox" ><span>inbox</span></Link> 
                <div className="navlink" onClick={handleLogoutClick}>logout</div>
              </div>
        </div>
    </nav>
  );
}