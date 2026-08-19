import { useRouteError } from "react-router-dom";
import ErrorContent from "../components/ErrorContent";
import { Children } from "react";

const ErrorPage = () => {
  const error = useRouteError();

  let title = "An Error Occured!";
  let message = "Something went wrong";

  if (error?.status === 400) {
    title = "Bad Request";
    message = error?.response?.data?.message  || "Bad Request";
  }

  if (error?.status === 401) {
    title = "Authentication error";
    message = error?.response?.data?.message  || "Unauthorized";
  }
  
  if (error?.status === 404) {
    title = "Not found!"
    message =error?.response?.data?.message || "Could not found resource or page"
  }

  if (error?.status === 500) {
    title = "Server Error"
    message= error?.response?.data?.message || "Internal Server Error";
  }
  
  return <ErrorContent title={title}>
    <p>{Children}</p>
  </ErrorContent>
}

export default ErrorPage;