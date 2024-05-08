"use client"

import Image from "next/image";
import Navbar from "../../components/Navbar";
import BigNews from "../../components/BigNews";
import NewsList from "@/components/NewsList";
import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import ItemList from "@/components/ItemList";
import Footer from "@/components/Footer";

export default function Semua() {
  
  const [sidebarVisible, setSidebarVisible] = useState(false)
  
  useEffect(()=>{
    if (localStorage.getItem("sidebar") == "open") {
      setSidebarVisible(true)
    }
  }, [])

  return (<>
    <Sidebar setSidebarVisible={setSidebarVisible} sidebarVisible={sidebarVisible}></Sidebar>
    <main className="flex flex-col min-h-screen items-center">
      <Navbar burgerOnClick={() => { setSidebarVisible(!sidebarVisible) }} />
      <div className="w-full h-[80px]"></div>
        <div className="container px-5 flex w-full flex-col min-h-screen">
          <div className="pt-5">

            <ItemList title="Program" query="?cat=3"/>
            
          </div>
        </div>
        <div className="mb-24"></div>

      <Footer />

    </main>
  </>
  );
}
