import { Outlet } from "react-router-dom";
import ClientNavbar from "./ClientNavbar";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { searchProducts, fetchAllProducts } from "../store/util";
import "../components/ClientRootLayout.css"

export default function ClientRootLayout() {
  const [ search, setSearch ] = useState("");

  // FETCH/SEARCH PRODUCTS
  const { data: products, isLoading, isError:isQueryError, error:queryError, isFetching }= useQuery({
    queryKey: ["products", search],
    queryFn: ()=>( search ? searchProducts(search) : fetchAllProducts()),
  });


  return(
    <>
    <ClientNavbar 
      search = {search} 
      setSearch={setSearch}
      isFetching = {isFetching}
    />
      <div className="root-layout">
        <Outlet 
        context={{search, products, isLoading, isQueryError, queryError}}
        />
      </div>
    </>
  )
}