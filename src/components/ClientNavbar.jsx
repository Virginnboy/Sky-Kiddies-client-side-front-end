import { FaShoppingCart, FaQuestionCircle, FaUserCircle} from "react-icons/fa";
import "../components/Navbar.css"
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { searchProducts } from "../store/util";

const ClientNavbar = ({ search, setSearch }) => {

  const { data, isFetching, refetch} = useQuery({
    queryKey: ["searchedProducts", search],
    queryFn: () => searchProducts(search),
    enabled: true,
  })
  
  console.log(data)



  return (
    <div className="navbar">
      <h1>Sky Kiddies</h1>

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
        <button onClick={()=> refetch()}>{isFetching ? "Searching..." : "Search"}</button>
      </div>
      <ul>
        <Link><FaUserCircle/> <span>Account</span></Link>
        <Link><FaQuestionCircle/><span>Help</span></Link>
        <Link><FaShoppingCart/><span>Cart</span></Link>
      </ul>
    </div>
  )
}

export default ClientNavbar