import { useQuery } from "@tanstack/react-query"
import { getUser } from "./auth"
import { Navigate } from "react-router-dom";
import Loading from "../components/Loading";
import LandingPage from "../pages/LandingPage";

const AuthRedirect = () => {
  const {data:user, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
    retry: false
  });

  console.log(user);

  if (isLoading) {
    return <LandingPage/>
  }

  if (user) {
    
    return <Navigate to="/dashboard" replace/>
  }

  return <LandingPage/>
}

export default AuthRedirect