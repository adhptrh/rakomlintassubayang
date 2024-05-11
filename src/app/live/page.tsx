"use client"

import "./style.css"
import Navbar from "../../components/Navbar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faPause, faVolumeHigh, faVolumeXmark } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from 'react';
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";

export default function Live() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [sidebarVisible, setSidebarVisible] = useState(false)
  useEffect(()=>{
    if (localStorage.getItem("sidebar") == "open") {
      setSidebarVisible(true)
    }
  }, [])

  const togglePlay = () => {
    const audio:HTMLAudioElement = document.getElementById("liveaudio") as HTMLAudioElement
    if (isPlaying) {
      audio.pause()
    } else {
      audio.play()
    }
    setIsPlaying(!isPlaying);
  }

  return (<>
    <Sidebar setSidebarVisible={setSidebarVisible} sidebarVisible={sidebarVisible}></Sidebar>
    <main className="flex flex-col min-h-screen items-center">
      <Navbar burgerOnClick={() => { setSidebarVisible(!sidebarVisible) }} />
      <div className="w-full flex flex-col items-center h-screen">
        <div className="h-[100px] w-full">
        </div>
        <div className="animate-comeup flex flex-col w-full min-h-screen items-center">
          <div className="container font-bold flex flex-col h-full w-full px-5">
            <div className="mt-5">
              <p>Live Radio</p>
            </div>
            <div className="flex-1 flex flex-col items-center justify-center">
              <div className="h-[200px] w-full max-w-[600px] bg-gradient-to-r flex flex-col from-sky-500 to-indigo-500 rounded-lg shadow-2xl p-5 text-white">
                <div className="flex w-full">
                  <div className="flex-1">
                    <p>RAKOM LINTAS SUBAYANG</p>
                  </div>
                  <div className="flex-1 flex text-xs justify-end">
                    <div className="bg-red-500 rounded-lg p-1">
                      NOW LIVE
                    </div>
                  </div>
                </div>
                <div className="flex flex-col h-full justify-end">
                  <div className="flex">
                    <div onClick={togglePlay} className="z-20 cursor-pointer absolute h-16 w-16 flex items-center justify-center">
                      <FontAwesomeIcon icon={isPlaying ? faPause:faPlay} width={20}></FontAwesomeIcon>
                    </div>
                    <div className="z-10 rounded-full h-16 w-16 bg-black opacity-50 flex items-center justify-center">
                    </div>
                    <div onClick={()=>{setIsMuted(!isMuted)}} className="flex cursor-pointer flex-col ml-4 h-full justify-end">
                        <FontAwesomeIcon icon={isMuted ? faVolumeXmark:faVolumeHigh} width={20}></FontAwesomeIcon>
                    </div>
                    <audio id="liveaudio" src="https://a3.siar.us/listen/rakomlintassubayang/stream"></audio>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
      
      <Footer/>

    </main>
  </>
  );
}
