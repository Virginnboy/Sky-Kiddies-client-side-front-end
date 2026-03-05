import { FaShoppingCart, FaQuestionCircle, FaUserCircle, FaChevronDown, FaHome} from "react-icons/fa";
import "../components/ClientNavbar.css"
import { Link } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchCart } from "../store/util";
import { useState } from "react"
import { logOut } from "../store/auth";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const ClientNavbar = ({ search, setSearch }) => {
  const [ showDropDown, setShowDropDown ] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();

  useEffect(()=> {
    setShowDropDown(false);
  },[location])

  const { data:carts } = useQuery({
    queryKey: ['cart'],
    queryFn: fetchCart,
    enabled: !!user,
    retry: 1
  })


  const handleLogout = async () => {
    await logOut();
    queryClient.removeQueries(['cart'])
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    setShowDropDown(false)
    navigate("/login")
  }

  let cartLenth = 0;

  if ( carts?.items?.length > 0) {
    cartLenth = carts.items.reduce((total, items)=>{
      return total + items.quantity
    }, 0)
  }


  return (
    <div className="navbar">
      <div className="sky-navbar">
        <h2 id="sky-kiddies">Sky Kiddies</h2>
      </div>

      <div className="search-bar">
        <input 
          type="text"
          name="search"
          id="search"
          value={search}
          className="search-input"
          placeholder="Search Products"
          onChange={(e)=>setSearch(e.target.value)}
          />
      </div>

      <div className="navbar-list-container">
        <ul className="navbar-list">
          <li>
            <Link id="home" to={`${user ? "/dashboard" : "/"}`}><FaHome id="fa-home"/><span>Home</span></Link>
          </li>
          <li>
            <div className="account-dropdown" onClick={()=>setShowDropDown(prev=> !prev)}>
              { user ? (<p id="user-name">{`Hi, ${user.firstName}`}</p>) : (<div id="user"><FaUserCircle id="fa-user"/><span>Profile</span></div>) }
              <FaChevronDown/>
            </div>

            {showDropDown && (
              <div className="dropdown-menu">
                {user ? (
                  <button onClick={handleLogout}>Logout</button>) : (
                  <div>
                    <Link to="/signup">Signup</Link>
                <Link to="/login">Login</Link>
                </div>
                )}
              </div>
            )}
          </li>

          <Link id="help"><FaQuestionCircle id="fa-help"/><span>Help</span></Link>

          <Link id="shoppingcart" to="/dashboard/cart">
            <FaShoppingCart id="fa-shoppingcart"/>
            <span>Cart({cartLenth})</span>
          </Link>
        </ul>
      </div>
    </div>
  )
}

export default ClientNavbar