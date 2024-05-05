"use client"

import Image from "next/image";
import Navbar from "../../components/Navbar";
import BigNews from "../../components/BigNews";
import NewsList from "@/components/NewsList";
import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";

export default function Live() {
  
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
          <div>

            <div className="flex-1 flex flex-col relative flex justify-end bg-center bg-cover rounded-lg shadow-md cursor-pointer" style={{ backgroundImage: "url(./thumb.jpeg)" }}>
              <div className="absolute z-10 h-16 z-10 p-2 w-full border-t-2 bg-black opacity-70 border-custom-blue-sky text-white font-bold text-xl md:text-xs rounded-lg"></div>
              <div className="h-16 z-20 p-2 border-t-2 border-custom-blue-sky w-full.
                3 text-white font-bold lg:text-xs xl:text-sm rounded-lg">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam et sapien orci.</p>
              </div>
            </div>
          </div>
        </div>

      <div className="w-full bg-black flex justify-center pt-5">
        <div className="container px-5 flex w-full flex-col text-white">
          <p className="font-bold mb-8">Footer</p>
        </div>
      </div>

    </main>
  </>
  );
}
