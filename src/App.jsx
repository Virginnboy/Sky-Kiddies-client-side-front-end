import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import ClientRootLayout from "./components/ClientRootLayout";
import Signup, {action as signupAction } from "./auth/Signup";
import ErrorPage from "./components/ErrorPage";
import Login, {action as loginAction} from "./auth/Login";
import ForgotPassword from "./auth/ForgotPassword";
import ResetPassword from "./auth/ResetPassword";
import Products from "./components/Products";
import DashboardLayout from "./components/DashbaoardLayout";
import CartPage from "./pages/CartPage";
import ProtectedRoutes from "./auth/ProtectedRoute";
import Checkout from "./pages/Checkout";
import AuthRedirect from "./auth/AuthRedirect";
import ProductDetails, {loader as productDetailsLoader } from "./components/ProductDetails";
import Orders from "./pages/Orders";

function App() {
  const queryClient = new QueryClient();

  const routes = createBrowserRouter([
    {path: "/", 
      element: <ClientRootLayout/>, 
      errorElement: <ErrorPage/>,
      children: [
      {index: true, element: <AuthRedirect/>},
      {path: "/product-details/:productId", element: <ProductDetails/>, loader:productDetailsLoader},
      {path: "signup", element: <Signup/>, action: signupAction},
      {path: "login", element: <Login/>, action: loginAction},
      {path: "forgot-password", element: <ForgotPassword/>},
      {path: "reset-password/:token", element: <ResetPassword/>},
      {path: "dashboard", element: <ProtectedRoutes>
        <DashboardLayout/>
      </ProtectedRoutes>, children: [
        {index: true, element: <Products/>},
        {path: "product-details/:productId", element: <ProductDetails/>, loader: productDetailsLoader},
        {path: "cart", element: <CartPage/>},
        {path: "checkout", element: <Checkout/> },
        {path: "orders", element: <Orders/>}
      ]},
    ]}
  ]);

  return (
    <QueryClientProvider client={queryClient}>
      <Toaster position="top-right"/>
      <RouterProvider router={routes}/>
    </QueryClientProvider>
  )
}

export default App
