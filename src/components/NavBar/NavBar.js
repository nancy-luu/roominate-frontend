import { Link } from 'react-router-dom';

import "./navbar.scss"

export default function NavBar( {setUser} ) {

  function handleLogoutClick() {
    console.log("LOGOUT!")
    // fetch("/logout", { method: "DELETE" }).then((r) => {
    //   if (r.ok) {
    //     setUser({username:"", email:"" , vacations:[]});
    //   }
    // });
  }

  return (
    <nav className="navBar">
        <div className="wrapper">
              <div className="left">
                <Link className="logo" to="/about" ><img src="images/RoomLogo.png"/></Link> 
              </div>
              <div className="right">
                <Link className="navlink" to="/" ><span>listings</span></Link> 
                <Link className="navlink" to="/hire" ><span>hire</span></Link> 
                <Link className="navlink" to="/profile"><span>profile</span></Link>
                <Link className="navlink" to="/inbox" ><span>inbox</span></Link> 
                <div className="navlink" onClick={handleLogoutClick}>logout</div>
              </div>
        </div>
    </nav>
  );
}