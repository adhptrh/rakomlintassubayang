"use client"

import { usePathname } from 'next/navigation';
import Image from "next/image";
import Navbar from "../components/Navbar";
import BigNews from "../components/BigNews";
import Link from 'next/link';
import NewsList from "@/components/NewsList";
import { useEffect, useState } from "react";
import Sidebar from '@/components/Sidebar';

export default function Home() {

  const pathname = usePathname()
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
      <BigNews />
      <div className="mb-10"></div>

      <NewsList title="Populer" />
      <div className="mb-10"></div>
      <NewsList title="Terbaru" />
      <div className="mb-10"></div>


      <div className="w-full bg-black flex justify-center pt-5">
        <div className="container px-5 flex w-full flex-col text-white">
          <p className="font-bold mb-8">Footer</p>
        </div>
      </div>

    </main>
  </>
  );
}
