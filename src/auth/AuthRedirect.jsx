import { useQuery } from "@tanstack/react-query"
import { getUser } from "../store/auth"
import { Navigate } from "react-router-dom";
import HomePage from "../pages/HomePage";
import Loading from "../components/Loading";

const AuthRedirect = () => {
  const {data:user, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
    retry: false
  });

  console.log(user)

  if (isLoading) {
    return <Loading/>
  }

  if (user) {
    return <Navigate to="/dashboard" replace/>
  }

  return <HomePage/>
}

export default AuthRedirect