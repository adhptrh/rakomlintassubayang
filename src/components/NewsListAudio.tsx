import Link from 'next/link';
import config from "@/config";
import { useEffect, useState } from "react";
import { reverse } from 'dns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPause, faPlay } from '@fortawesome/free-solid-svg-icons';

type Props = {
    title: string
    reverse?: boolean
}

type Post = {
    title: string,
    thumbnail: string,
    id: number,
    created_at: string,
    contentText: string,
    category: {
        name: string
    },
    audio: string
    played?: boolean
}

function NewsListAudio(props: Props) {
    const [isPlaying, setIsPlaying] = useState(false);

    const [posts, setPosts] = useState<Post[]>([])
    const [lastPlayed, setLastPlayed] = useState(-1)

    async function load() {
        const resp = await fetch(config.API_URL + "/posts", {
            headers: {
                "Accept": "application/json"
            }
        })

        if (resp.status == 200) {
            const jsonResp = await resp.json()
            let xd = jsonResp.data
            if (props.reverse) {
                xd.reverse()
            }
            xd = xd.filter((v:Post) => v.category.name == "Audio")
            xd = xd.map((v:Post) => {return {...v, played: false}})
            setPosts([...xd])
        }
    }

    const togglePlay = (id: number) => {
        setPosts([...posts].map((v,i) => {
            if (i == id) {
                if (v.played) {
                    return {...v, played: false}
                } else {
                    return {...v, played: true}
                }
            }
            return {...v, played: false}
        }))
    }

    useEffect(()=>{
        posts.map((v,i)=> {
            if (v.played) {
                const audio:HTMLAudioElement = document.getElementById("faudio"+i) as HTMLAudioElement
                audio.play()
            } else {
                const audio:HTMLAudioElement = document.getElementById("faudio"+i) as HTMLAudioElement
                audio.pause()
            }
        })
        console.log("change detected")
    }, [posts])

    useEffect(() => {
        load()
    }, [])

    return <>
        <div className="container xl:px-32 px-4  flex w-full flex-col">
            <div className="flex w-full items-end ">
                <div className="">
                    <p className="font-bold mb-8 text-3xl">{props.title}</p>
                </div>
                <div className="flex-1 justify-end flex">
                    <Link href="/semua" className="font-bold mb-8 text-sm">Lihat Semua &gt;</Link>
                </div>
            </div>
            <div className="flex w-full">
                <div className="flex flex-col sm:flex-row gap-6 w-full max-w-full">
                    {/* { posts.map((v,i) => { 
                        if (i > 4) return
                        const responsive = ["","","hidden lg:block", "hidden xl:block", "hidden 2xl:block"]

                        return <div key={i} className={"flex-1 "+responsive[i]}>
                        <audio id={"faudio"+i}>
                            <source src={config.API_URL.substring(0,config.API_URL.length-6) + "../storage/audio/" + v.audio}></source>
                        </audio>
                        <div className="transition-all h-full p-4 bg-white rounded-2xl shadow-sm hover:shadow-2xl hover:mt-[-0.5rem]">
                            <span className="mb-3 inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20">{v.category.name}</span>
                            <div className="bg-center bg-cover w-full h-36 rounded-2xl shadow-md mb-2" style={{ backgroundImage: "url("+ config.API_URL.substring(0,config.API_URL.length-6) + "../storage/images/" + v.thumbnail +")" }}></div>
                            <p className="text-xs text-gray-700">{new Date(v.created_at).toLocaleString()}</p>
                            <p className="font-bold text-lg mb-2">{v.title}</p>
                            <div className="flex justify-end mb-2">
                                <button onClick={()=>{togglePlay(i)}} className="w-[50px] h-[50px] bg-black rounded-full flex justify-center items-center bg-gradient-to-r flex flex-col from-sky-500 to-indigo-500 ">
                                    <FontAwesomeIcon id={"btnpp"+i} icon={posts[i].played ? faPause:faPlay} color="white" width={20}></FontAwesomeIcon>
                                </button>
                            </div>
                        </div>  
                    </div> } ) } */}
                    <div className={"flex-1"}>
                        <audio id={"faudio0"}>
                            <source src={posts.length > 0 ? (config.API_URL.substring(0,config.API_URL.length-6) + "../storage/audio/" + posts[0].audio):""}></source>
                        </audio>
                        <div className="transition-all h-full p-4 bg-white rounded-2xl shadow-sm hover:shadow-2xl hover:mt-[-0.5rem]">
                            <span className="mb-3 inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20">{posts.length > 0 ? posts[0].category.name:""}</span>
                            <div className="bg-center bg-cover w-full h-36 rounded-2xl shadow-md mb-2" style={{ backgroundImage: "url("+ config.API_URL.substring(0,config.API_URL.length-6) + "../storage/images/" + ((posts.length > 0) ? posts[0].thumbnail:"") +")" }}></div>
                            <p className="text-xs text-gray-700">{posts.length > 0 ? new Date(posts[0].created_at).toLocaleString():""}</p>
                            <p className="font-bold text-lg mb-2">{posts.length > 0 ? posts[0].title:""}</p>
                            <div className="flex justify-end mb-2">
                                <button onClick={()=>{togglePlay(0)}} className="w-[50px] h-[50px] bg-black rounded-full flex justify-center items-center bg-gradient-to-r flex flex-col from-sky-500 to-indigo-500 ">
                                    <FontAwesomeIcon icon={posts.length > 0 ? (posts[0].played ? faPause:faPlay):faPlay} color="white" width={20}></FontAwesomeIcon>
                                </button>
                            </div>
                        </div>  
                    </div>
                    <div className={"flex-1" + (posts.length > 1 ? "":" opacity-0")}>
                        <audio id={"faudio1"}>
                            <source src={posts.length > 1 ? (config.API_URL.substring(0,config.API_URL.length-6) + "../storage/audio/" + posts[1].audio):""}></source>
                        </audio>
                        <div className="transition-all h-full p-4 bg-white rounded-2xl shadow-sm hover:shadow-2xl hover:mt-[-0.5rem]">
                            <span className="mb-3 inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20">{posts.length > 1 ? posts[1].category.name:""}</span>
                            <div className="bg-center bg-cover w-full h-36 rounded-2xl shadow-md mb-2" style={{ backgroundImage: "url("+ config.API_URL.substring(0,config.API_URL.length-6) + "../storage/images/" + ((posts.length > 1) ? posts[1].thumbnail:"") +")" }}></div>
                            <p className="text-xs text-gray-700">{posts.length > 1 ? new Date(posts[1].created_at).toLocaleString():""}</p>
                            <p className="font-bold text-lg mb-2">{posts.length > 1 ? posts[1].title:""}</p>
                            <div className="flex justify-end mb-2">
                                <button onClick={()=>{togglePlay(1)}} className="w-[50px] h-[50px] bg-black rounded-full flex justify-center items-center bg-gradient-to-r flex flex-col from-sky-500 to-indigo-500 ">
                                    <FontAwesomeIcon icon={posts.length > 1 ? (posts[1].played ? faPause:faPlay):faPlay} color="white" width={20}></FontAwesomeIcon>
                                </button>
                            </div>
                        </div>  
                    </div>
                    <div className={"flex-1 hidden lg:block" + (posts.length > 2 ? "":" opacity-0")}>
                        <audio id={"faudio2"}>
                            <source src={posts.length > 2 ? (config.API_URL.substring(0,config.API_URL.length-6) + "../storage/audio/" + posts[2].audio):""}></source>
                        </audio>
                        <div className="transition-all h-full p-4 bg-white rounded-2xl shadow-sm hover:shadow-2xl hover:mt-[-0.5rem]">
                            <span className="mb-3 inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20">{posts.length > 2 ? posts[2].category.name:""}</span>
                            <div className="bg-center bg-cover w-full h-36 rounded-2xl shadow-md mb-2" style={{ backgroundImage: "url("+ config.API_URL.substring(0,config.API_URL.length-6) + "../storage/images/" + ((posts.length > 2) ? posts[2].thumbnail:"") +")" }}></div>
                            <p className="text-xs text-gray-700">{posts.length > 2 ? new Date(posts[2].created_at).toLocaleString():""}</p>
                            <p className="font-bold text-lg mb-2">{posts.length > 2 ? posts[2].title:""}</p>
                            <div className="flex justify-end mb-2">
                                <button onClick={()=>{togglePlay(2)}} className="w-[50px] h-[50px] bg-black rounded-full flex justify-center items-center bg-gradient-to-r flex flex-col from-sky-500 to-indigo-500 ">
                                    <FontAwesomeIcon icon={posts.length > 2 ? (posts[2].played ? faPause:faPlay):faPlay} color="white" width={20}></FontAwesomeIcon>
                                </button>
                            </div>
                        </div>  
                    </div>
                    <div className={"flex-1 hidden xl:block" + (posts.length > 3 ? "":" opacity-0")}>
                        <audio id={"faudio3"}>
                            <source src={posts.length > 3 ? (config.API_URL.substring(0,config.API_URL.length-6) + "../storage/audio/" + posts[3].audio):""}></source>
                        </audio>
                        <div className="transition-all h-full p-4 bg-white rounded-2xl shadow-sm hover:shadow-2xl hover:mt-[-0.5rem]">
                            <span className="mb-3 inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20">{posts.length > 3 ? posts[3].category.name:""}</span>
                            <div className="bg-center bg-cover w-full h-36 rounded-2xl shadow-md mb-2" style={{ backgroundImage: "url("+ config.API_URL.substring(0,config.API_URL.length-6) + "../storage/images/" + ((posts.length > 3) ? posts[3].thumbnail:"") +")" }}></div>
                            <p className="text-xs text-gray-700">{posts.length > 3 ? new Date(posts[3].created_at).toLocaleString():""}</p>
                            <p className="font-bold text-lg mb-2">{posts.length > 3 ? posts[3].title:""}</p>
                            <div className="flex justify-end mb-2">
                                <button onClick={()=>{togglePlay(3)}} className="w-[50px] h-[50px] bg-black rounded-full flex justify-center items-center bg-gradient-to-r flex flex-col from-sky-500 to-indigo-500 ">
                                    <FontAwesomeIcon icon={posts.length > 3 ? (posts[3].played ? faPause:faPlay):faPlay} color="white" width={20}></FontAwesomeIcon>
                                </button>
                            </div>
                        </div>  
                    </div>
                    <div className={"flex-1 hiddel 2x:block" + (posts.length > 4 ? "":" opacity-0")}>
                        <audio id={"faudio3"}>
                            <source src={posts.length > 4 ? (config.API_URL.substring(0,config.API_URL.length-6) + "../storage/audio/" + posts[4].audio):""}></source>
                        </audio>
                        <div className="transition-all h-full p-4 bg-white rounded-2xl shadow-sm hover:shadow-2xl hover:mt-[-0.5rem]">
                            <span className="mb-3 inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20">{posts.length > 4 ? posts[4].category.name:""}</span>
                            <div className="bg-center bg-cover w-full h-36 rounded-2xl shadow-md mb-2" style={{ backgroundImage: "url("+ config.API_URL.substring(0,config.API_URL.length-6) + "../storage/images/" + ((posts.length > 4) ? posts[4].thumbnail:"") +")" }}></div>
                            <p className="text-xs text-gray-700">{posts.length > 4 ? new Date(posts[4].created_at).toLocaleString():""}</p>
                            <p className="font-bold text-lg mb-2">{posts.length > 4 ? posts[4].title:""}</p>
                            <div className="flex justify-end mb-2">
                                <button onClick={()=>{togglePlay(4)}} className="w-[50px] h-[50px] bg-black rounded-full flex justify-center items-center bg-gradient-to-r flex flex-col from-sky-500 to-indigo-500 ">
                                    <FontAwesomeIcon icon={posts.length > 4 ? (posts[4].played ? faPause:faPlay):faPlay} color="white" width={20}></FontAwesomeIcon>
                                </button>
                            </div>
                        </div>  
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default NewsListAudio;