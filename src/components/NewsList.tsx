import Link from 'next/link';
import config from "@/config";
import { useEffect, useState } from "react";

type Props = {
    title: string
}

function NewsList(props: Props) {


    const [posts, setPosts] = useState([{
        title: "",
        thumbnail: "",
        id: ""
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
        <div className="container px-5 flex w-full flex-col">
            <div className="flex w-full items-end">
                <div className="">
                    <p className="font-bold mb-8 text-3xl">{props.title}</p>
                </div>
                <div className="flex-1 justify-end flex">
                    <Link href="#" className="font-bold mb-8 text-sm">Lihat Semua &gt;</Link>
                </div>
            </div>
            <div className="flex w-full">
                <div className="flex gap-x-6 max-w-full">
                    { posts.map((v,i) => <Link href="#" key={i} className="flex-1">
                        <div className="transition-all p-4 bg-white rounded-2xl shadow-sm hover:shadow-2xl hover:mt-[-0.5rem]">
                            <div className="bg-center bg-cover w-full h-36 rounded-2xl shadow-md mb-2" style={{ backgroundImage: "url("+ config.API_URL.substring(0,config.API_URL.length-6) + "storage/images/" + v.thumbnail +")" }}></div>
                            <p className="font-bold text-md">{v.title}</p>
                            <p className="text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam eget lacus congue, luctus tellus et, porta mi. Donec eget porta odio.</p>
                        </div>
                    </Link> ) }

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