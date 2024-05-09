"use client"

import { usePathname } from 'next/navigation';
import Navbar from "../components/Navbar";
import BigNews from "../components/BigNews";
import Link from 'next/link';
import NewsList from "@/components/NewsList";
import { useEffect, useState } from "react";
import Sidebar from '@/components/Sidebar';
import Footer from '@/components/Footer';

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
      <div className="w-full h-[100px]"></div>
      <div className="animate-comeup flex flex-col w-full min-h-screen items-center">
        <BigNews />
        <div className="mb-10"></div>

        <NewsList title="Populer" />
        <div className="mb-10"></div>
        <NewsList title="Terbaru" />
        <div className="mb-24"></div>

        <Footer></Footer>
      </div>

    </main>
  </>
  );
}
