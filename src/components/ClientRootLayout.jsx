import { Outlet } from "react-router-dom";
import ClientNavbar from "./ClientNavbar";
import { useState } from "react";

export default function ClientRootLayout({children}) {
  const [ search, setSearch ] = useState("");

  return(
    <>
    <ClientNavbar search = {search} setSearch={setSearch}/>
    <Outlet context={search}/>
    </>
  )
}