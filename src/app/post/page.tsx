"use client"

import "./style.css"
import Image from "next/image";
import Navbar from "../../components/Navbar";
import BigNews from "../../components/BigNews";
import NewsList from "@/components/NewsList";
import { Suspense, useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import { useSearchParams } from 'next/navigation'
import config from "@/config";
import Footer from "@/components/Footer";

function Okay() {
  const searchParams = useSearchParams()
  const [sidebarVisible, setSidebarVisible] = useState(false)
  const [title, setTitle] = useState("")
  const [image, setImage] = useState("")
  const [content, setContent] = useState("")
  const [date, setDate] = useState("")

  async function loadData() {
    const resp = await fetch(config.API_URL + `/posts/${searchParams.get("id")}`, {
      headers: {
        "Accept": "application/json"
      }
    })

    if (resp.status == 200) {
      const jsonResp = await resp.json()
      setTitle(jsonResp.data.title)
      setDate(new Date(jsonResp.data.created_at).toLocaleString())
      setContent(jsonResp.data.contentHTML)
      setImage(jsonResp.data.thumbnail)
    }
  }

  useEffect(() => {
    if (localStorage.getItem("sidebar") == "open") {
      setSidebarVisible(true)
    }

    loadData()
  }, [])

  return <>
  <Sidebar setSidebarVisible={setSidebarVisible} sidebarVisible={sidebarVisible}></Sidebar>
    <main className="flex flex-col min-h-screen items-center">
      <Navbar burgerOnClick={() => { setSidebarVisible(!sidebarVisible) }} />
      <div className="w-full h-[80px]"></div>
      <div className="container px-10 flex w-full flex-col min-h-screen">
        <div>
          <div className="bg-black w-full bg-center bg-cover h-[300px]" style={{ backgroundImage: `url(${config.API_URL.substring(0,config.API_URL.length-6)}../storage/images/${image})` }}></div>
          <p className="mt-3 text-xs mb-3">{date}</p>
          <p className="text-2xl font-bold">{title}</p>
          <div className="normal" dangerouslySetInnerHTML={{ __html: content }}></div>
        </div>
      </div>
      <div className="mb-24"></div>

      <Footer/>

    </main>
    </>
}

export default function Post() {

  return (<Suspense>
    <Okay/>
  </Suspense>
  );
}
