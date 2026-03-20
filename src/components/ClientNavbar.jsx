import { FaShoppingCart, FaQuestionCircle, FaUserCircle, FaChevronDown, FaHome} from "react-icons/fa";
import "../components/ClientNavbar.css"
import { Link } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchCart } from "../store/util";
import { useState, useEffect, useRef } from "react"
import { logOut } from "../store/auth";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";


const ClientNavbar = ({ search, setSearch }) => {
  const [ showDropDown, setShowDropDown ] = useState(false);
  const [showHelp, setShowHelp] = useState(false);

  const dropdownRef = useRef(null);
  
  const user = JSON.parse(localStorage.getItem("userData"));
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
  });

  useEffect(()=> {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropDown(false);
        setShowHelp(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return ()=> document.removeEventListener("click", handleClickOutside);
  }, []);


  const handleLogout = async () => {
    await logOut();
    queryClient.removeQueries(['cart'])
    localStorage.removeItem("userToken")
    localStorage.removeItem("userData")
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
            <Link id="home" to={`${user ? "/dashboard" : "/"}`}><FaHome size={20} title="Home"/><span className="fa-home">Home</span></Link>
          </li>
          <li>
            <div className="account-dropdown" onClick={(e)=>{
              e.stopPropagation();
              setShowDropDown(prev=> !prev)
              setShowHelp(false);
            }}
            ref={dropdownRef}
            >
              { user ? (<p id="user-name">{`Hi, ${user.firstName}`}</p>) : (<div id="user"><FaUserCircle id="fa-user" title="Profile"/><span>Profile</span></div>) }
              <FaChevronDown/>
            </div>

            {showDropDown && (
              <div className="dropdown-menu">
                {user ? (
                  <div>
                    <button onClick={handleLogout}>Logout</button>
                    <Link className="order-link" to="/dashboard/orders">Orders</Link>
                  </div>
                ) : (
                  <div>
                    <Link to="/signup">Signup</Link>
                <Link to="/login">Login</Link>
                </div>
                )}
              </div>
            )}
          </li>

          <div id="help"  
          onClick={(e)=>{
            e.stopPropagation();
            setShowHelp(!showHelp)
            setShowDropDown(false)
          }}
          ref={dropdownRef}
          >
            <FaQuestionCircle size={20} title="Help"/><span className="fa-help"> Help</span>
            {showHelp && (<div className="agent-container">
              <Link to="/dashboard/help">Live Chat</Link>
            </div>)}
          </div>

          <Link id="shoppingcart" to="/dashboard/cart" className="cart-icon">
            <FaShoppingCart size={20} title="Cart"/>
            {cartLenth > 0 && <span className="cart-badge">{cartLenth}</span>}
          </Link>
        </ul>
      </div>
    </div>
  )
}

export default ClientNavbar