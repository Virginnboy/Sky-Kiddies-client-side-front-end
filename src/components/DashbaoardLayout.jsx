import { useSearchParams, Outlet } from "react-router-dom";
import toast from "react-hot-toast";
import { useEffect } from "react";
import "../components/DashboardLayout.css"
import { useOutletContext } from "react-router-dom";

const DashboardLayout = () => {
  const [ searchparams, setSearchParams ] = useSearchParams();
  const isSuccess = searchparams.get("login")=== "success";

  const  { products, isLoading, isQueryError, queryError} = useOutletContext();

  useEffect (()=> {
    if (isSuccess) {
      toast.success("Login Successfully 🎉");
      searchparams.delete("login");
      setSearchParams(searchparams, {replace: true});
    }
  }, [])
  return (
    <div className="dashboard-layout-container">
      <Outlet
      context={{products, isLoading, isQueryError, queryError}}
      />
    </div>
  )
}

export default DashboardLayout;