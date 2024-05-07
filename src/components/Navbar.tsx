"use client"
import { usePathname } from 'next/navigation';
import Link from 'next/link';

type Props = {
    burgerOnClick: ()=>void
}

function Navbar (props: Props) {
    const pathname = usePathname()

    return <>

        <div className="fixed w-full h-1 z-40 bg-custom-blue-sky"></div>
        <div className="shadow-md z-30 w-full fixed flex bg-white justify-center pb-5">
            <div className="container xl:px-32 px-4 ">
                <div className="w-full mt-5 h-10 flex">
                    <img src="./logo.png" width={100}></img>
                    <div className="w-[1px] h-full ml-16 bg-black"></div>
                    <Link href="/"           className={"lg:flex hidden h-full ml-10 flex items-center transition-all text-sm " + (pathname == "/" ? "font-bold text-custom-blue-sky border-custom-blue-sky border-b-2":"text-slate-400")}>BERANDA</Link>
                    <Link href="/khabardesa" className={"lg:flex hidden h-full ml-10 flex items-center transition-all text-sm " + (pathname == "/khabardesa" ? "font-bold text-custom-blue-sky border-custom-blue-sky border-b-2":"text-slate-400")}>KHABAR DESA</Link>
                    <Link href="/event" className={"lg:flex hidden h-full ml-10 flex items-center transition-all text-sm " + (pathname == "/event" ? "font-bold text-custom-blue-sky border-custom-blue-sky border-b-2":"text-slate-400")}>EVENT</Link>
                    <Link href="/program" className={"lg:flex hidden h-full ml-10 flex items-center transition-all text-sm " + (pathname == "/program" ? "font-bold text-custom-blue-sky border-custom-blue-sky border-b-2":"text-slate-400")}>PROGRAM</Link>
                    <div className="flex-1 justify-end items-center flex">
                        <Link href="/live" className="lg:flex hidden h-full font-bold text-red-500 border-2 border-red-500 flex items-center px-8 text-sm">LIVE RADIO</Link>
                        
                        <button onClick={()=>props.burgerOnClick()} className="flex lg:hidden h-[20px] font-bold border-2 border-l-0 border-r-0 border-black items-center flex-row justify-center w-[30px] text-sm">
                            <div className="h-[2px] w-[30px] bg-black"></div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default Navbar;