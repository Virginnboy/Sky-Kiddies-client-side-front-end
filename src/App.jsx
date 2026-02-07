import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ClientRootLayout from "./components/ClientRootLayout";
import HomePage from "./pages/HomePage";

function App() {
  const queryClient = new QueryClient();

  const routes = createBrowserRouter([
    {path: "/", element: <ClientRootLayout/>, children: [
      {index: true, element: <HomePage/>}
    ]}
  ])

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={routes}/>
    </QueryClientProvider>
  )
}

export default App
