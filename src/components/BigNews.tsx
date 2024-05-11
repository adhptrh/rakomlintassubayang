import config from "@/config";
import { useEffect, useState } from "react";
import Link from "next/link";

function BigNews() {

  const [posts, setPosts] = useState([{
    title:"",
    thumbnail:"",
    contentText:"",
    id:""
  }])

  async function load() {
    const resp = await fetch(config.API_URL + "/posts", {
      headers: {
        "Accept": "application/json"
      }
    })

    if (resp.status == 200) {
      const jsonResp = await resp.json()
      setPosts([...jsonResp.data])
    }
  }

  useEffect(() => {
    load()
  }, [])

  return <>
    <div className="container xl:px-32 px-4 flex w-full flex-col">
      <div className="flex bg-white rounded-2xl mt-8 p-4 pt-1 shadow-sm border-gray-200 border-[1px] justify-center items-center">
        <Link href="https://www.greenradioline.id/"><img src="https://www.greenradioline.id/frontend/images/logo.png" className="w-[350px] mb-3 mr-10"></img></Link>
        <Link href="https://yapeka.or.id/"><img src="./logo3.png" className="w-[250px] mt-3 rounded-2xl"></img></Link>
      </div>
      <p className="font-bold mt-8 mb-5 text-3xl">Pilihan Editor</p>
      <div className="w-full gap-x-6 flex mb-3 h-[300px] md:h-[450px] xl:h-[600px]">
        <div className="flex-1 h-full p-0 hover:p-4 rounded-2xl transition-all shadow-sm">
          <Link href={ posts.length > 0 ? "/post?id="+posts[0].id:"#" } className="relative w-full bg-black h-full rounded-2xl bg-center bg-cover flex flex-col justify-end" style={{ backgroundImage: "url("+ ((posts.length > 0) ? (config.API_URL.substring(0,config.API_URL.length-6) + "../storage/images/" + posts[0].thumbnail) : ("./thumb.jpeg")) +")" }}>
            <div className="h-32 z-10 rounded-t-0 rounded-b-2xl absolute w-full bg-black opacity-70  text-white font-bold text-2xl">
            </div>
            <div className="h-32 z-20 p-5  text-white font-bold text-xl md:text-2xl">
              <p>{ posts.length > 0 ? posts[0].title: "Loading..."}</p>
              <p className="text-white text-sm font-normal mt-2">{ posts.length > 0 ? posts[0].contentText.substring(0,130)+"...": "Loading..."}</p>
            </div>
          </Link>
        </div>
        <div className="flex-none flex-col gap-y-6 hidden w-0 lg:flex lg:w-72 xl:w-96 h-full">
          <Link href={ posts.length > 1 ? "/post?id="+posts[1].id:"#" } className="flex-1 flex flex-col relative flex justify-end bg-center bg-cover rounded-2xl transition-all shadow-md hover:shadow-2xl" style={{ backgroundImage: "url("+ ((posts.length > 1) ? (config.API_URL.substring(0,config.API_URL.length-6) + "../storage/images/" + posts[1].thumbnail) : ("./thumb.jpeg")) +")" }}>
            <div className="absolute z-10 h-16 z-10 p-2 w-full bg-black opacity-70 text-white font-bold text-xl md:text-xs rounded-bl-2xl rounded-br-2xl"></div>
            <div className="h-18 z-20 p-2  w-full text-white font-bold lg:text-xs xl:text-sm">
              <p>{ posts.length > 1 ? posts[1].title: "Loading..."}</p>
              <p className="text-white text-xs font-normal">{ posts.length > 0 ? posts[0].contentText.substring(0,70)+"...": "Loading..."}</p>
            </div>
          </Link>
          <Link href={ posts.length > 2 ? "/post?id="+posts[2].id:"#" } className="flex-1 flex flex-col relative flex justify-end bg-center bg-cover rounded-2xl transition-all shadow-md hover:shadow-2xl" style={{ backgroundImage: "url("+ ((posts.length > 2) ? (config.API_URL.substring(0,config.API_URL.length-6) + "../storage/images/" + posts[2].thumbnail) : ("./thumb.jpeg")) +")" }}>
            <div className="absolute z-10 h-16 z-10 p-2 w-full bg-black opacity-70  text-white font-bold text-xl md:text-xs  rounded-bl-2xl rounded-br-2xl"></div>
            <div className="h-18 z-20 p-2 w-full text-white font-bold lg:text-xs xl:text-sm rounded-2xl">
              <p>{ posts.length > 2 ? posts[2].title: "Loading..."}</p>
              <p className="text-white text-xs font-normal">{ posts.length > 0 ? posts[0].contentText.substring(0,70)+"...": "Loading..."}</p>
            </div>
          </Link>
          <Link href={ posts.length > 3 ? "/post?id="+posts[3].id:"#" } className="flex-1 flex flex-col relative flex justify-end bg-center bg-cover rounded-2xl transition-all shadow-md hover:shadow-2xl" style={{ backgroundImage: "url("+ ((posts.length > 3) ? (config.API_URL.substring(0,config.API_URL.length-6) + "../storage/images/" + posts[3].thumbnail) : ("./thumb.jpeg")) +")" }}>
            <div className="absolute z-10 h-16 z-10 p-2 w-full bg-black opacity-70  text-white font-bold text-xl md:text-xs  rounded-bl-2xl rounded-br-2xl"></div>
            <div className="h-18 z-20 p-2 w-full text-white font-bold lg:text-xs xl:text-sm rounded-2xl rounded-t-0">
              <p>{ posts.length > 3 ? posts[3].title: "Loading..."}</p>
              <p className="text-white text-xs font-normal">{ posts.length > 0 ? posts[0].contentText.substring(0,70)+"...": "Loading..."}</p>
            </div>
          </Link>
        </div>
      </div>
      
    </div>
  </>
}

export default BigNews;