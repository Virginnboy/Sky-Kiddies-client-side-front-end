import { Navigate } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { getUser } from "../store/auth"
import Loading from "../components/Loading"

export default function ProtectedRoutes({children}) {
  const { data: user, isLoading, isError, error } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
    retry: false
  })

  if (isLoading) {
    return <Loading/>
  }

  if (isError) {
    return <p>{error?.response?.data.message || error?.message || "Something went wrong"}</p>
  }

  if (!user) {
    return <Navigate to="/login" replace/>;
  }

  return children;
}