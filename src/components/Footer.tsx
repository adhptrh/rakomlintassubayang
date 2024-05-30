"use client"

import Link from "next/link"



export default function Footer() {
    return <>
    <div className="w-full bg-gray-900 flex justify-center pt-5">
        <div className="container px-5 pt-10 pb-10 flex w-full flex-col sm:flex-row text-white">
            <div className="flex mr-0 sm:mr-12 flex-col ">
                <div className="flex mb-8">
                    <div className="bg-white p-2 rounded-xl">
                        <img src="./logo.png" width={100}></img>
                    </div>
                </div>
            </div>
            <div className="flex mr-24 mb-8 flex-col">
                <p className="font-bold mb-4 text-xl">Media Social</p>
                <Link href="https://www.instagram.com/rakomlintas_subayang/" className="mb-2 underline text-gray-200">Instagram</Link>
                <Link href="https://www.youtube.com/@RakomLintasSubayang" className="mb-2 underline text-gray-200">Yotube</Link>
            </div>
            <div className="flex flex-col">
                <p className="font-bold mb-4 text-xl">Kontak Kami</p>
                <Link href="#" className="mb-2 text-gray-200">Whatsapp: +62 822-6193-9548</Link>
                <Link href="#" className="mb-2 text-gray-200">Tel: +62 822-8411-2405</Link>
                <Link href="#" className="mb-2 text-gray-200">Email: rakomlintassubayang2024@gmail.com</Link>
            </div>
        </div>
      </div>
    </>
}