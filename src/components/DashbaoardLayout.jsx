import { useSearchParams, Outlet } from "react-router-dom";
import toast from "react-hot-toast";
import { useEffect } from "react";
import "../components/DashboardLayout.css"

const DashboardLayout = () => {
  const [ searchparams, setSearchParams ] = useSearchParams();
  const isSuccess = searchparams.get("login")=== "success";


  useEffect (()=> {
    if (isSuccess) {
      toast.success("Login Successfully 🎉");
      searchparams.delete("login");
      setSearchParams(searchparams, {replace: true});
    }
  }, [])
  return (
    <div className="dashboard-layout-container">
      <Outlet/>
    </div>
  )
}

export default DashboardLayout;