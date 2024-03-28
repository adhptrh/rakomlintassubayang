

function Navbar () {
    return <>
        <div className="fixed w-full h-1 z-40 bg-custom-blue-sky"></div>
        <div className="shadow-sm z-30 w-full fixed flex bg-white justify-center pb-5">
            <div className="container px-5">
                <div className="w-full mt-5 h-10 flex">
                    <img src="./logo.png" width={100}></img>
                    <div className="w-[1px] h-full ml-16 bg-black"></div>
                    <a href="#" className="md:flex hidden h-full ml-10 font-bold text-custom-blue-sky border-custom-blue-sky border-b-2 flex items-center text-sm">BERANDA</a>
                    <a href="$" className="md:flex hidden h-full ml-10 text-slate-400 flex items-center text-sm">KHABAR DESA</a>
                    <div className="flex-1 justify-end flex">
                        <a href="#" className="h-full font-bold text-red-500 border-2 border-red-500 flex items-center px-8 text-sm">LIVE RADIO</a>
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default Navbar;