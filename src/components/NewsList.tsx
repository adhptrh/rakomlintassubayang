import Link from 'next/link';
import config from "@/config";
import { useEffect, useState } from "react";
import { reverse } from 'dns';

type Props = {
    title: string
    reverse?: boolean
}

function NewsList(props: Props) {

    const [posts, setPosts] = useState([{
        title: "",
        thumbnail: "",
        id: "",
        created_at: "",
        contentText: "",
        category: {
            name:"waw"
        }
    }])

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
            setPosts([...xd])
        }
    }

    useEffect(() => {
        load()
    }, [])

    useEffect(()=>{
        console.log(posts[0].category.name)
    }, [posts])

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
                    { posts.map((v,i) => { 
                        if (i > 4) return
                        const responsive = ["","","hidden lg:block", "hidden xl:block", "hidden 2xl:block"]

                        return <Link href={"/post?id="+v.id} key={i} className={"flex-1 "+responsive[i]}>
                        <div className="transition-all h-full p-4 bg-white rounded-2xl shadow-sm hover:shadow-2xl hover:mt-[-0.5rem]">
                            <span className="mb-3 inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20">{v.category.name}</span>
                            <div className="bg-center bg-cover w-full h-36 rounded-2xl shadow-md mb-2" style={{ backgroundImage: "url("+ config.API_URL.substring(0,config.API_URL.length-6) + "../storage/images/" + v.thumbnail +")" }}></div>
                            <p className="text-xs text-gray-700">{new Date(v.created_at).toLocaleString()}</p>
                            <p className="font-bold text-lg mb-2">{v.title}</p>
                            <p className="text-sm">{v.contentText.substring(0,100)}...<span className="font-bold ml-2">Selengkapnya</span></p>
                        </div>
                    </Link> } ) }

                    {/* <div className="flex-1">
                        <div className="transition-all p-4 bg-white rounded-2xl shadow-sm hover:shadow-2xl hover:mt-[-0.5rem]">
                            <div className="bg-center bg-cover w-full h-36 rounded-2xl shadow-md mb-2" style={{ backgroundImage: "url(./thumb.jpeg)" }}></div>
                            <p className="font-bold text-md">Tidak ada berita.</p>
                            <p className="text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam eget lacus congue, luctus tellus et, porta mi. Donec eget porta odio.</p>
                        </div>
                    </div>
                    <div className="flex-1">
                        <div className="transition-all p-4 bg-white rounded-2xl shadow-sm hover:shadow-2xl hover:mt-[-0.5rem]">
                            <div className="bg-center bg-cover w-full h-36 rounded-2xl shadow-md mb-2" style={{ backgroundImage: "url(./thumb.jpeg)" }}></div>
                            <p className="font-bold text-md">Tidak ada berita.</p>
                            <p className="text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam eget lacus congue, luctus tellus et, porta mi. Donec eget porta odio..</p>
                        </div>
                    </div>
                    <div className="flex-1 hidden lg:block">
                        <div className="transition-all p-4 bg-white rounded-2xl shadow-sm hover:shadow-2xl hover:mt-[-0.5rem]">
                            <div className="bg-center bg-cover w-full h-36 rounded-2xl shadow-md mb-2" style={{ backgroundImage: "url(./thumb.jpeg)" }}></div>
                            <p className="font-bold text-md">Tidak ada berita.</p>
                            <p className="text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam eget lacus congue, luctus tellus et, porta mi. Donec eget porta odio.</p>
                        </div>
                    </div>
                    <div className="flex-1 hidden xl:block">
                        <div className="transition-all p-4 bg-white rounded-2xl shadow-sm hover:shadow-2xl hover:mt-[-0.5rem]">
                            <div className="bg-center bg-cover w-full h-36 rounded-2xl shadow-md mb-2" style={{ backgroundImage: "url(./thumb.jpeg)" }}></div>
                            <p className="font-bold text-md">Tidak ada berita.</p>
                            <p className="text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam eget lacus congue, luctus tellus et, porta mi. Donec eget porta odio.</p>
                        </div>
                    </div>
                    <div className="flex-1 hidden 2xl:block">
                        <div className="transition-all p-4 bg-white rounded-2xl shadow-sm hover:shadow-2xl hover:mt-[-0.5rem]">
                            <div className="bg-center bg-cover w-full h-36 rounded-2xl shadow-md mb-2" style={{ backgroundImage: "url(./thumb.jpeg)" }}></div>
                            <p className="font-bold text-md">Tidak ada berita.</p>
                            <p className="text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam eget lacus congue, luctus tellus et, porta mi. Donec eget porta odio.</p>
                        </div>
                    </div> */}
                </div>
            </div>
        </div>
    </>
}

export default NewsList;