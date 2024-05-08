"use client"
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Dispatch, SetStateAction, useState } from 'react';

type Props = {
    setSidebarVisible: Dispatch<SetStateAction<boolean>>
    sidebarVisible: Boolean
}
export default function Sidebar(props: Props) {
    const pathname = usePathname()

    return <>
    <div className={"transition-all h-screen sm:w-[400px] w-full bg-white shadow-2xl fixed z-50 flex-col " + (props.sidebarVisible ? "left-0" : "left-[-650px]")}>
      <div className={"flex justify-end w-full"}>
        <button className={"mr-4 mt-3 p-1 px-3 bg-slate-200 rounded-lg"} onClick={() => { props.setSidebarVisible(!props.sidebarVisible) }}>x</button>
      </div>
      <div className="flex">
        <Link href="/" className={"ml-10 mb-4 flex items-center transition-all text-sm " + (pathname == "/" ? "font-bold text-custom-blue-sky border-custom-blue-sky border-b-2" : "text-slate-400")}>BERANDA</Link>
      </div>
      <div className="flex">
        <Link href="/khabardesa" className={"ml-10 mb-4 flex items-center transition-all text-sm " + (pathname == "/khabardesa" ? "font-bold text-custom-blue-sky border-custom-blue-sky border-b-2" : "text-slate-400")}>KHABAR DESA</Link>
      </div>
      <div className="flex">
        <Link href="/event" className={"ml-10 mb-4 flex items-center transition-all text-sm " + (pathname == "/event" ? "font-bold text-custom-blue-sky border-custom-blue-sky border-b-2" : "text-slate-400")}>EVENT</Link>
      </div>
      <div className="flex">
        <Link href="/program" className={"ml-10 mb-4 flex items-center transition-all text-sm " + (pathname == "/program" ? "font-bold text-custom-blue-sky border-custom-blue-sky border-b-2" : "text-slate-400")}>PROGRAM</Link>
      </div>
      <div className="flex">
        <Link href="/live" className="ml-10 h-full font-bold text-red-500 border-2 border-red-500 flex items-center px-8 text-sm">LIVE RADIO</Link>
      </div>
    </div>
    </>
}