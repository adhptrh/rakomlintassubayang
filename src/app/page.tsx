"use client"

import { usePathname } from 'next/navigation';
import Navbar from "../components/Navbar";
import BigNews from "../components/BigNews";
import Link from 'next/link';
import NewsList from "@/components/NewsList";
import { useEffect, useState } from "react";
import Sidebar from '@/components/Sidebar';
import Footer from '@/components/Footer';
import NewsListAudio from '@/components/NewsListAudio';
import Sponsor from '@/components/Sponsor';

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
        <Sponsor />
        <div className="mb-10"></div>
        <NewsListAudio title="Program Audio" reverse={true}/>
        <div className="mb-10"></div>
        <BigNews />
        <div className="mb-10"></div>

        <NewsList title="Terbaru" reverse={true}/>
        <div className="mb-24"></div>
        <NewsList title="Populer" />
        <div className="mb-10"></div>

        <Footer></Footer>
      </div>

    </main>
  </>
  );
}
